# Changelog

All notable changes to the autoqcoder prompt engine are documented here.

---

## [v1.5] - 2025-05-10

### Added
- **Performance Benchmarking** - Required section with p50/p99/throughput targets and real-world constraints
- **Observability** - Structured logging, correlation IDs, metrics endpoint, SLOs, OpenTelemetry tracing
- **Resilience Patterns** - Retry, circuit breaker, timeout, bulkhead, fallback, health checks, graceful shutdown
- **Error Message Quality** - Standardized format with categories, i18n-ready, recovery hints
- **Concurrency Analysis** - Required analysis section for shared state/parallelism (race conditions, deadlocks, async safety)
- **API Deprecation** - Detection, fallback strategies, migration planning, version pinning
- **Verification Automation** - Pre-commit hooks, CI pipeline, Danger.js, Makefile targets
- **Collaboration Standards** - PR template, CODEOWNERS, SLA, escalation paths, branch strategy
- **Versioning & Release** - SemVer 2.0, Conventional Commits, changelog maintenance, dependency pinning
- **Review Gate** - 3-phase mandatory pre-output check (Metrics, Anti-patterns, Devil's Advocate) with OUTPUT GATE
- **Compliance Trigger** - Automated inclusion for GDPR/HIPAA/PCI/SOX/COPPA/audited systems
- **Cost Optimization Trigger** - Automated inclusion for cloud/AWS/GCP/Azure deployments
- **Self-Score Breakdown** - Explicit weighting: Readability 30, Maintainability 25, Security 20, Testability 15, Performance 10

### Improved
- **Compactness** - Optimized from v1.42's minimal 60 lines to comprehensive 79 lines (vs v2.0's 709 lines)
- **Clarity** - Combined related sections (VERIFICATION & COLLABORATION, VERSIONING & DEPRECATION, COMPLIANCE & COST)
- **Enforceability** - Added OUTPUT GATE that blocks subpar code (self-score must be ≥90)
- **Production-readiness** - All v1.42 features retained, enhanced with enterprise-grade quality gates

### Changed
- **Template** - Added explicit structure: TL;DR, Code, Tests, Verification, Gotchas
- **Checks** - Consolidated into single line items with self-score formula
- **Anti-patterns** - Expanded to 12 patterns (from 7 in v1.42) with fixes listed
- **Security** - Added JWT RS256 preference, command injection prevention, threat model requirement
- **Performance** - Added specific targets (p50<100ms, p99<200ms, 1000+ RPS) and benchmark format
- **Test Generation** - Added CI-measured coverage requirement (≥80%), deterministic tests (<100ms)
- **Error Categories** - Standardized 7 categories for consistency

### Deprecated
- None (v1.5 is additive, backward-compatible with v1.42 concepts)

### Removed
- **Meta-optimization** - Removed self-tuning, prompt compression, and validation suite from v2.0 to maintain simplicity
- **Conditional complexity** - v2.0's 28 sections reduced to 15 core + 2 triggered sections
- **Redundant examples** - Kept only essential implementation guidance

---

## [v1.42] - Previous version

### Features
- TOP 5 quality rules
- Basic template (TL;DR, Code, Tests, Verification, Gotchas)
- 7 anti-patterns with fixes
- Security checklist
- Review Gate (3-phase)

### Limitations
- No performance benchmarks
- No observability standards
- No resilience patterns
- No error message quality
- No concurrency analysis
- No verification automation
- No collaboration guidelines
- No versioning standards
- No compliance/cost triggers

---

## [v2.0] - Abandoned (bloat)

### Note
v2.0 (709 lines) was deemed too complex and abandoned in favor of v1.5 (79 lines). See v1.5 for production use.

---

## Upgrade Guide

**From v1.42 to v1.5:**
1. Replace `AGENTS.md` with v1.5 version
2. Update all AI prompts to include: "Follow AGENTS.md v1.5 REVIEW GATE strictly"
3. No breaking changes - v1.5 is a strict superset

**Key new requirements:**
- All code must now pass 3-phase review before output
- Performance-critical code needs benchmark section
- External service calls must implement resilience patterns
- Structured logging and metrics required for services
- Compliance sections auto-included when keywords detected

**Estimated effort:** Minimal - AI will automatically adapt within 2-3 prompts.

---

**Legend:**
- **Added**: New features in this release
- **Improved**: Enhancements to existing features
- **Changed**: Modifications to existing behavior
- **Deprecated**: Features to be removed in future
- **Removed**: Features no longer available
