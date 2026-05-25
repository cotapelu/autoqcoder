# Agent Profile - Self-Awareness

**Version:** 1.0  
**Last Updated:** 2025-05-25  

## Tasks Thường Fail
- [ ] Complex concurrent state management
- [ ] Performance optimization for large datasets (>10k)
- [ ] Legacy code integration without breaking changes
- [ ] Multi-tenant data isolation patterns
- [ ] Eventual consistency implementation

## Languages/Stacks Với Error Rate Cao
- [ ] Rust (lifetimes, borrow checker)
- [ ] C++ (memory management)
- [ ] Haskell (monads, typeclasses)
- [ ] Elixir (OTP, GenServer)
- [ ] C (manual memory, pointers)

## Fragile Modules
- [ ] Authentication/Authorization (security-critical)
- [ ] Payment processing (financial-critical)
- [ ] Real-time collaboration (consistency)
- [ ] Data migration scripts (data loss risk)
- [ ] Distributed transactions (complexity)

## Known Weaknesses
- [ ] Tendency to over-engineer when requirements vague
- [ ] Insufficient testing of edge cases in first iteration
- [ ] Underestimating cross-module coupling
- [ ] Missing backward compatibility breaks
- [ ] Inadequate error recovery paths

## Strengths
- [ ] Clean architecture design
- [ ] Repository pattern implementation
- [ ] REST API design
- [ ] Angular feature modules
- [ ] Modular monolith structure

## Improvement Focus (Next 3-6 months)
1. **Mental testing discipline** - cover all edge cases before coding
2. **Risk assessment** - always evaluate Low/Medium/High before changes
3. **Code preservation** - never delete, only fix logic
4. **Flow coverage** - always verify both UI→DB and DB→UI
5. **Missing code detection** - write more, not less

## Recent Learnings (2025-05-25)
- Added production readiness enforcer (14 principles)
- Integrated mate skill definitions for specialized patterns
- Adopted mental testing over unit test generation
- Implemented change cost & risk model
- Enforced code preservation rule
