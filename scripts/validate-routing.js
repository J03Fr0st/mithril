#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKILLS_DIR = path.join(ROOT, 'skills');
const CASES_DIR = path.join(ROOT, 'evals', 'cases');
const COLLISION_WARNING = 0.5;
const COLLISION_ERROR = 0.75;

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'any', 'are', 'as', 'at', 'be', 'before', 'by', 'for',
  'from', 'help', 'i', 'in', 'into', 'is', 'it', 'its', 'me', 'my', 'need',
  'needs', 'of', 'on', 'or', 'our', 'so', 'that', 'the', 'them', 'this', 'to',
  'use', 'want', 'we', 'when', 'with', 'you', 'your',
]);

function stem(token) {
  for (const suffix of ['ally', 'ing', 'ed', 'es', 'al']) {
    if (token.length > suffix.length + 3 && token.endsWith(suffix)) {
      token = token.slice(0, -suffix.length);
      break;
    }
  }
  if (token.length > 3 && token.endsWith('s') && !token.endsWith('ss')) {
    token = token.slice(0, -1);
  }
  if (token.length > 4 && token.endsWith('e')) token = token.slice(0, -1);
  const last = token.at(-1);
  if (token.length > 4 && last === token.at(-2) && !'aeiou'.includes(last)) {
    token = token.slice(0, -1);
  }
  if (token.length > 3 && token.endsWith('y')) token = `${token.slice(0, -1)}i`;
  return token;
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token))
    .map(stem);
}

function termFrequency(tokens) {
  const frequency = new Map();
  for (const token of tokens) {
    frequency.set(token, (frequency.get(token) ?? 0) + 1);
  }
  return frequency;
}

function loadSkills() {
  return fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const file = path.join(SKILLS_DIR, entry.name, 'SKILL.md');
      if (!fs.existsSync(file)) return null;
      const source = fs.readFileSync(file, 'utf8');
      const frontmatter = source.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/)?.[1];
      const name = frontmatter?.match(/^name:\s*(.+)$/m)?.[1]?.trim();
      const description = frontmatter?.match(/^description:\s*(.+)$/m)?.[1]?.trim();
      return name && description ? { name, description } : null;
    })
    .filter(Boolean)
    .sort((left, right) => left.name.localeCompare(right.name));
}

function loadCases() {
  if (!fs.existsSync(CASES_DIR)) return [];
  return fs.readdirSync(CASES_DIR)
    .filter((file) => file.endsWith('.json'))
    .sort()
    .map((file) => {
      try {
        return {
          file,
          data: JSON.parse(fs.readFileSync(path.join(CASES_DIR, file), 'utf8')),
        };
      } catch (error) {
        return { file, error: error.message };
      }
    });
}

function buildCorpus(skills) {
  const documents = new Map();
  for (const skill of skills) {
    const nameTokens = tokenize(skill.name.replaceAll('-', ' '));
    documents.set(
      skill.name,
      termFrequency([...nameTokens, ...nameTokens, ...tokenize(skill.description)]),
    );
  }

  const documentFrequency = new Map();
  for (const frequency of documents.values()) {
    for (const term of frequency.keys()) {
      documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1);
    }
  }

  const inverseDocumentFrequency = (term) => (
    Math.log(1 + documents.size / (1 + (documentFrequency.get(term) ?? 0)))
  );
  return { documents, inverseDocumentFrequency };
}

function vector(frequency, inverseDocumentFrequency) {
  return new Map(
    [...frequency].map(([term, count]) => [term, count * inverseDocumentFrequency(term)]),
  );
}

function cosine(left, right) {
  let dot = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;
  for (const [term, weight] of left) {
    leftMagnitude += weight * weight;
    dot += weight * (right.get(term) ?? 0);
  }
  for (const weight of right.values()) rightMagnitude += weight * weight;
  if (!leftMagnitude || !rightMagnitude) return 0;
  return dot / (Math.sqrt(leftMagnitude) * Math.sqrt(rightMagnitude));
}

function rank(prompt, corpus) {
  const promptVector = vector(termFrequency(tokenize(prompt)), corpus.inverseDocumentFrequency);
  return [...corpus.documents].map(([name, frequency]) => ({
    name,
    score: cosine(promptVector, vector(frequency, corpus.inverseDocumentFrequency)),
  })).sort((left, right) => right.score - left.score || left.name.localeCompare(right.name));
}

function validatePrompt(prompt, label) {
  if (!prompt || typeof prompt !== 'object' || Array.isArray(prompt)) {
    return `${label} must be an object`;
  }
  if (typeof prompt.prompt !== 'string' || prompt.prompt.trim() === '') {
    return `${label} must contain a non-empty prompt`;
  }
  if (prompt.top_k !== undefined && (!Number.isInteger(prompt.top_k) || prompt.top_k < 1 || prompt.top_k > 3)) {
    return `${label} top_k must be an integer from 1 to 3`;
  }
  if (prompt.owner !== undefined && typeof prompt.owner !== 'string') {
    return `${label} owner must be a string`;
  }
  return null;
}

