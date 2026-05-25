# Migration Guide - v1.5 → v2.0

This guide helps you migrate from **autoqcoder v1.5** (79 lines, basic quality gates) to **v2.0** (467 lines, self-evolution, production readiness enforcer).

---

## 📊 What Changed

| Aspect | v1.5 | v2.0 |
|--------|------|------|
| **Core files** | AGENTS.md (79L) + AUTO-CONTINUE.md (34L) | AGENTS.md (225L) + AUTO-CONTINUE.md (242L) |
| **Self-evolution** | ❌ No | ✅ 3 memory files + loop tracking |
| **Mental testing** | ❌ Test code required | ✅ Mental verification (optional test code) |
| **Production readiness** | ✅ Basic | ✅ 14 principles + flow coverage |
| **Skill integration** | ❌ No | ✅ 6 skill definitions (expandable) |
| **Code preservation** | ❌ Not enforced | ✅ KHÔNG XÓA CODE rule |
| **Change risk model** | ❌ No | ✅ Low/Medium/High assessment |
| **Missing code** | ❌ Skip allowed | ✅ WRITE MORE principle |
| **File size** | 113 lines | 467 lines (+354% but 3x more value) |

---

## ✅ Migration Steps

### Step 1: Backup Your Current Setup

If you've customized AGENTS.md or AUTO-CONTINUE.md:

```bash
cp AGENTS.md AGENTS.md.v1.5.backup
cp AUTO-CONTINUE.md AUTO-CONTINUE.md.backup
```

### Step 2: Replace Core Files

**Option A: Fresh install (recommended)**

```bash
# Remove old files
rm -f AGENTS.md AUTO-CONTINUE.md

# Copy new files from autoqcoder repo or npm package
curl -O https://raw.githubusercontent.com/autoqcoder/main/AGENTS.md
curl -O https://raw.githubusercontent.com/autoqcoder/main/AUTO-CONTINUE.md
```

**Option B: Manual merge (if heavily customized)**

1. Keep your custom sections that aren't in v2.0
2. Add v2.0 content from this repository
3. Ensure no contradictions between old and new rules

### Step 3: Create Evolution Memory Files

v2.0 requires 4 memory files (create if not exist):

```bash
# Create docs/ directory
mkdir -p docs

# Create mandatory evolution files
cat > docs/AGENT_PROFILE.md << 'EOF'
# Agent Profile - Self-Awareness
# Edit this after each round - track weaknesses, improvement focus
...
EOF

cat > docs/AGENT_METRICS.md << 'EOF'
# Agent Metrics - Performance Tracking
# Update with real numbers after each change
...
EOF

cat > docs/EVOLUTION.md << 'EOF'
# Evolution Roadmap - Technical Trajectory
# Plan your improvements over 3-6 months
...
EOF

cat > docs/PROJECT_STATE.md << 'EOF'
# Project State - [Your Project Name]
# Describe what the repository contains, what works, what's missing
...
EOF
```

**Important:** Update these files after **every meaningful change**.

### Step 4: Update Your Workflow

**Old v1.5 workflow:**
```
Analyze → Clarify → Plan → Test → Implement → Refactor → Optimize → Verify
```

**New v2.0 additions:**

1. **Session Start** (mandatory):
   ```
   Read repository → Read PROJECT_STATE.md → Understand capabilities → Identify next task
   ```

2. **After each vòng loop** (mandatory):
   ```
   Update AGENT_METRICS.md (with numbers)
   Update AGENT_PROFILE.md (new weaknesses?)
   Update EVOLUTION.md (trajectory changes)
   Git commit (git add -A && git commit -m "chore: evolution round - ...")
   ```

3. **Mental Testing Mode** (optional but recommended):
   - Instead of writing test code, mentally verify all scenarios
   - Use checklist in AUTO-CONTINUE.md → QUICK REFERENCE
   - Cover valid/invalid/edge/error, flows UI→DB & DB→UI

4. **Production Readiness Checklist** (before finishing):
   - All functions mental-tested
   - All APIs contract verified
   - All edge cases covered
   - Security vulnerabilities none
   - Missing code = written (not skipped)
   - Code preserved (no deletion)

### Step 5: Apply Skill Definitions (Optional)

v2.0 ships with 6 skill definitions in `mate/skill/`:

| Skill | Use Case |
|-------|----------|
| `angular-modular-architect` | Angular feature-based SPA |
| `backend-db-pattern` | Database access (4 steps) |
| `code-review` | Vibe-cleaner cleanup |
| `dotnet-modular-architect` | .NET modular monolith |
| `erp-architect` | Fullstack ERP |
| `iam-platform-layer` | Authentication/Authorization |

