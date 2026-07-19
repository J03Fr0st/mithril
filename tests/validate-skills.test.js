import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, test } from 'node:test';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VALIDATOR = path.join(ROOT, 'scripts', 'validate-skills.js');
const tempRoots = [];

afterEach(() => {
  for (const tempRoot of tempRoots.splice(0)) {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

function runValidator(skillMarkdown) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'mithril-validate-skills-'));
  tempRoots.push(tempRoot);

  const scriptsDir = path.join(tempRoot, 'scripts');
  const skillDir = path.join(tempRoot, 'skills', 'example-skill');
  fs.mkdirSync(scriptsDir, { recursive: true });
  fs.mkdirSync(skillDir, { recursive: true });
  fs.copyFileSync(VALIDATOR, path.join(scriptsDir, 'validate-skills.js'));
  fs.writeFileSync(path.join(tempRoot, 'package.json'), '{"type":"module"}\n');
  fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skillMarkdown);

  try {
    return {
      exitCode: 0,
      output: execFileSync(process.execPath, [path.join(scriptsDir, 'validate-skills.js')], {
        cwd: tempRoot,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      }),
    };
  } catch (error) {
    return {
      exitCode: error.status,
      output: `${error.stdout ?? ''}${error.stderr ?? ''}`,
    };
  }
}

function skillWith({ description, sections }) {
  return `---
name: example-skill
description: ${description}
---

# Example Skill

${sections}
`;
}

test('rejects a negated Use when phrase as a trigger', () => {
  const result = runValidator(
    skillWith({
      description: 'Do not Use when the task is routine.',
      sections: [
        '## Overview',
        '## When to Use',
        '## Common Rationalizations',
        '## Red Flags',
        '## Verification',
      ].join('\n\n'),
    }),
  );

  assert.equal(result.exitCode, 1);
  assert.match(result.output, /Description must include a 'Use when' trigger/);
});

test('accepts a positive trigger alongside a negated trigger', () => {
  const result = runValidator(
    skillWith({
      description: 'Use when publishing a release. Do not use when drafting notes.',
      sections: [
        '## Overview',
        '## When to Use',
        '## Common Rationalizations',
        '## Red Flags',
        '## Verification',
      ].join('\n\n'),
    }),
  );

  assert.equal(result.exitCode, 0);
});

test('does not count required headings inside fenced examples', () => {
  const result = runValidator(
    skillWith({
      description: 'Use when validating a skill example.',
      sections: `\`\`\`markdown
## Overview
## When to Use
## Common Rationalizations
## Red Flags
## Verification
\`\`\``,
    }),
  );

  assert.equal(result.exitCode, 1);
  assert.match(result.output, /Missing required section: ## Overview/);
});
