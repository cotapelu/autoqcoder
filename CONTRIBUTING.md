# Contributing to autoqcoder

Thank you for considering contributing! This document outlines the guidelines and process.

---

## What is autoqcoder?

autoqcoder is a self-optimizing prompt engine for AI coding agents. It consists of:
- `AGENTS.md` - The core prompt (must stay ≤100 lines)
- `AUTO-CONTINUE.md` - Workflow for continuous improvement
- Supporting documentation and tests

**Design Philosophy:** Simplicity-first, no bloat, production-ready code generation with ≥90 self-score.

---

## Ways to Contribute

1. **Bug Reports** - Issues with AGENTS.md output quality
2. **Feature Requests** - New quality gates or improvements
3. **Documentation** - Clarify sections, add examples
4. **Tests** - Improve test coverage for AGENTS.md validation
5. **Real-World Examples** - Share projects using autoqcoder (todos-api, payment-service, etc.)

---

## Before Contributing

### Read These
- [AGENTS.md](AGENTS.md) - The prompt engine itself
- [AUTO-CONTINUE.md](AUTO-CONTINUE.md) - The workflow we follow
- [CHANGELOG.md](CHANGELOG.md) - Version history
- [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) - How we evolved

### Principles to Uphold
- **≤100 lines** for AGENTS.md - absolutely firm
- **No bloat** - every section must have clear ROI
- **Self-score ≥90** - all changes must improve or maintain quality
- **Anti-pattern free** - no over-abstraction, no complexity
- **Backward compatible** - v1.5 is a strict superset of v1.42

---

## Contribution Process

### 1. Open an Issue First
For any non-trivial change, open an issue to discuss:
- What problem are you solving?
- Proposed solution?
- Impact on line count and self-score?
- Breaking changes?

This prevents wasted effort on rejected approaches.

### 2. Fork & Branch
```bash
git clone https://github.com/your-username/autoqcoder.git
cd autoqcoder
git checkout -b feature/your-feature-name
```

### 3. Make Changes
- Ensure AGENTS.md remains ≤100 lines
- Run `bash test_verification.sh` - all must pass
- Run `npm test` - all unit tests must pass
- Update documentation as needed
- Follow existing style: concise, dense, minimal

### 4. Self-Review Gate
Before submitting PR, apply the REVIEW GATE from AGENTS.md to your changes:

#### Phase 1: Metrics
- [ ] Self-score improvement? (document in PR)
- [ ] All existing tests pass?
- [ ] New tests added? (if applicable)
- [ ] No regression in line count?

#### Phase 2: Anti-patterns
- [ ] No God Object (is AGENTS.md still ≤100 lines?)
- [ ] No Arrow Code (clear sections, no deep nesting)
- [ ] No Magic Constants (justified changes)
- [ ] No Shotgun Surgery (changes localized)

#### Phase 3: Devil's Advocate
- [ ] Could this break existing AI agent behavior?
- [ ] Is there a simpler alternative?
- [ ] Are edge cases covered?
- [ ] Would a senior engineer understand the change?

**OUTPUT GATE:** Only proceed if ALL pass.

### 5. Commit Guidelines
Use [Conventional Commits](https://www.conventionalcommits.org/):
```
feat: add performance benchmarking section
fix: correct line count check threshold
docs: clarify REVIEW GATE steps
chore: update dependencies
```

Format: `type(scope): description`
- `feat` - new feature (minor version bump)
- `fix` - bug fix (patch bump)
- `docs` - documentation only
- `chore` - maintenance, no user impact

### 6. Pull Request
Fill the PR template completely:
- **Description**: What changed and why
- **Quality**: Self-score before/after, line count delta
- **Tests**: Added/updated tests
- **Verification**: How to test (commands)
- **Breaking Changes**: None expected for AGENTS.md edits
- **Docs**: Updated USAGE_EXAMPLES.md? Added new examples?

### 7. CI Checks
PR must pass:
- Line count ≤100
- All required sections present
- No prohibited patterns (eval, hardcoded secrets)
- Existing tests + new tests (if any)

### 8. Review
- One maintainer approval required
- Address feedback promptly (within 48h)
- Squash commits before merging
- Maintainers may request changes to preserve simplicity

---

## AGENTS.md Editing Rules

### Strict Constraints
- **Max 100 lines** - measured by `wc -l`
- **No new anti-patterns** - must maintain or improve quality
- **Trigger-based additions only** - new sections only if keyword-triggered
- **Merge, don't add** - if adding new content, remove or merge existing

### Adding a New Quality Gate
If you believe a new quality dimension is needed (e.g., "Accessibility", "Internationalization"):

1. **Prove necessity**: Show at least 3 real-world failures it would prevent
2. **Demonstrate ROI**: How much quality improvement? Quantify
3. **Minimal wording**: How to express in ≤5 lines?
4. **Trigger keywords**: What user queries should activate it?
5. **Penalty**: What penalty for missing it? (-5, -10, -15?)

Submit as issue with above details. If approved, we'll merge by replacing an existing lower-impact section.

### Modifying Existing Sections
- Keep existing structure intact unless reorganizing for clarity
- Don't remove mandatory items (TOP 5, REVIEW GATE)
- If changing self-score weights, justify with data from real AI outputs
- Preserve backward compatibility - don't break existing paradigms

---

## Testing Standards

### test_verification.sh
Must always pass:
```bash
bash test_verification.sh
# Expected: All PASS ✓
```

### Unit Tests (test/*.test.js)
Add tests for new AGENTS.md features:
- Section presence
- Line count constraints
- Pattern validation
- No prohibited content

Run: `npm test`

### Sample Output Validation
If your change affects expected AI output, update `sample_output.md` and add new example to `USAGE_EXAMPLES.md`.

---

## Documentation Updates

When changing AGENTS.md, check if these need updates:

| File | Why update |
|------|------------|
| `README.md` | Version, stats, features list |
| `CHANGELOG.md` | Add entry under [Unreleased] |
| `USAGE_EXAMPLES.md` | Add new usage pattern, gotchas |
| `MIGRATION_GUIDE.md` | If breaking change (avoid) |
| `sample_output.md` | Show new section in action |

Don't update `experiments/` - those are playground variants.

---

## Decision Framework

When in doubt, ask:

1. **Does this make AGENTS.md simpler?** If no, reconsider.
2. **Can this be a triggered conditional?** If yes, make it keyword-triggered, not always-on.
3. **Would this increase self-score by ≥5 points?** If marginal impact, skip.
4. **Is there a simpler alternative?** Choose simplest.
5. **Does this violate any AUTO-CONTINUE.md principle?** If yes, abandon.

---

## Code of Conduct

- Be respectful and constructive
- Focus on technical merits, not personal preferences
- Assume good intent
- Welcome newcomers - this is a learning community
- No gatekeeping - AGENTS.md is for everyone

---

## Questions?

- **Issues**: https://github.com/cotapelu/autoqcoder/issues
- **Discussions**: https://github.com/cotapelu/autoqcoder/discussions
- **Email**: (maintainer contact if needed)

---

## Current Maintainers
- @cotapelu - Original author

---

**Thank you for helping make AI coding agents produce production-ready code!**

Remember: Simplicity is the ultimate sophistication. Keep it under 100 lines.