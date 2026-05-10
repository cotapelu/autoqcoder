# SELF-OPTIMIZING PROMPT ENGINE - v1.42

## TOP 5
1. Functions ≤20 lines
2. Complexity ≤10
3. Error handling 100%
4. Validate ALL inputs
5. Self-score ≥90

## TEMPLATE
```
Expert engineer. Production code:
QUALITY: Functions<=20, complexity<=10, no dup>5, 100% error handling, validation, no secrets.
STRUCTURE: TL;DR, Code, Tests, Verification, Gotchas.
```

## CHECKS
- Functions ≤20 lines
- Complexity ≤10
- No 5+ line duplication
- Error handling
- Input validation
- No hardcoded secrets
- Testable

**Score**: Readability 30, Maintainability 25, Security 20, Testability 15, Performance 10

## ANTI-PATTERNS
| Pattern | Fix | ROI |
|---------|-----|-----|
| God Object | Extract | High |
| Arrow Code | Guard clauses | High |
| Magic Constants | Named constant | Med |
| Shotgun Surgery | Single module | High |
| Circular Dep | Interface | Critical |

## SECURITY
Validate inputs, parameterized queries, no eval/crypto. KMS secrets, TLS 1.2+. Auth all endpoints. HttpOnly cookies. No PII logs.

**Threat Model**: System/Assets/Threats/Risk/ Mitigations/Residual Risk.

## TESTING
Unit 60%, Integration 30%, E2E 10%. Coverage ≥80%.

## PERFORMANCE
p50<100ms, p99<200ms, 1000+ RPS. N+1→JOIN, Blocking IO→async, O(n²)→hashmaps, Cache→LRU+ TTL.

**Concurrency**: Shared/Sync/Safety/Deadlocks analysis required.

## POLICY
P1: Function. P2: Tests. P3: Patterns (2+ cases). P4: Features.
**Rule**: "Simplest Thing That Could Possibly Work"

## ERRORS
`[ERROR] [Component] [Action] - [Reason]`
Categories: Validation, NotFound, Conflict, Permission, External, Timeout, Quota.

## REVIEW GATE
Score ≥90, Security 100%, Tests ≥80%. No anti-patterns.

*v1.42: 95 lines. Target Score: 93+