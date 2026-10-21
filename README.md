# autoqcoder

Self-optimizing prompt engine for AI coding agents - Production-ready code generation with continuous evolution.

MIT License. Repository: https://github.com/cotapelu/autoqcoder

## Install

### Option 1: npm (recommended)

```bash
npm install github:cotapelu/autoqcoder
npx autoqcoder install
```

### Option 2: npx (no install)

```bash
npx autoqcoder install
```

### Option 3: Copy files manually

Copy `AGENTS.md`, `AUTO-CONTINUE.md`, `GOAL.md`, and `skills/` directory to your project root.

## Quick Start

```bash
# 1. Install autoqcoder files to your project
npx autoqcoder install

# 2. Initialize evolution framework
npx autoqcoder init

# 3. Run evolution cycle
npx autoqcoder evolve

# 4. Run system audit (10 dimensions)
npx autoqcoder audit

# 5. Run quality gate checks
npx autoqcoder quality
```

## Commands

| Command | Description |
|---------|-------------|
| `install` | Copy AGENTS.md, AUTO-CONTINUE.md, GOAL.md and skills/ to current project |
| `init` | Initialize autoqcoder in current project |
| `evolve` | Start evolution cycle (read rules, update docs, commit) |
| `audit` | Run system audit (10 dimensions from AGENTS.md Section 8) |
| `quality` | Run quality gate checks (line counts, sections, secrets) |

## Files

| File | Purpose |
|------|---------|
| `AGENTS.md` | Self-Optimizing Prompt Engine (v3.0) - 主要 pháp luật |
| `AUTO-CONTINUE.md` | Autonomous Continuous Improvement Workflow (v3.0) |
| `GOAL.md` | Evolution goals, success criteria, roadmap (v3.1) |
| `skills/*.md` | Skill definitions (13 skills for different domains) |
| `docs/AGENT_METRICS.md` | Performance tracking and evolution metrics |
| `docs/AGENT_PROFILE.md` | Self-awareness, weaknesses, risk register |
| `docs/EVOLUTION.md` | Evolution roadmap, trajectory, phase status |

## Skills (13 total)

| Skill | Domain | Section |
|-------|--------|---------|
| `angular-modular-architect` | Frontend Angular | AGENTS.md Section 11 |
| `react-architect` | Frontend React | AGENTS.md Section 11 |
| `go-architect` | Backend Go | AGENTS.md Section 12 |
| `python-architect` | Backend Python | AGENTS.md Section 12 |
| `rust-architect` | Backend Rust | AGENTS.md Section 12 |
| `dotnet-modular-architect` | Backend .NET | AGENTS.md Section 12 |
| `erp-architect` | Fullstack ERP | AGENTS.md Sections 11-12 |
| `backend-db-pattern` | Database (4 Steps) | AGENTS.md Section 7 |
| `iam-platform-layer` | IAM Platform | AGENTS.md Section 9 |
| `code-review` | Code Review | AGENTS.md Section 8, 16 |
| `system-audit` | System Audit | AGENTS.md Section 8 |
| `push-guide` | 27-Gate Pipeline | AGENTS.md Section 15 |
| `test-rule` | Test Generation | AGENTS.md Section 7 |

## Quality Gates

Before every commit, verify:

- Functions ≤20 lines (business), ≤50 lines (UI)
- Cyclomatic complexity ≤10
- No 5+ duplicate lines
- 100% error handling (public API)
- 100% input validation (external)
- No hardcoded secrets
- Testable (no direct DB/network in business logic)
- Coverage ≥80% (if tests exist)
- All tests pass
- Documentation updated

## Evolution Cycle

Every evolution round must:

1. Read ALL skill files in `skills/`
2. Sync terminology between AGENTS.md and skills/
3. Update YAML frontmatter on all SKILL.md files
4. Ensure every SKILL.md has Output Format + Khi nào dùng
5. Update cross-reference table (AGENTS.md Section 13.1)
6. Evolve outdated/missing skill files
7. Update docs/AGENT_METRICS.md, AGENT_PROFILE.md, EVOLUTION.md
8. Verify quality gate ≥90/100
9. Verify skills metadata consistency 100%
10. `git add -A && git commit`

## License

MIT
