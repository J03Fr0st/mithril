import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const configPath = path.join(repoRoot, ".version-bump.json");
const packagePath = path.join(repoRoot, "package.json");
const checkOnly = process.argv.includes("--check");
const auditOnly = process.argv.includes("--audit");
const writeMode = !checkOnly && !auditOnly;

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function pathParts(field) {
  return field.split(".").map((part) => {
    const index = Number(part);
    return Number.isInteger(index) && String(index) === part ? index : part;
  });
}

function getField(value, field) {
  return pathParts(field).reduce((current, part) => current?.[part], value);
}

function setField(value, field, nextValue) {
  const parts = pathParts(field);
  let current = value;

  for (const part of parts.slice(0, -1)) {
    if (current[part] === undefined) {
      throw new Error(`Missing path segment "${part}" in ${field}`);
    }
    current = current[part];
  }

  current[parts.at(-1)] = nextValue;
}

const packageJson = readJson(packagePath);
const config = readJson(configPath);
const targetVersion = packageJson.version;
let driftCount = 0;
const declaredPaths = new Set(config.files.map((entry) => entry.path.replaceAll("\\", "/")));
declaredPaths.add("package-lock.json");

for (const entry of config.files) {
  const filePath = path.join(repoRoot, entry.path);

  if (!fs.existsSync(filePath)) {
    console.error(`[missing] ${entry.path}`);
    driftCount += 1;
    continue;
  }

  const json = readJson(filePath);
  const currentVersion = getField(json, entry.field);

  if (currentVersion === targetVersion) {
    console.log(`[ok] ${entry.path} ${entry.field} = ${targetVersion}`);
    continue;
  }

  driftCount += 1;

  if (!writeMode) {
    console.error(
      `[drift] ${entry.path} ${entry.field}: ${currentVersion} != ${targetVersion}`,
    );
    continue;
  }

  setField(json, entry.field, targetVersion);
  writeJson(filePath, json);
  console.log(
    `[sync] ${entry.path} ${entry.field}: ${currentVersion} -> ${targetVersion}`,
  );
}

const lockfilePath = path.join(repoRoot, "package-lock.json");
if (fs.existsSync(lockfilePath)) {
  const lockfile = readJson(lockfilePath);
  const lockfileFields = [
    ["version", lockfile.version],
    ['packages[""].version', lockfile.packages?.[""]?.version],
  ];
  let lockfileChanged = false;

  for (const [field, currentVersion] of lockfileFields) {
    if (currentVersion === undefined || currentVersion === targetVersion) {
      if (currentVersion === targetVersion) {
        console.log(`[ok] package-lock.json ${field} = ${targetVersion}`);
      }
      continue;
    }

    driftCount += 1;

    if (!writeMode) {
      console.error(
        `[drift] package-lock.json ${field}: ${currentVersion} != ${targetVersion}`,
      );
      continue;
    }

    if (field === "version") {
      lockfile.version = targetVersion;
    } else {
      lockfile.packages[""].version = targetVersion;
    }
    lockfileChanged = true;
    console.log(
      `[sync] package-lock.json ${field}: ${currentVersion} -> ${targetVersion}`,
    );
  }

  if (lockfileChanged) {
    writeJson(lockfilePath, lockfile);
  }
}

if (checkOnly && driftCount > 0) {
  process.exitCode = 1;
}

function isExcluded(relativePath) {
  const normalized = relativePath.replaceAll("\\", "/");
  const basename = path.basename(normalized);
  const excludes = [
    ...(config.audit?.exclude ?? []),
    ".git",
    "node_modules",
  ];

  return excludes.some((pattern) => {
    const normalizedPattern = pattern.replaceAll("\\", "/");
    return (
      normalized === normalizedPattern ||
      normalized.startsWith(`${normalizedPattern}/`) ||
      basename === normalizedPattern
    );
  });
}

function* walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    const relativePath = path.relative(repoRoot, fullPath);

    if (isExcluded(relativePath)) {
      continue;
    }

    if (entry.isDirectory()) {
      yield* walk(fullPath);
      continue;
    }

    if (entry.isFile()) {
      yield fullPath;
    }
  }
}

function isText(buffer) {
  return !buffer.includes(0);
}

if (auditOnly) {
  console.log("");
  console.log(`Audit: scanning repo for version string '${targetVersion}'...`);

  let foundUndeclared = false;

  for (const filePath of walk(repoRoot)) {
    const relativePath = path.relative(repoRoot, filePath).replaceAll("\\", "/");

    if (declaredPaths.has(relativePath)) {
      continue;
    }

    const buffer = fs.readFileSync(filePath);
    if (!isText(buffer)) {
      continue;
    }

    const text = buffer.toString("utf8");
    if (!text.includes(targetVersion)) {
      continue;
    }

    if (!foundUndeclared) {
      console.log("Undeclared files containing the current version:");
      foundUndeclared = true;
    }
    console.log(`  ${relativePath}`);
  }

  if (!foundUndeclared) {
    console.log("No undeclared files contain the current version.");
  }
}
