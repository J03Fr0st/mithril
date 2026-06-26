#!/usr/bin/env node
/**
 * validate-skills.js
 *
 * Validates Mithril-owned skills in skills/ against the frontmatter contract
 * and the standard-section expectations from agent-skills/docs/skill-anatomy.md.
 *
 * Source: D:\Source\_ai\agent-skills\scripts\validate-skills.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SKILLS_DIR = path.resolve(__dirname, '..', 'skills');
const MAX_DESCRIPTION_LENGTH = 1024;
const SKILL_NAME_PATTERN = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;

const REQUIRED_SECTIONS = [
  {
    canonical: '## Overview',
    headings: ['Overview', 'Summary', 'Purpose'],
  },
  {
    canonical: '## When to Use',
    headings: ['When to Use', 'When to Use This Skill', 'Use When', 'Applicability'],
  },
  {
    canonical: '## Common Rationalizations',
    headings: ['Common Rationalizations', 'Rationalizations', 'Common Excuses'],
  },
  {
    canonical: '## Red Flags',
    headings: ['Red Flags', 'Warning Signs', 'Anti-Patterns'],
  },
  {
    canonical: '## Verification',
    headings: ['Verification', 'Exit Criteria', 'Completion Criteria'],
  },
];

const SECTION_EXEMPT_SKILLS = {
  'using-mithril': 'Meta-skill that routes skill usage before normal workflow sections apply.',
};

const SKILL_REF_PATTERNS = [
  /\buse the `([a-z][a-z0-9-]*[a-z0-9])` skill/g,
  /\bfollow the `([a-z][a-z0-9-]*[a-z0-9])` skill/g,
  /\binvoke the `([a-z][a-z0-9-]*[a-z0-9])` skill/g,
  /\bcontinue with `([a-z][a-z0-9-]*[a-z0-9])`/g,
  /\buse `([a-z][a-z0-9-]*[a-z0-9])` skill/g,
  /`([a-z][a-z0-9-]*[a-z0-9])` skill\b/g,
  /`([a-z][a-z0-9-]*[a-z0-9])` persona\b/g,
  /\bsee `([a-z][a-z0-9-]*[a-z0-9])`/g,
  /--?> ([a-z][a-z0-9-]*[a-z0-9])\b/g,
  /-> `([a-z][a-z0-9-]*[a-z0-9])`/g,
];

function parseFrontmatter(content) {
  const match = content.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n/);
  if (!match) return null;

  const result = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key) result[key] = value;
  }

  return result;
}

function extractSkillReferences(content) {
  const refs = new Set();

  for (const pattern of SKILL_REF_PATTERNS) {
    pattern.lastIndex = 0;
    let match;

    while ((match = pattern.exec(content)) !== null) {
      refs.add(match[1]);
    }
  }

  return refs;
}

function normalizeHeading(heading) {
  return heading
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function extractSectionHeadings(content) {
  const headings = new Set();
  let inFence = false;

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trimStart();
    if (/^(```|~~~)/.test(trimmed)) {
      inFence = !inFence;
      continue;
    }

    if (inFence) continue;

    const match = line.match(/^##(?!#)\s+(.+?)\s*#*\s*$/);
    if (match) headings.add(normalizeHeading(match[1]));
  }

  return headings;
}

function listSkillDirs() {
  return fs
    .readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function validateSkill(dirName, knownSkills) {
  const errors = [];
  const warnings = [];

  const skillPath = path.join(SKILLS_DIR, dirName, 'SKILL.md');
  const sourcesPath = path.join(SKILLS_DIR, dirName, 'sources');

  if (fs.existsSync(sourcesPath)) {
    errors.push("Disallowed 'sources' directory; merge source material into the Mithril-owned skill or explicit support files");
  }

  if (!fs.existsSync(skillPath)) {
    errors.push('Missing SKILL.md');
    return { errors, warnings, exempt: false };
  }

  let content;
  try {
    content = fs.readFileSync(skillPath, 'utf8');
  } catch (error) {
    errors.push(`Unreadable SKILL.md: ${error.message}`);
    return { errors, warnings, exempt: false };
  }

  const frontmatter = parseFrontmatter(content);
  if (!frontmatter) {
    errors.push('Missing or malformed YAML frontmatter at top of file');
    return { errors, warnings, exempt: false };
  }

  if (!frontmatter.name) {
    errors.push("Frontmatter missing required field: 'name'");
  } else {
    if (frontmatter.name !== dirName) {
      errors.push(`Frontmatter name '${frontmatter.name}' does not match directory name '${dirName}'`);
    }

    if (!SKILL_NAME_PATTERN.test(frontmatter.name)) {
      errors.push(`Frontmatter name '${frontmatter.name}' must be lowercase hyphen-separated`);
    }
  }

  if (!frontmatter.description) {
    errors.push("Frontmatter missing required field: 'description'");
  } else {
    if (frontmatter.description.length > MAX_DESCRIPTION_LENGTH) {
      errors.push(
        `Description is ${frontmatter.description.length} chars; maximum is ${MAX_DESCRIPTION_LENGTH}`,
      );
    }

    if (!/\bUse when\b/.test(frontmatter.description)) {
      errors.push("Description must include a 'Use when' trigger");
    }
  }

  const exempt = Object.hasOwn(SECTION_EXEMPT_SKILLS, dirName);
  if (frontmatter.type === 'meta' || frontmatter.exempt === 'sections') {
    if (!exempt) {
      errors.push(
        `Frontmatter declares a section exemption, but '${dirName}' is not allowlisted in scripts/validate-skills.js`,
      );
    }
  }

  if (!exempt) {
    const sectionHeadings = extractSectionHeadings(content);

    for (const section of REQUIRED_SECTIONS) {
      const found = section.headings.some((heading) => sectionHeadings.has(normalizeHeading(heading)));
      if (!found) {
        errors.push(`Missing required section: ${section.canonical}`);
      }
    }
  }

  const refs = extractSkillReferences(content);
  for (const ref of refs) {
    if (!knownSkills.has(ref)) {
      warnings.push(`Dead cross-reference: '${ref}' is not a known Mithril skill`);
    }
  }

  return { errors, warnings, exempt };
}

function main() {
  if (!fs.existsSync(SKILLS_DIR)) {
    console.error(`ERROR: skills directory not found at ${SKILLS_DIR}`);
    process.exitCode = 1;
    return;
  }

  const skillDirs = listSkillDirs();
  const knownSkills = new Set(skillDirs);
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const dirName of skillDirs) {
    const { errors, warnings, exempt } = validateSkill(dirName, knownSkills);
    totalErrors += errors.length;
    totalWarnings += warnings.length;

    if (errors.length === 0 && warnings.length === 0) {
      const suffix = exempt ? ' (section checks exempt)' : '';
      console.log(`  [ok] ${dirName}${suffix}`);
      continue;
    }

    console.log(`  ${errors.length > 0 ? '[fail]' : '[warn]'} ${dirName}`);
    for (const message of errors) console.log(`       ERROR: ${message}`);
    for (const message of warnings) console.log(`       WARN: ${message}`);
  }

  const status = totalErrors > 0 ? 'FAILED' : totalWarnings > 0 ? 'PASSED WITH WARNINGS' : 'PASSED';
  console.log(`\n${skillDirs.length} skills checked - ${totalErrors} error(s), ${totalWarnings} warning(s) - ${status}`);

  if (totalErrors > 0) {
    process.exitCode = 1;
  }
}

try {
  main();
} catch (error) {
  console.error(`\nERROR: validate-skills failed unexpectedly: ${error.message}`);
  process.exitCode = 1;
}
