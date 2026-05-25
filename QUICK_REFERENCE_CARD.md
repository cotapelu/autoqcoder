# 🤖 AutoQCoder v2.0 - Quick Reference Card

**Production-ready AI coding agent prompt engine**
**Version:** 2.0 | **Self-score:** 95/100

---

## 📋 Daily Checklist (Before Output Code)

```
✅ Functions ≤20 lines
✅ Complexity ≤10
✅ No 5+ duplicates
✅ 100% error handling
✅ 100% input validation
✅ No hardcoded secrets
✅ No direct DB/network in business logic
✅ Test coverage ≥80% (or mental test complete)
✅ All tests pass
✅ No 12 anti-patterns
✅ Devil's advocate passed (6 SLO checks)
✅ Mental testing done (all scenarios)
✅ Flow coverage UI→DB & DB→UI
✅ Missing code written (not skipped)
✅ Code preserved (no deletion)
✅ Risk assessed (Low/Med/High)
✅ Git commit after round
```

---

## 🔄 Workflow (One Vòng Loop)

```
1. SESSION START
   - Read repository
   - Read docs/PROJECT_STATE.md
   - Understand current state

2. ANALYZE
   - Identify highest-impact task
   - Read relevant skill file(s)
   - Mental test plan

3. IMPLEMENT
   - Write code (functions ≤20)
   - 100% error handling
   - Full validation
   - Write MORE (not less) if gaps found

4. VERIFY
   - Self-score ≥90?
   - All quality gates passed?
   - Mental test coverage 100%?

5. EVOLUTION UPDATE
   - Update AGENT_METRICS.md (with numbers!)
   - Update AGENT_PROFILE.md (new weaknesses?)
   - Update EVOLUTION.md (trajectory changes?)
   - Git commit ("chore: evolution round - ...")

6. CONTINUE (automatic)
   - Next highest-impact task
   - Repeat from step 1
```

---

## 🎯 Mental Testing Prompt (Self-Ask)

For each function/module:

```
1. Inputs: valid, invalid, null, empty, boundary?
2. Outputs: expected, error, edge?
3. All branches covered? (if/else/switch)
4. Error paths: exceptions, returns, fallback?
5. Data flow: UI→DB và DB→UI?
6. Security: injection, auth, secrets?
7. Performance: O(n), N+1, blocking I/O?
8. Concurrency: race conditions, locks?
9. State consistency: atomic, immutable?
10. Observability: logs, metrics, traces?
```

**If any answer "NO" → Write code to fix it!**

---

## 🛠️ Skill Selection Guide

| Context | Skill File | Key Pattern |
|---------|-----------|-------------|
| Frontend Angular | `angular-modular-architect` | Feature-based SPA, Signals, lazy loading |
| Frontend React | `react-architect` | Components + Hooks, TypeScript, React Query |
| Backend .NET | `dotnet-modular-architect` | Modular monolith, Platform layer |
| Backend Go | `go-architect` | Clean Architecture, interfaces, gin |
| Backend Rust | `rust-architect` | Fearless concurrency, traits, Tokio |
| Backend Python | `python-architect` | FastAPI/Django, Pydantic, async |
| Database access | `backend-db-pattern` | 4 steps: Service → Repo Interface → Repo Impl → Entity |
| Code cleanup | `code-review` | Vibe-cleaner: remove anti-patterns, naming |
| Fullstack ERP | `erp-architect` | Combined .NET + Angular patterns |
| Auth/Security | `iam-platform-layer` | IUserContext, IAuthorizationService |

**HOW TO USE:**
```
Before modifying code:
1. Identify context (Angular, .NET, database, etc.)
2. Read corresponding skill file
3. Apply patterns rigorously
4. Verify with mental testing
```

---

## 📊 Self-Score Calculation (≥90 Required)

