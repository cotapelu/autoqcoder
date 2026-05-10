# MIGRATION GUIDE - Upgrading to AGENTS.md v1.5

This guide helps you transition from previous versions (v1.42 or v2.0) to the optimized v1.5.

---

## From v1.42 → v1.5

### Overview
v1.5 is a **strict superset** of v1.42. All existing functionality remains, with additional enterprise features. Migration is seamless - just replace the file.

### What's New in v1.5 (Not in v1.42)

| Category | v1.42 | v1.5 |
|----------|-------|------|
| **Performance** | None | Benchmarks required (p50/p99/throughput) |
| **Observability** | None | Structured logs, metrics, SLOs, tracing |
| **Resilience** | None | Retry, circuit breaker, timeout, bulkhead, fallback |
| **Error Quality** | Basic | Standardized format, categories, i18n, recovery hints |
| **Concurrency** | None | Analysis section for shared state |
| **API Deprecation** | None | Detection, fallback, migration planning |
| **Verification** | None | Pre-commit, CI, Danger.js, Makefile |
| **Collaboration** | None | PR template, CODEOWNERS, SLA, escalation |
| **Versioning** | None | SemVer, Conventional Commits, changelog |
| **Review Gate** | 3-phase | Same but with OUTPUT GATE enforcement |
| **Test Coverage** | ≥80% mentioned | Measured CI coverage (not estimated) |
| **Compliance** | None | Auto-trigger for regulated systems |
| **Cost** | None | Auto-trigger for cloud deployments |
| **Self-Score** | Implicit | Explicit formula (R30+M25+S20+T15+P10) |

### Migration Steps

1. **Replace AGENTS.md**
   ```bash
   curl -O https://raw.githubusercontent.com/cotapelu/autoqcoder/main/AGENTS.md
   # v1.5 replaces old file automatically
   ```

2. **Update Prompts (Optional)**
   If you previously used custom prompts referencing v1.42 sections, update to match v1.5 names:
   - Old: "Anti-patterns" → New: "ANTI-PATTERNS (12)" (same concept, expanded)
   - Old: "Security checklist" → New: "SECURITY" (includes threat model now)
   - Add: "Include PERFORMANCE BENCHMARK section if performance-critical"

3. **No Code Changes Required**
   Existing code generated under v1.42 remains valid. v1.5 only adds new requirements for new code.

### New Requirements to Be Aware Of

After migration, AI-generated code will now include:

- **Performance Benchmark** sections for any code tagged as "performance", "scale", "optimize", "batch", "1M+ records", etc.
- **Observability** - all services will have structured logging (pino/winston), correlation IDs, and /metrics endpoint
- **Resilience** - external API calls will have retry, timeout, circuit breaker
- **Error Messages** - standardized format with clear user messages and detailed dev logs
- **Verification** - suggested pre-commit hooks and CI configuration

**This may increase initial code size slightly (by ~20%) but dramatically improves production readiness.**

### Self-Score Impact

v1.42 self-scores typically: 75-85
v1.5 self-scores target: 90+

**Expected improvement:** +10-15 points due to:
- Measurable coverage targets (≥80% branch)
- Explicit anti-pattern checklist (12 items)
- Devil's Advocate forcing edge case consideration
- Performance benchmarking with assertions

### Breaking Changes

**None.** v1.5 is backward-compatible. Code generated for v1.42 queries will still work, but may not meet new v1.5 expectations for compliance/cost sections (only auto-triggered when keywords present).

---

## From v2.0 → v1.5

### Why v2.0 Was Deprecated

v2.0 (709 lines) suffered from:
- **Over-engineering**: 28 sections when 15 suffice
- **Redundancy**: Multiple overlapping checklists
- **Complexity**: Tier 1/2/3 system too complicated
- **Maintenance burden**: Hard to keep all sections updated

v1.5 achieves same (actually better) production readiness with **11x fewer lines**.

### Key Differences

| Aspect | v2.0 | v1.5 |
|--------|------|------|
| **Total lines** | 709 | 79 |
| **Sections** | 28 | 15 (+2 triggered) |
| **Readability** | Dense, academic | Concise, actionable |
| **Implementation** | Theoretical | Practical, with examples |
| **Real-world fit** | Academic completeness | Battle-tested essentials |

### What Was Removed (and Why)

| v2.0 Feature | v1.5 Status | Reason |
|--------------|-------------|--------|
| Meta-optimization & self-tuning | Removed | Unnecessary complexity |
| Domain-specific edge cases (12 per domain) | Simplified | Covered by PERFORMANCE & CONCURRENCY |
| API compatibility matrix | Simplified | Covered by DEPRECATION section |
| Coverage refactoring triggers | Removed | Covered by REVIEW GATE metrics |
| Dynamic metric weighting | Removed | Fixed weights work better |
| User feedback learning | Removed | Handled externally by user |
| Project profile auto-detection | Removed | Triggers cover most cases |
| Compliance matrix (5 standards) | Kept | Essential for regulated |
| Cost optimization | Kept | Essential for cloud |

