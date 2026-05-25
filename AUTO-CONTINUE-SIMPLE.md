# AUTO-CONTINUE-SIMPLE.md - Simplified Agent Workflow
*Version: v3 - Educational Reference Only*

**Note:** This is a simplified reference version. For production use, use `AUTO-CONTINUE.md` v2.1 (135 lines, self-score 100, full evolution features).

---

## WORKFLOW (MANDATORY)

```
Analyze → Clarify → Plan → Test(fail) → Implement → Refactor → Optimize → Verify

LOOP: while failed || improvable || not_minimal:
  detect → improve → test → verify
```

---

## PRINCIPLES

- **Simplicity-first** (200→50 lines target)
- **No over-engineering**
- **Declarative > Imperative**
- **Readable > Clever**

---

## DONE

- ✅ Requirements met
- ✅ Tests 100% pass
- ✅ Minimal & clear code
- ✅ No hidden assumptions
- ✅ No regression

---

## ANTI-SLOP (STRICT)

**FORBIDDEN:**
- Bloat
- Abstraction
- Side effects
- Duplication
- Premature optimization

---

## SCOPE

**OUT** (Không làm trong này):
- DevOps
- Infrastructure
- CI/CD
- Deployment
- Cloud
- Server/Ops
- Meetings

**IN** (Focus vào này):
- Security
- Testing
- Bug Fix
- Code Quality
- Performance
- Scalability

---

## TARGETS

| Metric | Target |
|--------|--------|
| Coverage | ≥80% |
| Functions ≤20 lines | 100% |
| Complexity ≤10 | 100% |
| Error handling | 100% |
| Security | 100% |
| Self-Score | ≥90 |

---

## COMPARISON: v3 vs v2.1 (Production)

| Feature | v3 (Simple) | v2.1 (Production) |
|---------|-------------|-------------------|
| **Workflow** | ✅ 8 steps | ✅ 8 steps |
| **Evolution tracking** | ❌ Missing | ✅ 3 files (metrics, profile, evolution) |
| **Git commit** | ❌ Missing | ✅ Mandatory after each round |
| **Mental testing** | ❌ Missing | ✅ Full framework (297% coverage) |
| **Code preservation** | ❌ Missing | ✅ KHÔNG XÓA rule (0 deletions) |
| **Change risk assessment** | ❌ Missing | ✅ Low/Medium/High + rollback time |
| **Missing code = write more** | ❌ Missing | ✅ Write-only policy |
| **Skill integration** | ❌ Missing | ✅ 10 skills defined |
| **Debugging checklist** | ❌ Missing | ✅ 10-step systematic process |
| **Quick reference** | ❌ Missing | ✅ Cheat sheet included |
| **Continuous loop mode** | ❌ Missing | ✅ Auto-continue evolution |
| **Session start** | ❌ Missing | ✅ Read repo state mandatory |

**v2.1 Production Features (135 lines, self-score 100):**
- Session Start
- Evolution & Self-Improvement
- Git Commit Requirement
- Mental Testing Mode
- Code Preservation Rule
- Change Cost & Risk
- Missing Code = Write More
- Skill Integration (10 skills)
- Debugging Checklist
- Quick Reference
- Continuous Loop Mode
- DONE + ANTI-SLOP

---

## WHEN TO USE WHICH VERSION?

### Use **v2.1 (AUTO-CONTINUE.md)** if:
- ✅ Production work
- ✅ Self-evolution required
- ✅ Team collaboration
- ✅ Quality gates enforcement
- ✅ Metrics tracking
- ✅ Git discipline needed

### Use **v3 (AUTO-CONTINUE-SIMPLE.md)** if:
- 📚 Learning/teaching basic workflow
- 📝 Quick reference (printed cheat sheet)
- 🎯 Minimalist teams (no evolution tracking)
- ⚡ Simple projects (no CI/CD)
- 🔍 Want to understand core concepts first

---

## QUICK START (v3 Principles Only)

1. **Follow the 8-step workflow** always
2. **Apply principles**: Simplicity, no over-engineering
3. **Respect scope**: Only do IN items, avoid OUT items
4. **Hit targets**: ≥80% coverage, ≤20 lines/func, ≤10 complexity
5. **Never skip**: Test, verify, minimal code
6. **Anti-patterns**: Avoid bloat, duplication, side effects

---

## MIGRATION: v3 → v2.1

When ready for production:

1. Switch to `AUTO-CONTINUE.md` (v2.1)
2. Add evolution files: `docs/AGENT_METRICS.md`, `docs/AGENT_PROFILE.md`, `docs/EVOLUTION.md`
3. Enforce git commits after each round
4. Run mental tests (no code writing)
5. Apply 10 skills (read before modify)
6. Use debugging checklist for issues
7. Track metrics and update evolution files

---

## LIMITATIONS OF v3

⚠️ **v3 is NOT production-ready because:**

1. **No evolution tracking** → Can't measure improvement
2. **No git discipline** → No audit trail, hard to rollback
3. **No mental testing framework** → Risk of missing scenarios
4. **No code preservation rule** → Risk of accidental deletions
5. **No skills integration** → Inconsistent architecture
6. **No debugging methodology** → Time-consuming debugging
7. **No change risk assessment** → High-risk changes unchecked
8. **No continuous loop** → Manual next-task identification

**Result:** v3 suitable for learning, not for production deployment.

---

## CONCLUSION

**v2.1 (135 lines) is the recommended production version** with:
- ✅ 100% self-score
- ✅ All 12 critical features
- ✅ Real-world validation
- ✅ Zero code deletions
- ✅ Full evolution system
- ✅ Git discipline
- ✅ Mental testing (297% coverage)
- ✅ 10 skills integrated
- ✅ Complete debugging framework

**v3 (80 lines) is educational reference** showing core workflow without evolution overhead.

---

*v3 Simple: ~80 lines. For learning only.  
Production: Use AUTO-CONTINUE.md v2.1 (135 lines, self-score 100).*