| Category | Weight | Score | Requirements |
|----------|--------|-------|--------------|
| **R**eliability | 30 | /30 | Functions≤20, Complexity≤10, No dup, Error handling, Testable |
| **M**aintainability | 25 | /25 | No 12 anti-patterns, SRP, DIP, naming |
| **S**ecurity | 20 | /20 | Input validation, SQL injection prevention, auth, secrets |
| **T**estability | 15 | /15 | Coverage ≥80%, all branches, all error paths |
| **P**erformance | 10 | /10 | O(n), no N+1, benchmarks, profiling |
| **TOTAL** | **100** | **?** | **≥90 required** |

**Quick check:** If you pass all checklist items above → likely ≥90.

---

## 🔐 Security Essentials (100% Required)

- ✅ **Input validation** - All external inputs validated (route + service)
- ✅ **SQL injection prevention** - Parameterized queries only (never string concat)
- ✅ **XSS prevention** - Auto-escape (React/Angular), CSP headers
- ✅ **CSRF protection** - SameSite cookies, anti-CSRF tokens
- ✅ **Authentication** - JWT RS256, short expiry, refresh tokens
- ✅ **Authorization** - RBAC per resource/action
- ✅ **Secrets management** - Env vars only, never commit, use KMS
- ✅ **Rate limiting** - Per user/IP to prevent abuse
- ✅ **Password hashing** - bcrypt/Argon2 (never plaintext)
- ✅ **HTTPS** - Enforce in production
- ✅ **CORS** - Configured properly
- ✅ **Audit logging** - All auth events, data changes

---

## 🚫 Prohibited (Anti-Patterns)

**12 ANTI-PATTERNS (FIX IMMEDIATELY):**

1. **God Object** - One class does everything → Extract services
2. **Arrow Code** - Deep nesting → Guard clauses, early return
3. **Magic Constants** - Hardcoded values → Named constants
4. **Shotgun Surgery** - Change many files → Single module
5. **Circular Dependency** → Interface, dependency inversion
6. **Deep Inheritance** → Composition over inheritance
7. **Feature Envy** → Move function to correct module
8. **N+1 Queries** → JOIN, batch load, eager loading
9. **Blocking I/O** → Async/await, non-blocking
10. **O(n²)** → Hashmaps, indexes, O(n) algorithm
11. **Unbounded Cache** → TTL, size limit, LRU
12. **Sync Rate Limit** → Token bucket, leaky bucket

---

## 🏗️ Code Preservation Rule

**KHÔNG XÓA CODE** - xóa code là giải pháp cuối cùng.

**Instead:**
1. Read entire file (all lines, imports, dependencies)
2. Understand full context
3. Identify root cause (check braces, indentation, lifetimes)
4. Isolate problem with debug prints/comments
5. Test hypotheses incrementally
6. Fix logic (preserve structure)
7. Have git restore plan ready

