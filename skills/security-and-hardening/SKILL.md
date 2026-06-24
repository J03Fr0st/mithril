---
name: security-and-hardening
description: Use when handling untrusted input, authentication, authorization, secrets, sensitive data, file uploads, webhooks, external integrations, model output, dependencies, or production hardening.
---

# Security and Hardening

## Overview

Security is a design constraint. Treat external input as hostile, secrets as toxic to logs and prompts, and authorization as required for every protected action.

Use `api-and-interface-design` for boundary contracts and `test-driven-development` for abuse-case tests.

## When to Use

- Accepting input from users, browsers, webhooks, files, queues, third-party APIs, or model output.
- Implementing authentication, authorization, sessions, roles, payments, PII, or admin actions.
- Adding external integrations, redirects, server-side URL fetches, uploads, or callbacks.
- Adding dependencies or changing deployment/security configuration.
- Reviewing code before launch or production exposure.

## Process

1. Threat-model first.
   - Map trust boundaries.
   - Name assets: credentials, PII, money movement, admin actions, tenant data, availability.
   - Run STRIDE: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege.
   - Write abuse cases next to use cases.

2. Validate at boundaries.
   - Parse and allowlist external input at API, form, file, webhook, queue, environment, and third-party response boundaries.
   - Treat model output as untrusted data before using it in SQL, shell, HTML, file paths, or tool calls.

3. Enforce identity and authorization.
   - Authenticate before protected access.
   - Authorize every resource action by ownership, role, tenant, or policy.
   - Do not trust client-side validation or hidden UI controls.

4. Protect data and secrets.
   - Hash passwords with a modern password hash.
   - Store secrets outside source.
   - Use secure cookies for sessions.
   - Redact logs, telemetry, prompts, and errors.

5. Harden integrations and supply chain.
   - Parameterize database queries.
   - Encode output; avoid raw HTML sinks.
   - Restrict CORS and redirects.
   - Allowlist server-side URL fetches and block private/reserved IPs.
   - Review new dependencies, lockfiles, install scripts, and vulnerabilities.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "It is internal." | Internal tools are common entry points and often have broad privileges. |
| "The framework handles it." | Frameworks provide primitives; misuse is still your bug. |
| "We can add security later." | Retrofitting authorization and data boundaries is expensive and error-prone. |
| "Client validation is enough." | Attackers bypass the client. Server boundaries decide. |
| "Model output is just text." | Text can become SQL, shell, HTML, paths, or tool arguments if trusted. |

## Red Flags

- User input reaches SQL, shell, HTML, file paths, redirects, or server-side fetches without validation.
- Protected endpoints check authentication but not resource authorization.
- Secrets, tokens, stack traces, request bodies, or PII appear in logs or prompts.
- Wildcard CORS is used with credentials or production origins.
- Auth endpoints lack rate limiting.
- File uploads trust extension or MIME type alone.
- Server fetches user-influenced URLs without allowlists.
- New dependencies are added without maintenance, install-script, license, or vulnerability review.

## Verification

- Trust boundaries, assets, and abuse cases are documented for the change.
- Boundary inputs and external responses are parsed and validated.
- Authentication and authorization are enforced on protected paths.
- Secrets and sensitive fields are absent from source, logs, telemetry, prompts, and errors.
- Dependency and supply-chain risks are reviewed.
- Security headers, CORS, rate limits, and SSRF controls are checked where relevant.
- Use `references/security-checklist.md` and gate completion with `verification-before-completion`.
