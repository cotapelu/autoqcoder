# Frequently Asked Questions (FAQ)

**autoqcoder v2.0 - Production-ready prompt engine**

---

## General Questions

### Q: What is autoqcoder?

**A:** autoqcoder is a **self-optimizing prompt engine** for AI coding agents. It provides production-grade quality standards, mental testing methodology, self-evolution framework, and specialized skill definitions for various architectures (Angular, React, .NET, Go, Rust, Python, etc.).

### Q: v1.5 vs v2.0 - what's the difference?

**A:** v2.0 adds:
- **Self-evolution framework** (3 memory files + continuous loop)
- **Production readiness enforcer** (14 principles)
- **Mental testing mode** (optional test code replacement)
- **Code preservation rule** (KHÔNG XÓA CODE)
- **Change risk model** (Low/Medium/High assessment)
- **Skill integration** (10 specialized architectures)
- **Missing code = write more** principle
- **CI/CD templates** (GitHub Actions, husky hooks)
- **Real-world validated** example (todos-api v2.0)

v1.5 remains simpler (79 lines). v2.0 is comprehensive (467 lines + skills).

---

## Getting Started

### Q: How do I install autoqcoder?

**A:**
```bash
# From npm (recommended)
npm install autoqcoder --save-dev

# Or copy files directly
npx autoqcoder-install

# Or manual download
curl -O https://raw.githubusercontent.com/autoqcoder/main/AGENTS.md
curl -O https://raw.githubusercontent.com/autoqcoder/main/AUTO-CONTINUE.md
```

### Q: What files do I need?

**A:** Minimum:
- `AGENTS.md` - Quality standards (required)
- `AUTO-CONTINUE.md` - Workflow (required)

Optional but recommended:
- `docs/AGENT_METRICS.md`
- `docs/AGENT_PROFILE.md`
- `docs/EVOLUTION.md`
- `docs/PROJECT_STATE.md`
- `.github/workflows/ci.yml`
- `.husky/pre-commit`

### Q: How do I start using it?

**A:**
1. Place AGENTS.md và AUTO-CONTINUE.md trong project root
2. Read AUTO-CONTINUE.md → understand workflow
3. Read relevant skill file from `mate/skill/` before coding
4. Start your first "vòng loop" (see QUICK_REFERENCE_CARD.md)
5. Update evolution files after each round
6. Git commit mandatory after each round

---

## Workflow Questions

### Q: What is a "vòng loop"?

**A:** Một vòng evolution = một chu kỳ hoàn chỉnh:
- Read codebase
- Plan improvements
- Implement changes
- Verify quality gates
- Update evolution files
- Git commit
- Continue to next task (automatic)

Mỗi vòng nên nhỏ (1-2 hours) và focus vào một improvement.

### Q: Do I have to update all 3 evolution files every time?

**A:** **YES, mandatory.** Skipping là vi phạm nguyên tắc.

- `AGENT_METRICS.md`: Update với **actual numbers** (not baselines)
- `AGENT_PROFILE.md`: Note weaknesses exposed, improvement focus
- `EVOLUTION.md`: Adjust trajectory nếu changed

### Q: What if my self-score is below 90?

**A:** Don't proceed. Review DEVIL'S ADVOCATE section in AGENTS.md:
- Check failure modes
- Check scalability
- Check security
- Check edge cases
- Check SLOs

Fix issues, recalculate, then proceed. Aim for ≥95 for buffer.

### Q: Can I delete code I wrote yesterday?

**A:** **KHÔNG ĐƯỢC** (except as last resort). Code preservation rule:
- Instead: comment out, disable, or refactor in place
- Use `#if false` hoặc feature flag
- Document why disabled in commit message
- Xóa code = violation, may require rollback

---

## Quality Gates

### Q: What if I can't achieve 100% error handling?

**A:** All public functions must have error handling. If you can't handle a particular error, wrap it và log context, then re-throw. At minimum:
```javascript
try {
  // code
} catch (error) {
  logger.error('Context', { error: error.message, ... });
  throw error; // or return error indicator
}
```

### Q: Are unit tests mandatory?