**How to use:**
```
When working on a task, read the relevant skill file first.
Apply its patterns to your code.
```

**New in v2.0 (Round 6+):** We've added 4 more skills:
- `react-architect` - React component-based SPA
- `go-architect` - Go backend with Clean Architecture
- `rust-architect` - Rust systems programming
- `python-architect` - Python FastAPI/Django

### Step 6: Update Your CI/CD (Optional but Recommended)

v2.0 includes `.github/workflows/ci.yml` template. To adopt:

1. Copy `.github/workflows/ci.yml` to your project
2. Adjust paths, test commands, and artifact names
3. Enable GitHub Actions in your repo settings

Key jobs:
- `lint-and-type-check`: ESLint, TypeScript, tests, coverage, security audit
- `security-scan`: Trivy + truffleHog for secrets
- `performance-benchmark`: Run bench and compare to baseline
- `mental-test-verification`: Verify mental testing was performed (customize per project)
- `review-gate`: Calculate self-score, check anti-patterns, verify no code deletion
- `deployment-readiness`: Build image, scan, deploy to staging

### Step 7: Run Your First v2.0 Round

**Before you start:**
```bash
# Verify files
ls AGENTS.md AUTO-CONTINUE.md docs/

# Check git status (should be clean)
git status
```

**Complete one vòng:**
1. Choose a task (feature, bug fix, refactor)
2. Read relevant skill file(s)
3. Apply AGENTS.md principles (functions ≤20, 100% error handling, validation, etc.)
4. Mental test all scenarios (use QUICK REFERENCE checklist)
5. Update evolution files with actual numbers
6. `git add -A && git commit -m "chore: evolution round - <description>"`
7. Verify checklist passed (self-score ≥90)

---

## 🔄 Workflow Comparison

### v1.5 Classic Loop

```
[Task] → Analyze → Plan → Write code → Run tests → Refactor → Done
Commit: git commit -m "feat: ..."
```

### v2.0 Enhanced Loop

```
[Task] → Read PROJECT_STATE.md → Read relevant skill → Mental test plan → 
Implement (write MORE code, don't delete) → Verify ALL quality gates → 
Update AGENT_METRICS.md (numbers!) → Update AGENT_PROFILE.md (weaknesses?) → 
Update EVOLUTION.md (trajectory changes?) → 
Git commit (mandatory after EVERY round) → 
Next task (automatic continuous loop)
```

**Key differences:**
- ✅ Must update 3 evolution files after each round
- ✅ Mental testing (optional: actual test code)
- ✅ Never delete code (preservation rule)
- ✅ Write missing code (not skip)
- ✅ Git commit mandatory after each round
- ✅ Continuous loop (no manual start needed)

---

## 📋 Compatibility Matrix

| Feature | v1.5 | v2.0 | Migration Impact |
|---------|------|------|-----------------|
| Functions ≤20 lines | ✅ | ✅ | No change |
| Complexity ≤10 | ✅ | ✅ | No change |
| Error handling 100% | ✅ | ✅ | No change |
| Input validation | ✅ | ✅ | No change |
| Self-score ≥90 | ✅ | ✅ | No change |
| Test generation | ✅ Unit tests | ✅ Mental *or* unit | Flexible |
| Coverage ≥80% | ✅ Measured | ✅ Mental *or* measured | Flexible |
| Self-evolution files | ❌ | ✅ Required | **Add 4 files** |
| Code preservation | ❌ | ✅ Must follow | Behavior change |
| Mental testing mode | ❌ | ✅ Optional | Add to workflow |
| Skill definitions | ❌ | ✅ 10 skills | Read before work |
| Change risk assessment | ❌ | ✅ Required | Add step |
| Git commit requirement | ❌ | ✅ After each round | Behavior change |
| Missing code = write more | ❌ | ✅ Enforced | Behavior change |

---

## ⚠️ Breaking Changes

### BẮT BUỘC changes:

1. **Evolution files must exist and be updated**
   - Old: None
   - New: 4 files in `docs/` required
   - Impact: **High** - must start maintaining these

2. **No code deletion allowed**
   - Old: Could delete dead code freely
   - New: Preservation rule (KHÔNG XÓA CODE)
   - Impact: **Medium** - need to adjust debugging approach

3. **Git commit after each round**
   - Old: Commit whenever
   - New: Mandatory after every vòng loop
   - Impact: **Low** - good practice anyway

