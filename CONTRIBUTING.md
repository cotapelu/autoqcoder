# Contributing to autoqcoder

Thank you for your interest in contributing! This guide will help you get started.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Adding a Skill Definition](#adding-a-skill-definition)
5. [Improving Documentation](#improving-documentation)
6. [Reporting Bugs](#reporting-bugs)
7. [Feature Requests](#feature-requests)
8. [Pull Request Process](#pull-request-process)
9. **Quality Standards** (AutoQCoder applies to itself!)
10. [Community](#community)

---

## Code of Conduct

This project adheres to a strict code of conduct:

- **Be respectful** - No harassment, discrimination, or toxic behavior
- **Be constructive** - Critique ideas, not people
- **Be professional** - No spam, trolling, or off-topic posts
- **Be inclusive** - Welcome newcomers, mentor, and support

Violations will be addressed immediately. Contact **security@autoqcoder.dev** to report issues.

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **Git** >= 2.30
- **npm** >= 9.0.0

### Setup

```bash
# 1. Fork the repository
# Click "Fork" on https://github.com/autoqcoder/autoqcoder

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/autoqcoder.git
cd autoqcoder

# 3. Add upstream remote
git remote add upstream https://github.com/autoqcoder/autoqcoder.git

# 4. Install dependencies (for scripts)
npm ci

# 5. Verify setup
npm run validate  # Should pass all checks

# 6. Create a branch
git checkout -b my-contribution
```

---

## Development Workflow

### Our Process (v2.0 Evolutionary Loop)

1. **Read** - Read AGENTS.md, AUTO-CONTINUE.md, relevant skill files
2. **Plan** - Identify highest-impact task, mental test scenarios
3. **Implement** - Write code following quality gates (func≤20, 100% err handling, etc.)
4. **Verify** - Self-score ≥90? All gates passed?
5. **Update** - Modify `docs/` files with actual metrics
6. **Commit** - `git add -A && git commit -m "chore: evolution round - description"`
7. **Repeat** - Continuous loop until no improvements

### Pre-Commit Checks

Run locally before pushing:

```bash
# Lint (ESLint)
npm run lint

# Type check (TypeScript)
npx tsc --noEmit --strict

# Tests (if applicable)
npm test

# Security scan
npm audit --audit-level moderate

# autoqcoder validation
node scripts/validate.js
```

Hooks will run automatically on `git commit` if husky is installed.

---

## Adding a Skill Definition

Skill definitions live in `mate/skill/{skill-name}/SKILL.md`.

### Template

```markdown
---
name: your-skill
description: One-line description
license: MIT
compatibility: opencode
metadata:
  audience: senior-developers
  scope: backend-architecture | frontend-architecture | fullstack-architecture | quality-assurance
---

[Detailed content following pattern from existing skills...]
```

### Guidelines

1. **One skill per domain** (e.g., `react-architect`, `go-architect`)
2. **Follow existing structure:**
   - Kiến trúc cốt lõi
   - Project structure
   - Domain entities / components
   - Services / use cases
   - Repository / data access
   - API / routes
   - Testing strategy
   - Security considerations
   - Performance optimization
   - Output format (✅/❌ bullets)
   - Khi nào dùng skill này

3. **Keep it practical** - Include real code examples, not just theory
4. **Maintain consistency** - Follow style of other skill files
5. **Test your examples** - Ensure code snippets are valid

### Submission

1. Create `mate/skill/your-skill/SKILL.md`
2. Add to `README.md`Skills table
3. Submit PR with:
   - New skill file
   - Updated README.md
   - Tests (if applicable)
   - Example project (optional but recommended)

---

## Improving Documentation

We value documentation improvements!

### What to Fix

- Typos, grammar, clarity issues
- Missing examples
- Outdated information
- Better explanations
- Additional scenarios

### How to Contribute

1. Fork and branch
2. Edit markdown files (keep line length ~80-100)
3. Run spell check (`npm run lint:docs`)
4. Commit: `docs: improve AGENTS.md clarity in section X`
5. Open PR with description of changes

### Documentation Standards

- Use **bold** for emphasis, not ALL CAPS
- Code blocks with language tags: ` ```javascript `, ` ```typescript `
- Japanese: Proper encoding (UTF-8)
- Links: Use relative paths: `[AGENTS.md](AGENTS.md)`
- Tables: Align pipes for readability
- Keep paragraphs short (3-4 sentences)

---

## Reporting Bugs

### Before Reporting

1. Check existing [Issues](https://github.com/autoqcoder/autoqcoder/issues)
2. Read [FAQ.md](FAQ.md) for known problems
3. Ensure you're on latest version

### Bug Report Template

```
**Description**
Clear description of the bug.

**Steps to Reproduce**
1. 
2.
3.

**Expected Behavior**
What should happen?

**Actual Behavior**
What actually happens?

**Environment**
- autoqcoder version: (v2.0.0)
- Node.js version:
- OS:
- skill used (if any):

**Additional Context**
Screenshots, logs, error messages, self-score calculation.
```

**Submit:** [GitHub Issue](https://github.com/autoqcoder/autoqcoder/issues/new?template=bug_report.md)

---

## Feature Requests

We prioritize based on:
1. **Production impact** (affects many users)
2. **Technical feasibility** (can we build it?)
3. **Alignment with vision** (self-optimizing, production-ready)

### Feature Request Template

```
**Problem**
What problem does this solve? Why is it important?

**Proposed Solution**
Describe the solution. Include:
- Which file(s) to modify
- API changes (if any)
- Example usage

**Alternatives Considered**
Other approaches you've considered.

**Additional Context**
Screenshots, mockups, similar implementations in other projects.
```

**Submit:** [GitHub Issue](https://github.com/autoqcoder/autoqcoder/issues/new?template=feature_request.md)

---

## Pull Request Process

### 1. Prepare Your Branch

```bash
# Sync with upstream
git fetch upstream
git rebase upstream/main

# Resolve conflicts if any
# Ensure tests pass
npm test

# Ensure lint passes
npm run lint -- --fix

# Ensure type check passes
npx tsc --noEmit --strict

# Update docs if needed
```

### 2. Self-Review (Use autoqcoder on your PR!)

Before submitting, run autoqcoder on your own changes:

```bash
# Check against quality gates
node scripts/validate-pr.js  # (or run manually)

# Self-score calculator
node scripts/calculate-self-score.js
```

**Must achieve self-score ≥90 before PR.**

### 3. Commit Standards

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add React 18 support to use strict hooks
fix: resolve N+1 query in user list
refactor: extract repository pattern for todos
docs: update README with quick start
chore: evolution round - apply backend-db-pattern
```

**Do NOT commit:**
- `git commit -m "update"` or `git commit -m "fix bug"`
- Secrets, passwords, tokens
- Debug code (`console.log`, `debugger`)
- Generated files (dist/, node_modules/, coverage/)

### 4. PR Template

Fill out completely:

```markdown
## Description
[What changed and why]

## Type of Change
- [ ] Bug fix (non-breaking)
- [ ] New feature (non-breaking)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Self-Score
**Calculated Score:** __/100

Breakdown:
- Reliability (30): __
- Maintainability (25): __
- Security (20): __
- Testability (15): __
- Performance (10): __

## Checks
- [ ] Functions ≤20 lines (verify)
- [ ] Complexity ≤10
- [ ] 100% error handling
- [ ] 100% input validation
- [ ] No hardcoded secrets
- [ ] Mental testing documented (or actual tests)
- [ ] Flow coverage (UI→DB & DB→UI)
- [ ] No code deletions (preservation rule)
- [ ] Evolution files updated (if applicable)
- [ ] CI pipeline passing

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Mental testing documented in TESTS.md
- [ ] Tested with: [Node version, browser, etc.]

## Documentation
- [ ] README updated (if user-facing change)
- [ ] CHANGELOG.md updated
- [ ] New examples added (if applicable)
- [ ] Skill file created/updated (if applicable)

## Reviewers
@autoqcoder/core-team @autoqcoder/architect-team (choose appropriate)

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Additional Notes
[Anything else?]
```

### 5. Review Process

1. **Automated checks** (CI):
   - Lint, type-check, tests, security scan, self-score calculator
   - All must pass ✅

2. **Team review** (CODEOWNERS):
   - Core team reviews `AGENTS.md`, `AUTO-CONTINUE.md`
   - Architect team reviews skill definitions
   - Docs team reviews documentation
   - DevOps reviews CI/CD changes

3. **Address feedback**:
   - Make requested changes
   - Push to same branch (no force-push if avoidable)
   - Mark resolved in PR conversation

4. **Approval**:
   - At least 1 approval from core team
   - All automated checks green
   - No outstanding review comments

5. **Merge**:
   - Squash and merge (clean history)
   - Delete branch after merge
   - Update PROJECT_STATE.md if significant change

---

## Quality Standards (AutoQCoder on Itself!)

autoqcoder applies its own standards to itself:

- ✅ All functions ≤20 lines
- ✅ Complexity ≤10
- ✅ 100% error handling (scripts/)
- ✅ Self-score ≥90 on every change
- ✅ No code deletions (preservation rule)
- ✅ Evolution files updated after each round
- ✅ Mental testing documented
- ✅ CI/CD passing before merge

**We practice what we preach.**

---

## Adding Example Projects

Example projects in `examples/` demonstrate skill application.

### Structure

```
examples/{project-name}/
├── README.md           # Describe project, features, how to run
├── src/                # Source code (apply AGENTS.md standards)
├── test/               # Tests (unit, integration)
├── benchmarks/         # Performance benchmarks (optional)
├── db/migrations/      # Database migrations (if applicable)
├── docker-compose.yml  # Orchestration (optional)
├── package.json        # Dependencies (if Node.js)
└── TESTS.md            # Mental testing suite or actual tests
```

### Submit Example

1. Complete project following v2.0 standards
2. Self-score ≥90
3. Include README with quick start
4. Include TESTS.md (mental or actual)
5. Open PR with description: `feat: add {project-name} example`

---

## Community

### Platforms (Coming Soon)

- **Discord**: [Join](https://discord.gg/autoqcoder) - Real-time chat
- **Slack**: [#autoqcoder](slack://) - Alternative
- **GitHub Discussions**: Q&A, ideas
- **Twitter**: @autoqcoder - News & updates
- **Blog**: https://autoqcoder.dev - Articles, tutorials

### Code of Conduct Enforcement

Report violations to **security@autoqcoder.dev**. All reports confidential.

---

## Recognition

Contributors are recognized:

- **CONTRIBUTORS.md** - List of all contributors
- **Release notes** - Mentioned in CHANGELOG
- **GitHub profile** - Added to organization if active
- **Swag** - T-shirts, stickers for significant contributions (Phase 5)

---

## Questions?

- **Documentation:** Read [FAQ.md](FAQ.md), [QUICK_REFERENCE_CARD.md](QUICK_REFERENCE_CARD.md)
- **Migration:** See [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)
- **Issues:** [GitHub Issues](https://github.com/autoqcoder/autoqcoder/issues)
- **Email:** team@autoqcoder.dev (non-security), security@autoqcoder.dev (security)

---

**Thank you for contributing!** Together we build production-ready code. 🚀

---

**Last Updated:** 2025-05-25  
**Version:** 2.0  
**Maintainer:** autoqcoder core team
