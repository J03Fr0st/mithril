# Security Checklist

Quick reference for web and AI-assisted application security. Use with the `security-and-hardening` skill.

## Threat Modeling

- [ ] Trust boundaries mapped: requests, forms, uploads, webhooks, queues, third-party APIs, browser content, model output.
- [ ] Assets named: credentials, PII, payment data, tenant data, admin actions, money movement, availability.
- [ ] STRIDE considered for each boundary: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege.
- [ ] Abuse cases written beside use cases.

## Authentication and Authorization

- [ ] Passwords use bcrypt, scrypt, or argon2 with current parameters.
- [ ] Sessions use httpOnly, secure, sameSite cookies.
- [ ] Login, password reset, and MFA flows have rate limits and expiry.
- [ ] Every protected endpoint checks authentication.
- [ ] Every resource action checks ownership, role, tenant, or policy.
- [ ] Admin actions require explicit admin authorization.
- [ ] JWTs or API keys validate signature, expiry, issuer, and scope.

## Input, Output, and Data

- [ ] All external input is parsed and allowlist-validated at the boundary.
- [ ] String lengths, numeric ranges, enum values, URLs, dates, and file sizes are bounded.
- [ ] Database queries are parameterized; no string concatenation with untrusted input.
- [ ] HTML output is encoded or sanitized before reaching raw HTML sinks.
- [ ] Redirect targets are allowlisted.
- [ ] Server-side URL fetches are allowlisted and block private or reserved IPs.
- [ ] File uploads check size, type, and content where risk warrants it.
- [ ] Sensitive fields are excluded from API responses.
- [ ] PII and regulated data are encrypted when required.

## Secrets and Errors

- [ ] No secrets, tokens, keys, passwords, or certificates are in source or staged diffs.
- [ ] Secret-bearing files are ignored by VCS.
- [ ] Secrets are stored in a vault, platform secret store, or environment injection.
- [ ] Logs, telemetry, prompts, screenshots, and errors do not include secrets or unredacted PII.
- [ ] User-facing errors are generic; internal stack traces stay server-side.
- [ ] Committed secrets are rotated before cleanup is considered complete.

## Headers, CORS, and Browser Hardening

- [ ] CSP is configured and as restrictive as practical.
- [ ] HSTS is enabled for HTTPS deployments.
- [ ] `X-Content-Type-Options: nosniff` is present.
- [ ] Framing policy prevents clickjacking where embedding is not required.
- [ ] Referrer and Permissions policies are explicit.
- [ ] CORS is restricted to known origins and methods; wildcard is not used with credentials.

## Dependencies and Supply Chain

- [ ] Lockfile is committed and CI uses reproducible install.
- [ ] New dependencies are reviewed for maintenance, license, size, typosquat risk, and install scripts.
- [ ] Known critical or high vulnerabilities are fixed or explicitly risk-accepted with a review date.
- [ ] Runtime dependencies are distinguished from dev-only dependencies.

## AI and Model Features

- [ ] Model output is treated as untrusted before use in SQL, shell, HTML, file paths, or tool calls.
- [ ] Prompt injection is assumed; permissions are enforced in code.
- [ ] Secrets, system prompts, and cross-tenant data are kept out of model context.
- [ ] Tool permissions are least-privilege; destructive or irreversible actions require confirmation.
- [ ] Token, request-rate, recursion, and loop limits prevent unbounded consumption.
- [ ] Retrieval data is partitioned by tenant and validated before indexing.

## Verification

- [ ] Abuse-case tests cover the risky paths.
- [ ] Security-relevant checks were run or the skipped reason is reported.
- [ ] Review found no unresolved critical trust-boundary, auth, secret, or injection issue.