4. **Risk assessment for all changes**
   - Old: Not required
   - New: Low/Medium/High per Feature/Refactor/Migration
   - Impact: **Low** - quick evaluation

5. **Missing code must be written**
   - Old: Could skip if "out of scope"
   - New: Write more (not less)
   - Impact: **Medium** - may add more code than minimal

### Optional changes:

1. **Mental testing** (optional)
   - Old: Must write test code
   - New: Can mental test instead (with documentation)
   - Impact: **Low** - choose based on project needs

2. **Skill definitions** (recommended)
   - Old: No specializations
   - New: 10 skill files to reference
   - Impact: **Low** - improves code quality

---

## 🐛 Known Issues & Gotchas

### Issue 1: Evolution files out of date
**Symptom:** AGENT_METRICS.md shows baseline numbers (0) after many changes  
**Fix:** Update metrics manually after each round with real numbers:

```markdown
## Iteration Metrics
- **Tasks completed:** 5 (not 0)
- **Evolution rounds:** 5
- **Files modified:** 10 (actual count)
```

### Issue 2: Forgetting to commit
**Symptom:** Working multiple rounds without git commit  
**Fix:** Set up a pre-push hook or reminder. Or use `git commit -a` habit after each logical step.

### Issue 3: Code deletion temptation
**Symptom:** Wanting to remove "bad" code from previous rounds  
**Fix:**
- Remember: Preservation rule is absolute
- Instead: comment out, disable, or refactor in place
- Use feature flags to hide broken code

### Issue 4: Mental testing feels "unreal"
**Symptom:** Uncomfortable not executing tests  
**Fix:**
- Mental testing is for **logic validation** only
- Still run actual integration tests with real DB
- Document mental tests in TESTS.md or comments

---

## 📈 Rollback Plan

If v2.0 causes issues:

1. **Restore v1.5 files:**
   ```bash
   git checkout HEAD -- AGENTS.md AUTO-CONTINUE.md
   # Or from backups:
   cp AGENTS.md.v1.5.backup AGENTS.md
   cp AUTO-CONTINUE.md.v1.5.backup AUTO-CONTINUE.md
   ```

2. **Remove evolution files (optional):**
   ```bash
   rm -rf docs/
   ```

3. **Revert workflow:**
   ```bash
   git checkout HEAD -- .github/workflows/ci.yml
   rm -rf .husky/
   ```

4. **Update PROJECT_STATE.md** to reflect rollback and reason

5. **Analyze root cause** (why v2.0 didn't work) → update AGENT_PROFILE.md

---

## 🆘 Getting Help

- **Read skill definitions**: `mate/skill/*/SKILL.md`
- **Check examples**: `examples/todos-api/` (v2.0 implementation)
- **Review AUTO-CONTINUE.md** → QUICK REFERENCE for daily use
- **Consult EVOLUTION.md** for roadmap
- **Open an issue** on GitHub with:
  - Version (v1.5 → v2.0)
  - Specific problem
  - Steps to reproduce
  - Expected vs actual

---

## 🎉 After Migration

Once you've completed migration:

1. **Update PROJECT_STATE.md** with migration status
2. **Record in AGENT_METRICS.md**:
   ```
   Migration completed: v1.5 → v2.0
   Files updated: 2 core + 4 docs + optional CI
   Time spent: X hours
   Issues encountered: list any
   ```
3. **Update AGENT_PROFILE.md** if weaknesses exposed during migration
4. **Adjust EVOLUTION.md** if timeline or goals changed
5. **Commit** as final migration step:
   ```bash
   git add -A
   git commit -m "feat: migrate to autoqcoder v2.0 - complete"
   ```

---

## 📚 Additional Resources

- **v2.0 Core Files:**
  - `AGENTS.md` - Quality standards
  - `AUTO-CONTINUE.md` - Workflow
- **Skill Reference:** `mate/skill/` (10 definitions)
- **Example:** `examples/todos-api/` (full v2.0 implementation)
- **Reports:** `AUTOQCODER_EVOLUTION_REPORT.md`, `FINAL_REPORT.md`
- **Push Guidelines:** `mate/PUSHGUIDE.md` (27 quality gates)

---

## 🔄 Version History

- **v1.5** (Current): Basic quality gates, simple workflow
- **v2.0** (Target): Self-evolution, mental testing, production readiness, skills

---

**Need help?** Check `docs/PROJECT_STATE.md` for project-specific notes, or open a GitHub issue.

**Successful migration → update AGENT_METRICS.md with completion date and self-score ≥90.**