function main() {
  const skills = loadSkills();
  const cases = loadCases();
  const names = new Set(skills.map((skill) => skill.name));
  const corpus = buildCorpus(skills);
  let errors = 0;
  let warnings = 0;
  let positives = 0;
  let rankOne = 0;

  const fail = (message) => {
    console.error(`  [error] ${message}`);
    errors += 1;
  };

  console.log(`Checking routing for ${skills.length} skills with ${cases.length} case files`);

  const files = new Set(cases.map((entry) => entry.file));
  for (const skill of skills) {
    if (!files.has(`${skill.name}.json`)) {
      fail(`${skill.name}: missing evals/cases/${skill.name}.json`);
    }
  }

  for (const entry of cases) {
    const expected = entry.file.replace(/\.json$/, '');
    if (entry.error) {
      fail(`${entry.file}: invalid JSON: ${entry.error}`);
      continue;
    }
    if (!names.has(expected)) {
      fail(`${entry.file}: no matching skill directory`);
      continue;
    }

    const data = entry.data;
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      fail(`${entry.file}: root must be an object`);
      continue;
    }
    if (data.skill_name !== expected) {
      fail(`${entry.file}: skill_name must be "${expected}"`);
    }
    const positive = data.trigger?.positive;
    const negative = data.trigger?.negative;
    if (!Array.isArray(positive) || positive.length === 0) {
      fail(`${entry.file}: trigger.positive must contain at least one prompt`);
      continue;
    }
    if (!Array.isArray(negative) || negative.length === 0) {
      fail(`${entry.file}: trigger.negative must contain at least one prompt`);
      continue;
    }

    for (const [index, prompt] of positive.entries()) {
      const shapeError = validatePrompt(prompt, `positive[${index}]`);
      if (shapeError) {
        fail(`${entry.file}: ${shapeError}`);
        continue;
      }
      positives += 1;
      const ranking = rank(prompt.prompt, corpus);
      const position = ranking.findIndex((result) => result.name === expected);
      const result = ranking[position];
      const topK = prompt.top_k ?? 3;
      if (position === 0 && result.score > 0) rankOne += 1;
      if (position >= topK || result.score === 0) {
        const leaders = ranking.slice(0, 3)
          .map((candidate) => `${candidate.name} (${candidate.score.toFixed(2)})`)
          .join(', ');
        fail(`${expected}: positive ranked #${position + 1}, expected top ${topK}: "${prompt.prompt}"; top: ${leaders}`);
      }
    }

    for (const [index, prompt] of negative.entries()) {
      const shapeError = validatePrompt(prompt, `negative[${index}]`);
      if (shapeError) {
        fail(`${entry.file}: ${shapeError}`);
        continue;
      }
      if (!prompt.owner) {
        fail(`${entry.file}: negative[${index}] must declare an owner`);
        continue;
      }
      if (!names.has(prompt.owner)) {
        fail(`${entry.file}: negative[${index}] has unknown owner "${prompt.owner}"`);
        continue;
      }
      const ranking = rank(prompt.prompt, corpus);
      const selfPosition = ranking.findIndex((result) => result.name === expected);
      const ownerPosition = ranking.findIndex((result) => result.name === prompt.owner);
      if (ranking[ownerPosition].score === 0 || ownerPosition !== 0 || ownerPosition >= selfPosition) {
        fail(`${expected}: owner ${prompt.owner} did not rank #1 for "${prompt.prompt}"`);
      }
    }
  }

  const skillNames = [...corpus.documents.keys()];
  for (let leftIndex = 0; leftIndex < skillNames.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < skillNames.length; rightIndex += 1) {
      const leftName = skillNames[leftIndex];
      const rightName = skillNames[rightIndex];
      const similarity = cosine(
        vector(corpus.documents.get(leftName), corpus.inverseDocumentFrequency),
        vector(corpus.documents.get(rightName), corpus.inverseDocumentFrequency),
      );
      if (similarity >= COLLISION_ERROR) {
        fail(`${leftName} and ${rightName} descriptions collide at ${similarity.toFixed(2)}`);
      } else if (similarity >= COLLISION_WARNING) {
        console.warn(`  [warning] ${leftName} and ${rightName} descriptions overlap at ${similarity.toFixed(2)}`);
        warnings += 1;
      }
    }
  }

  const rate = positives ? `${((rankOne / positives) * 100).toFixed(1)}%` : 'n/a';
  console.log(`\n${positives} positive prompts; ${rate} rank #1; ${errors} error(s); ${warnings} warning(s)`);
  if (errors > 0) process.exitCode = 1;
}

main();
