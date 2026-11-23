# VERCUNO — AI Development Instructions

Applies to OpenCode and other coding agents.

## 1. Mission

Build the VERCUNO website according to its approved
product requirements and design specifications.

Prioritize correctness, visual quality,
maintainability, accessibility, and performance.

## 2. Required Reading

Before implementation, read:

1. docs/PRD.md
2. docs/DESIGN_SYSTEM.md
3. docs/DECISIONS.md
4. The active section specification

For current development:

docs/sections/01-HERO.md

## 3. Working Rules

- Inspect the repository before modifying files.
- Check git status before editing.
- Preserve existing user changes.
- Never overwrite unrelated files.
- Do not delete assets without approval.
- Work on the active section only.
- Use the approved brand identity.
- Follow existing project conventions.
- Keep dependencies minimal.
- Never invent client projects or metrics.

## 4. Development Workflow

PLAN:
Read requirements and inspect relevant files.

BUILD:
Implement the smallest coherent scope.

VERIFY:
Run relevant checks and inspect the result.

REFINE:
Fix problems found during verification.

REPORT:
Summarize changes, testing, and remaining issues.

STOP:
Wait for owner approval before starting
another website section.

## 5. Design Fidelity

Visual references and approved section
specifications are authoritative.

Do not redesign an approved section
without explicit owner direction.

If reference images cannot be accessed,
report that limitation and use the written
section specification.

Do not invent visual details from missing images.

## 6. Code Quality

- Prefer TypeScript
- Use reusable components
- Keep components focused
- Use semantic markup
- Avoid unnecessary abstractions
- Keep styling organized
- Maintain responsive behavior
- Respect accessibility requirements

Do not install a large dependency
for a small visual effect.

## 7. Testing

When available, run:

- Lint
- Type checking
- Production build
- Browser checks
- Responsive visual inspection
- Console error inspection

Do not claim a check passed unless it was run.

If browser tools are unavailable,
state that visual inspection is pending.

## 8. Git Safety

Do not push, merge, deploy, or publish
without explicit owner approval.

Do not commit API keys, credentials,
tokens, or environment secrets.

Never run destructive Git commands
without explicit approval.

## 9. Documentation

Keep documentation consistent with
the implementation.

Before approval, record proposed changes
as pending.

Only mark a section APPROVED after
explicit owner approval.

Do not silently change locked decisions.

## 10. Model Efficiency

Prefer focused tasks and concise reports.

Read only relevant context when possible.

Avoid repeatedly rewriting completed components.

Do not sacrifice testing or code quality
to reduce token usage.

## 11. Current Task

Build Hero V2 and navigation only.

Do not build other website sections.
Do not deploy.

Stop after the Hero is ready for review.

## 12. Completion Report

Always report:

- Work completed
- Files changed
- Tests actually performed
- Known issues
- Visual differences
- Preview instructions
- Decisions requiring owner review

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
