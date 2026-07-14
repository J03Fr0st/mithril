import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const readRepoFile = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('MS-1 setup flow uses repository evidence to skip irrelevant questions', async () => {
  const setup = await readRepoFile('skills/setup-mithril-project/SKILL.md');

  assert.match(setup, /Is the `triage` skill installed\?/);
  assert.match(setup, /Monorepo signals/);
  assert.match(setup, /Skip this section entirely if the `triage` skill isn't installed/);
  assert.match(setup, /Default to \*\*single-context\*\*/);
  assert.match(setup, /^# Setup Mithril Project$/m);
  assert.doesNotMatch(setup, /`qa`/);
});

test('MS-2 local tracking publishes one dependency-ordered file per ticket', async () => {
  const [tracker, tickets] = await Promise.all([
    readRepoFile('skills/setup-mithril-project/issue-tracker-local.md'),
    readRepoFile('skills/to-tickets/SKILL.md'),
  ]);

  assert.match(tracker, /\.scratch\/<feature-slug>\/spec\.md/);
  assert.match(tracker, /one file per ticket/i);
  assert.doesNotMatch(tracker, /PRD\.md/);

  assert.match(tickets, /\.scratch\/<feature-slug>\/issues\/<NN>-<slug>\.md/);
  assert.match(tickets, /one ticket per file, never a single combined file/i);
  assert.match(tickets, /\*\*Status:\*\* ready-for-agent/);
  assert.match(tickets, /Work the \*\*frontier\*\*/);
  assert.match(tickets, /when the `triage` skill is installed/);
});

test('MS-2 local tracker setup keeps optional triage guidance conditional', async () => {
  const tracker = await readRepoFile('skills/setup-mithril-project/issue-tracker-local.md');

  assert.match(tracker, /When the `triage` skill is installed, record triage state with a `\*\*Status:\*\*` field/);
  assert.doesNotMatch(tracker, /see `triage-labels\.md` for the role strings/);
});

test('MS-2 local tracker publishing distinguishes specs from tickets', async () => {
  const tracker = await readRepoFile('skills/setup-mithril-project/issue-tracker-local.md');

  assert.match(tracker, /For a spec, write `.scratch\/<feature-slug>\/spec\.md`/);
  assert.match(tracker, /For tickets, write one file per ticket under `.scratch\/<feature-slug>\/issues\/`/);
});

test('AS-1 security guidance gates dependency scripts at the detected installation boundary', async () => {
  const [security, checklist] = await Promise.all([
    readRepoFile('skills/security-and-hardening/SKILL.md'),
    readRepoFile('references/security-checklist.md'),
  ]);

  assert.match(security, /Find the installation boundary and package manager/);
  assert.match(security, /Block dependency scripts before first execution/);
  assert.match(security, /Never apply forced audit remediation automatically/);

  assert.match(checklist, /Frozen\/immutable CI install/);
  assert.match(checklist, /### Install-Script Gate/);
  assert.match(checklist, /npm install-scripts/);
  assert.match(checklist, /pnpm approve-builds/);
  assert.match(checklist, /Yarn 4\.14\+/);
  assert.match(checklist, /Point-in-time snapshot/);
});

test('AS-2 ships a Mithril-specific greenfield and brownfield adoption guide', async () => {
  const guideUrl = new URL('../docs/adoption-guide.md', import.meta.url);
  const guideExists = await access(guideUrl).then(() => true, () => false);
  assert.equal(guideExists, true, 'docs/adoption-guide.md must exist');

  const [guide, readme, gettingStarted, packageJson] = await Promise.all([
    readFile(guideUrl, 'utf8'),
    readRepoFile('README.md'),
    readRepoFile('docs/getting-started.md'),
    readRepoFile('package.json'),
  ]);

  assert.match(guide, /Path A.*Greenfield/);
  assert.match(guide, /Path B.*Brownfield/);
  assert.match(guide, /`using-mithril`/);
  assert.match(guide, /docs\/mithril\/plans/);
  assert.match(guide, /characterization tests/i);
  assert.doesNotMatch(guide, /using-agent-skills/);
  assert.match(readme, /docs\/adoption-guide\.md/);
  assert.match(gettingStarted, /adoption-guide\.md/);
  assert.match(packageJson, /"docs\/adoption-guide\.md"/);
});
