#!/usr/bin/env node
/**
 * validate-commands.js
 *
 * Validates Mithril command files once commands/ exists.
 *
 * Source: D:\Source\_ai\agent-skills\scripts\validate-commands.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMMANDS_DIR = path.resolve(__dirname, '..', 'commands');
const REQUIRED_FIELDS = ['description', 'prompt'];

function readTomlStringField(content, fieldName) {
  const linePattern = new RegExp(`^${fieldName}\\s*=\\s*(['"])(.*)\\1\\s*$`, 'm');
  const lineMatch = content.match(linePattern);
  if (lineMatch) return lineMatch[2].trim();

  const multilinePattern = new RegExp(`^${fieldName}\\s*=\\s*("""|''')([\\s\\S]*?)\\1`, 'm');
  const multilineMatch = content.match(multilinePattern);
  if (multilineMatch) return multilineMatch[2].trim();

  return null;
}

function listCommandFiles() {
  return fs
    .readdirSync(COMMANDS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.toml'))
    .map((entry) => entry.name)
    .sort();
}

function validateCommandFile(fileName) {
  const errors = [];
  const commandPath = path.join(COMMANDS_DIR, fileName);

  let content;
  try {
    content = fs.readFileSync(commandPath, 'utf8');
  } catch (error) {
    return { errors: [`Cannot read file: ${error.message}`] };
  }

  for (const field of REQUIRED_FIELDS) {
    const value = readTomlStringField(content, field);
    if (!value) {
      errors.push(`Missing or empty required TOML string field: ${field}`);
    }
  }

  return { errors };
}

function main() {
  if (!fs.existsSync(COMMANDS_DIR)) {
    console.log('No commands directory yet; skipping command validation.');
    return;
  }

  const stat = fs.statSync(COMMANDS_DIR);
  if (!stat.isDirectory()) {
    console.error(`ERROR: commands path exists but is not a directory: ${COMMANDS_DIR}`);
    process.exitCode = 1;
    return;
  }

  const commandFiles = listCommandFiles();
  if (commandFiles.length === 0) {
    console.log('No command TOML files found; skipping command validation.');
    return;
  }

  let totalErrors = 0;

  for (const fileName of commandFiles) {
    const { errors } = validateCommandFile(fileName);
    totalErrors += errors.length;

    if (errors.length === 0) {
      console.log(`  [ok] ${fileName}`);
      continue;
    }

    console.log(`  [fail] ${fileName}`);
    for (const message of errors) console.log(`       ERROR: ${message}`);
  }

  const status = totalErrors > 0 ? 'FAILED' : 'PASSED';
  console.log(`\n${commandFiles.length} commands checked - ${totalErrors} error(s) - ${status}`);

  if (totalErrors > 0) {
    process.exitCode = 1;
  }
}

try {
  main();
} catch (error) {
  console.error(`\nERROR: validate-commands failed unexpectedly: ${error.message}`);
  process.exitCode = 1;
}
