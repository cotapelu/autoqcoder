# Agent Profile - Self-Awareness

**Version:** 2.0
**Last Updated:** 2025-05-25 (after consolidation)

## Tasks Thường Fail (Observed)
- [ ] Complex concurrent state management (not yet tested)
- [ ] Performance optimization for large datasets (>10k)
- [ ] Legacy code integration without breaking changes
- [ ] Multi-tenant data isolation patterns
- [ ] Eventual consistency implementation

## Languages/Stacks Với Error Rate Cao (Hypothesis)
- [ ] Rust (lifetimes, borrow checker)
- [ ] C++ (memory management)
- [ ] Haskell (monads, typeclasses)
- [ ] Elixir (OTP, GenServer)
- [ ] C (manual memory, pointers)

## Fragile Modules (Risk Areas)
- [ ] Authentication/Authorization (security-critical)
- [ ] Payment processing (financial-critical)
- [ ] Real-time collaboration (consistency)
- [ ] Data migration scripts (data loss risk)
- [ ] Distributed transactions (complexity)

## Known Weaknesses (Improving)
- [ ] Over-engineering → **FIXED**: Simplicity-first, reduce abstraction
- [ ] Insufficient edge case testing → **MITIGATED**: Mental testing checklist
- [ ] Cross-module coupling underestimation → **AWARE**: Skill integration helps
- [ ] Missing backward compatibility → **MONITORING**: Versioning rules enforced
- [ ] Inadequate error recovery → **IMPROVING**: Resilience patterns documented

## Strengths (Core Competencies)
- [ ] Clean architecture (modular monolith, feature-based SPA)
- [ ] Repository pattern (4-step)
- [ ] REST API design (OpenAPI)
- [ ] Angular feature modules (Signals, @defer)
- [ ] Code preservation (no-deletion rule)

## Improvement Focus (Next 3-6 months)
1. **Mental testing** - cover all scenarios without actual tests
2. **Risk assessment** - always evaluate Low/Medium/High
3. **Code preservation** - never delete, only fix
4. **Flow coverage** - verify both UI→DB and DB→UI
5. **Missing code detection** - write more, not less
6. **Skill application** - apply 6 skill definitions to real codebase

## Recent Learnings (2025-05-25)
- **Round 1**: Integrated mate v2 (self-evolution, production readiness)
- **Round 2**: Consolidated v1.5+v2 → 149/196 lines (20% reduction)
- **Metrics**: 100% checklist compliance, 2/2 rounds successful
- **Skills**: 6 patterns documented (Angular, .NET, DB, Review, ERP, IAM)
- **Process**: Git commit enforced, evolution files maintained

## Evolution Status
- **Files Added**: docs/ (4), mate/ (13)
- **Files Modified**: AGENTS.md (298→149), AUTO-CONTINUE.md (133→196)
- **Duplication**: Reduced significantly
- **Quality**: Production-readiness enforcer integrated
- **Next**: Apply to actual codebase, generate real metrics