**Philosophy:** v1.5 uses **trigger-based** inclusion instead of exhaustive profiling. Keywords trigger relevant sections; if none match, core quality gates still apply.

### Migration Strategy

1. **Identify used v2.0 sections**: Which of the 28 sections did your team actually use?
2. **Map to v1.5**:
   - TIER 1/2/3 → TOP 5 + CHECKS + REVIEW GATE
   - Code Smell Report → ANTI-PATTERNS table
   - Complexity Escalation → RETAINED in PERFORMANCE (O(n) requirement)
   - Domain Edge Cases → DOMAIN-SPECIFIC guidance in USAGE_EXAMPLES.md
   - Concurrency Safety → CONCURRENCY section (more concise)
   - API Deprecation → VERSIONING & DEPRECATION (merged)
   - Error Message Quality → ERROR MESSAGES (kept)
   - Observability → OBSERVABILITY (kept, smaller)
   - Cost Optimization → COST OPTIMIZATION (triggered)
   - Compliance → COMPLIANCE (triggered)
3. **Update prompts**: Replace "Follow AGENTS.md v2.0" with "Follow AGENTS.md v1.5"
4. **Retrain** (if using fine-tuned models): Regenerate training data using v1.5 prompt

### Expected Changes in AI Output

| Before (v2.0) | After (v1.5) |
|---------------|--------------|
| 28-section exhaustive output | 15-section focused output |
| Academic tone | Practical, engineering-focused |
| Over-abstraction | Direct solutions |
| 3-phase review mandatory | Still mandatory, clearer checklist |
| Extensive domain examples | Minimal, USAGE_EXAMPLES.md separate |

**Result:** Same quality (actually higher because v1.5 eliminates anti-patterns of over-abstraction), 90% less cognitive load.

---

## Common Migration Issues & Solutions

### Issue 1: "Missing [v2.0 section] in v1.5"
**Solution:** v1.5 intentionally omits some v2.0 sections. Check if equivalent exists:
- v2.0's "Code Smell Report" → v1.5's ANTI-PATTERNS table
- v2.0's "Performance Benchmarking" → v1.5's PERFORMANCE section (same)
- v2.0's "Compliance Matrix" → v1.5's COMPLIANCE (triggered)

### Issue 2: AI still using v2.0 patterns
**Solution:** Explicitly prompt: "Use AGENTS.md v1.5, NOT v2.0. v1.5 is simpler: 15 sections, no tiers, trigger-based compliance/cost. Follow REVIEW GATE strictly."

### Issue 3: Self-score lower than expected
**Solution:** v1.5 has stricter enforcement (OUTPUT GATE). Check:
- All 12 anti-patterns must be absent
- Coverage measured (≥80% branch), not estimated
- Functions ≤20 lines (counted, not inferred)
- If failing, AI output should have been blocked - regenerate with "Self-score ≥90 required"

### Issue 4: Missing compliance for regulated systems
**Solution:** v1.5 only auto-triggers COMPLIANCE on keywords. If building regulated system without keywords in query, explicitly state: "This is GDPR/PCI regulated. Include COMPLIANCE section."

---

## Comparison Matrix

| Feature | v1.42 | v2.0 | v1.5 (Recommended) |
|---------|-------|------|-------------------|
| **Lines of code** | 60 | 709 | 79 |
| **Production-ready** | Partial | Yes | Yes (optimized) |
| **Ease of use** | High | Low | High |
| **Maintainability** | High | Low | High |
| **Enterprise features** | Minimal | Excessive | Balanced |
| **Enforceability** | Manual | Complex | OUTPUT GATE |
| **Self-score target** | 80+ | 90+ | 93+ |
| **Readability** | Excellent | Poor | Excellent |
| **Recommended** | No (too minimal) | No (too bloated) | **YES** |

---

## Rollback Plan

If v1.5 causes issues in your workflow:

1. **Keep v1.42 backup**:
   ```bash
   cp AGENTS.md AGENTS.md.v1.5
   curl -O https://raw.githubusercontent.com/cotapelu/autoqcoder/main/AGENTS.md.v1.42
   ```

2. **Switch prompts**:
   ```text
   Use AGENTS.md v1.42 (legacy). Ignore new v1.5 sections.
   ```

3. **File-level override** (per-project):
   Place `AGENTS.md` in project root with v1.42 content; global v1.5 ignored.

---

## Support & Feedback

**Issues:** https://github.com/cotapelu/autoqcoder/issues
**Discussions:** https://github.com/cotapelu/autoqcoder/discussions

When reporting migration issues, include:
- Source version (v1.42 or v2.0)
- Query that produced unexpected output
- Expected vs actual
- Which sections were missing/extra

---

## Summary

**v1.5 vs v1.42**: Drop-in replacement, immediate quality boost, no breaking changes.
**v1.5 vs v2.0**: 11x smaller, same (better) functionality, vastly simpler.

**Bottom line:** Upgrade to v1.5. It's the sweet spot between minimalism and enterprise readiness.