**A:** **No** - you can use **mental testing** instead, provided:
- You mentally cover ALL scenarios (valid/invalid/edge/error)
- Document mental tests in TESTS.md or comments
- Flow coverage UI→DB & DB→UI verified
- All branches covered

For complex logic, actual unit tests recommended. For simple logic, mental OK.

### Q: How do I calculate self-score?

**A:** Use formula:
- R (Reliability 30): Func≤20, Comp≤10, No dup, Err100%, Validation, Testable
- M (Maintainability 25): No anti-patterns, SRP, DIP, naming
- S (Security 20): All 100% (input validation, SQL injection prevention, auth, secrets)
- T (Testability 15): Coverage ≥80% OR mental test 100%
- P (Performance 10): O(n), no N+1, benchmarks

Add up: max 100. Need ≥90.

---

## Skill Definitions

### Q: How do I know which skill to use?

**A:** See QUICK_REFERENCE_CARD.md → "Skill Selection Guide":

| Context | Skill |
|---------|-------|
| Angular frontend | `angular-modular-architect` |
| React frontend | `react-architect` |
| .NET backend | `dotnet-modular-architect` |
| Go backend | `go-architect` |
| Rust backend | `rust-architect` |
| Python backend | `python-architect` |
| Database changes | `backend-db-pattern` (4 steps) |
| Code cleanup | `code-review` (vibe-cleaner) |
| Fullstack ERP | `erp-architect` |
| Auth/security | `iam-platform-layer` |

**Always read the skill file before modifying code.**

### Q: Can I create my own skill definition?

**A:** **Yes!** Create `mate/skill/your-skill/SKILL.md` following format:
```markdown
---
name: your-skill
description: ...
license: MIT
compatibility: opencode
metadata:
  audience: senior-developers
  scope: ...
---

[Nội dung chi tiết]
```

Then reference it in your work.

---

## Troubleshooting

### Q: I forgot to update evolution files. What now?

**A:** Update them **immediately** with correct numbers retroactively. Document in commit:
```
chore: evolution - forgot to update metrics, now updating with round 5 data
```

Repeated violations may lower self-score due to process non-compliance.

### Q: My mental testing missed a bug in production. What went wrong?

**A:** Review AGENT_PROFILE.md - add this weakness. Then:
1. Update mental testing checklist to cover this scenario
2. Add actual unit test for this case (even if mental normally)
3. Update EVOLUTION.md with improvement plan
4. Consider if actual test code should be required for this module

### Q: Git commit says "non-fast-forward" - can I force push?

**A:** **KHÔNG ĐƯỢC** - preserve history. Always:
```bash
git pull --rebase origin main
# Resolve conflicts if any
git push
```

Never force push on shared branches. Use feature branches for experiments.

### Q: Should I apply v2.0 to legacy code?

**A:** Yes, but incrementally:
1. Start with new features (not legacy)
2. Apply mental testing to bug fixes in legacy
3. Gradual refactor: one module at a time
4. Update PROJECT_STATE.md with legacy status
5. Document technical debt in EVOLUTION.md

### Q: What if my team doesn't follow v2.0?

**A:** You're the agent - lead by example:
1. Apply v2.0 to your own code
2. Share QUICK_REFERENCE_CARD.md
3. Document benefits in AGENT_METRICS.md
4. Propose team adoption in retrospective
5. Use peer review to spread knowledge

---

## Migration

### Q: How do I migrate from v1.5 to v2.0?

**A:** See `MIGRATION_GUIDE.md`:

1. Backup current files
2. Replace AGENTS.md & AUTO-CONTINUE.md with v2.0
3. Create 4 evolution files in `docs/`
4. Update workflow (commit after each round, update metrics)
5. Apply skill definitions to current work
6. Run first v2.0 round and validate self-score ≥90

### Q: Can I use v2.0 alongside v1.5?

**A:** Not recommended. Conflicts will arise. Choose one version per project.

If you need v1.5 simplicity for small project, use separate repos.

---

## CI/CD Integration

### Q: How do I enable GitHub Actions?