**If absolutely necessary:**
- Comment out code (don't delete)
- Use `#if false` hoặc feature flag
- Document why disabled

---

## 📊 Quality Gate Checklist (Before Finish)

```
[ ] All functions mental-tested (valid/invalid/edge/error)
[ ] All APIs contract verified (inputs/outputs)
[ ] All flows UI→DB và DB→UI covered
[ ] All edge cases handled
[ ] All error paths have error handling
[ ] Security: no SQL injection, XSS, CSRF, secrets leak
[ ] Performance: O(n), no N+1, no blocking I/O
[ ] Observability: logs, metrics, traces added
[ ] Documentation: README, API docs updated
[ ] Missing code = written (not skipped)
[ ] Code preservation followed (no deletions)
[ ] Self-score ≥90 calculated
[ ] Risk assessed (Low/Medium/High)
[ ] Git commit ready
```

---

## 🔄 Evolution Files (Maintain After Each Round)

**docs/AGENT_METRICS.md**
```
## Iteration Metrics
- Avg iterations/task: X
- Tasks completed: X
- Evolution rounds: X

## Test Quality Metrics
- Mental test coverage: X%
- Edge cases missed: X

## Stability Metrics
- Rollback count: 0
- Regressions: 0

## Quality Gates Pass Rate
- Self-score ≥90: 100% (X/X)
- Checklist compliance: 100%
```

**docs/AGENT_PROFILE.md**
```
## Tasks Thường Fail
- [ ] Complex concurrent state management

## Known Weaknesses
- [ ] Over-engineering tendency → FIXED: Simplicity-first

## Strengths
- [ ] Clean architecture design

## Recent Learnings
- Round X: Applied skill Y, achieved score Z
```

**docs/EVOLUTION.md**
```
## Phase X (Month Y) - IN PROGRESS
### Goals
- [ ] Achieve target metrics
- [ ] Complete skill integration

### Completed
- [x] task 1
- [x] task 2

### Next Steps
- [ ] task 3
```

**docs/PROJECT_STATE.md**
```
## What Works
✅ Feature A implemented
✅ API endpoint B working

## What Is Missing
- [ ] Feature C not started
- [ ] Tests for module D

## Next Steps
1. Implement feature C
2. Write tests for D
```

---

## 💬 Commit Message Format

```
feat: add user authentication with JWT
fix: resolve N+1 query in todo list
refactor: extract repository pattern for users
chore: evolution round - apply backend-db-pattern
docs: update README with API examples
style: format code with Prettier
test: add unit tests for user service
perf: optimize query with index
```

**Note:** Use `chore: evolution round - ...` for meta-development commits.

---

## 📞 Emergency Procedures

**If tests fail:**
1. Read error message fully
2. Check stack trace
3. Isolate with debug prints
4. Don't delete code to "fix"

**If self-score <90:**
1. Identify failing categories
2. Address root causes (not symptoms)
3. Recalculate before proceeding

**If code deletion tempting:**
1. Stop. Remember preservation rule.
2. Comment out instead.
3. Create `DISABLED_` prefix.
4. Document reason in commit.

**If mental testing overwhelming:**
1. Write actual test code temporarily
2. Validate logic
3. Can revert to mental mode later

---

## 📚 Resources at a Glance

| File | Purpose | Size |
|------|---------|------|
| `AGENTS.md` | Quality standards | 225L |
| `AUTO-CONTINUE.md` | Workflow | 242L |
| `mate/skill/*/SKILL.md` | Architecture patterns | 10 files |
| `mate/PUSHGUIDE.md` | 27 quality gates | Reference |
| `MIGRATION_GUIDE.md` | v1.5 → v2.0 | 400L |
| `QUICK_REFERENCE_CARD.md` | This file | Quick |
| `docs/AGENT_METRICS.md` | Performance tracking | Update |
| `docs/AGENT_PROFILE.md` | Self-awareness | Update |
| `docs/EVOLUTION.md` | Roadmap | Update |
| `docs/PROJECT_STATE.md` | Project memory | Update |
| `.github/workflows/ci.yml` | CI/CD pipeline | 180L |
| `.husky/pre-commit` | Pre-commit hooks | 120L |

---

## 🎯 Target Metrics

- **Function size:** ≤20 lines (100%)
- **Complexity:** ≤10 cyclomatic (100%)
- **Error handling:** 100% coverage
- **Input validation:** 100% coverage
- **Test coverage:** ≥80% branch OR mental test 100%
- **Self-score:** ≥90/100
- **Security:** 100% (all categories)
- **Performance:** p50<100ms, p99<200ms
- **Availability:** 99.9%
- **Code deletion:** 0 (preservation)

---

## ✅ Final Pre-Commit Checklist

```
[ ] Read full AGENTS.md checklist
[ ] Self-score calculated ≥90
[ ] All functions checked ≤20 lines
[ ] All error paths have try/catch
[ ] All inputs validated (route + service)
[ ] No console.log left in code
[ ] No hardcoded secrets
[ ] No SQL injection vulnerabilities
[ ] Mental testing documented (or tests written)
[ ] Flow coverage verified (UI→DB & DB→UI)
[ ] Missing code written (didn't skip)
[ ] No code deleted this round
[ ] Risk assessed (Low/Med/High) in commit message
[ ] Git commit with proper message format
[ ] Evolution files updated (metrics, profile, evolution)
[ ] CI workflow passing (if available)
```

---

**Keep this card handy! Print it, pin it, reference it before every commit.**

**Version:** 2.0 | **Last Updated:** 2025-05-25 | **Self-score:** 95/100 ✅