**A:**
1. Copy `.github/workflows/ci.yml` to your repo
2. Adjust test commands, paths
3. Set secrets in repo settings:
   - `DOCKER_USERNAME`, `DOCKER_PASSWORD` (if pushing images)
   - `SLACK_WEBHOOK` (if notifying Slack)
4. Push to trigger first run

### Q: What if CI fails on self-score check?

**A:** The review-gate job calculates self-score from your code. If <90:
1. Check the generated report (artifacts)
2. Identify failing categories
3. Fix issues (add validation, error handling, tests)
4. Commit and push again

---

## Evolution Files

### Q: What if I don't have real metrics yet?

**A:** Start with baselines (0), then update after first real work. Example:

```markdown
## Iteration Metrics
- **Avg iterations/task:** 0 (baseline)
- **Completed:** [After round 1: "2"]
```

Never leave 0 after you've done work.

### Q: How often should I update EVOLUTION.md?

**A:** After **every trajectory change**:
- New phase started
- Goals changed
- Timeline adjusted
- New skills added
- Major refactor planned

### Q: What goes in AGENT_PROFILE.md weaknesses?

**A:** Things you consistently fail at:
- "Complex concurrent state management - error prone"
- "Large dataset performance optimization - N+1 queries"
- "Legacy code integration - breaking changes"

Also strengths:
- "Clean architecture design"
- "Repository pattern"
- "TypeScript strict mode"

---

## Real-World Examples

### Q: Where can I see v2.0 in action?

**A:** `examples/todos-api/` - complete Node.js/Express API:
- All functions ≤20 lines ✅
- 100% error handling ✅
- 100% input validation ✅
- JWT auth, rate limiting ✅
- Self-score 95/100 ✅
- Mental test coverage 297% ✅

Also see skill examples in each `mate/skill/*/SKILL.md`.

---

## Publishing

### Q: How do I publish my own autoqcoder config?

**A:**
1. Create your custom AGENTS.md (based on v2.0)
2. Test on a project
3. Update version in README
4. `npm publish` (if using package.json template)
5. Share with team or community

**Note:** Respect MIT license. Include attribution to autoqcoder.

---

## Support

### Q: Where do I get help?

**A:**
- **Documentation:** Read this FAQ, MIGRATION_GUIDE.md, QUICK_REFERENCE_CARD.md
- **Examples:** `examples/` directory
- **Skills:** `mate/skill/` definitions
- **GitHub Issues:** https://github.com/autoqcoder/autoqcoder/issues
- **Community:** (to be set up)

### Q: I found a bug. How do I report?

**A:** Open GitHub issue with:
- Version (v2.0, commit hash)
- Steps to reproduce
- Expected vs actual
- Screenshots/logs if applicable
- Project context (language, framework)

---

## Best Practices

### Q: What's the most common mistake?

**A:** Forgetting to update evolution files. Set a pre-commit reminder or add to checklist.

### Q: Should I use mental testing or real tests?

**A:** **Hybrid approach recommended:**
- Mental testing for **logic validation** during development
- Real unit tests for **critical paths** (auth, payment)
- Integration tests for **API contracts**
- E2E tests for **user journeys**

Use mental testing to **identify test cases**, then write actual tests for those you need to automate.

### Q: How do I convince my team to adopt v2.0?

**A:**
1. Show metrics from AGENT_METRICS.md (quality improvements)
2. Share example (todos-api v2.0) vs old code
3. Pilot on a small project, measure outcomes
4. Present at retrospective: reduced bugs, faster reviews
5. Make it mandatory via CI (enforce with review-gate)

---

## Advanced

### Q: Can I automate evolution file updates?

**A:** Yes, create script `scripts/update-metrics.js`:
```javascript
// Count files changed, commits, test coverage from CI
// Write to docs/AGENT_METRICS.md automatically
```

Then add to CI workflow or pre-push hook.

### Q: How do I extend with custom skills?

**A:** Create `mate/skill/your-architect/SKILL.md` with:
- Name, description, audience, scope
- Architecture diagram
- Principles & rules
- Folder structure
- Code examples
- Output format

Then use: `Read mate/skill/your-architect/SKILL.md và apply...`

---

**Still have questions?** Open an issue or check the full documentation in `docs/`.
