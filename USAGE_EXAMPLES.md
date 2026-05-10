# USAGE EXAMPLES - AGENTS.md v1.5

This guide demonstrates how to use the self-optimizing prompt engine in practice.

## Quick Start

### 1. Add to Your Project

```bash
# Manual
curl -O https://raw.githubusercontent.com/cotapelu/autoqcoder/main/AGENTS.md
curl -O https://raw.githubusercontent.com/cotapelu/autoqcoder/main/AUTO-CONTINUE.md

# Or one-line setup
npx github:cotapelu/autoqcoder
```

### 2. Reference in Your Prompts

When working with an AI coding assistant, ensure it reads `AGENTS.md` first:

```
Please read AGENTS.md before proceeding. Now: Build a REST API for user management.
```

---

## Example Queries & Expected Outputs

### Example 1: Simple API Endpoint

**User Query:**
```
Read AGENTS.md. Build: Express.js POST /users endpoint that creates a user with email and password. Store in PostgreSQL, hash password with bcrypt.
```

**Expected AI Output Structure:**
1. **TL;DR** (1 sentence)
2. **Code** (functions ≤20 lines, complexity ≤10)
3. **Tests** (jest/supertest, ≥80% coverage)
4. **Verification** (commands to test)
5. **Gotchas** (edge cases)
6. **Performance Benchmark** (if performance-critical)
7. **Review Gate Checklist** (self-score, anti-patterns, devil's advocate)

**Sample AI Response (abbreviated):**
```javascript
// POST /users - Create new user
async function createUser(req, res) {
  try {
    const { email, password } = req.body;
    // validation...
    const hash = await bcrypt.hash(password, 12);
    const user = await db.users.create({ email, passwordHash: hash });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    logger.error('Create user failed', { error: error.message });
    res.status(500).json({ error: 'Failed to create user' });
  }
}
```

---

### Example 2: Performance-Critical Batch Processing

**User Query:**
```
Read AGENTS.md. Need to process 1M user records from CSV, calculate statistics, write to database. Must handle 10k records/minute. Optimize for speed.
```

**Expected AI Output:**
- Includes **PERFORMANCE BENCHMARK** section (required for performance triggers)
- Uses streaming/batching to avoid O(n²)
- Database bulk insert (not per-row)
- Memory-efficient processing (stream parser)
- Benchmarks: baseline vs optimized, p50/p99 targets, assertions

**Key Requirements Triggered:**
- Performance targets: p50<100ms, p99<200ms, 1000+ RPS
- No O(n²) algorithms
- Test with realistic data (1M+ records)

---

### Example 3: Security-Critical System

**User Query:**
```
Read AGENTS.md. Build payment processing API handling credit cards. PCI-DSS compliance required.
```

**Expected AI Output:**
- **COMPLIANCE** section automatically included (PCI-DSS triggered)
- Threat model (STRIDE analysis)
- Never store CVV or full PAN
- AES-256 encryption at rest, TLS 1.3 in transit
- MFA for admin access
- Audit logs for all transactions
- Tokenization strategy
- Quarterly pentest mention

**Compliance Checklist:**
```
✅ PCI-DSS: Network segmentation, MFA, FIM, quarterly scans
⚠️ Gaps: ASV approval pending (remediate by 2025-Q2)
```

---

### Example 4: Cloud-Native Microservice

**User Query:**
```
Read AGENTS.md. Create user service for AWS deployment. Must be cost-efficient, scalable to 10k RPS.
```

**Expected AI Output:**
- **COST OPTIMIZATION** section triggered (cloud keywords)
- Observability: structured logs, CloudWatch metrics, OpenTelemetry tracing
- Resilience: retry with exponential backoff, circuit breaker, timeout
- Right-sizing recommendations: t3.medium (60-70% CPU), auto-scaling policies
- Infrastructure as Code (Terraform) provided
- Budget alerts ($500/month threshold)

**Cost Tips in Code:**
- Use connection pooling (RDS Proxy)
- Cache frequent queries (ElastiCache Redis)
- Read replicas for scaling reads
- Spot instances for async workers

---

### Example 5: Mobile App Backend

**User Query:**
```
Read AGENTS.md. API for mobile app: offline support, push notifications, battery-efficient. Users: 100k+.
```

**Expected AI Output:**
- Domain edge cases: background fetch, notification taps, deep linking
- Concurrency analysis (shared cache sessions)
- Rate limiting per device/user
- Push notification service integration (Firebase/APNS)
- Offline sync pattern (last-write-wins, conflict resolution)
- Battery impact considerations (batch network calls)

**Performance:**
- p99<200ms for core endpoints
- Payload <5KB (mobile data)
- Client-side caching headers (Cache-Control)

---

### Example 6: Legacy Integration

**User Query:**
```
Read AGENTS.md. Need to integrate with legacy SOAP API that uses WS-Security. Existing monolith is Java EE 6.
```

**Expected AI Output:**
- **LEGACY SYSTEM INTEGRATION** patterns (if v1.5 had this; in v1.5 use general robustness)
- API versioning from start (/api/v1/)
- Strangler fig pattern suggested
- SOAP client with proper WS-Security headers
- Error handling for legacy timeouts/ malformed responses
- Data validation before passing to legacy system

**Migration Plan:**
1. Build wrapper service
2. Dual-write to legacy and new DB
3. Validate data consistency
4. Gradually route traffic
5. Decommission legacy after 90 days

---

### Example 7: Data Processing Pipeline

**User Query:**
```
Read AGENTS.md. Process clickstream data from Kafka, aggregate stats per user, store in ClickHouse. Handle 100k events/sec.
```

**Expected AI Output:**
- Consumer group configuration
- Backpressure handling
- Exactly-once processing (idempotent)
- Batch processing for efficiency
- Metrics: consumer lag, processing rate
- Alerting on lag >1000 messages
- Performance: p50<10ms per batch

---

## Prompt Patterns

### Pattern 1: "Build X with Y constraints"
Always include constraints: "with JWT auth", "with 100k RPS", "PCI compliant". This triggers relevant sections.

### Pattern 2: "Production-ready"
Keyword "production-ready" activates full Tier 1 requirements (all mandatory checks).

### Pattern 3: "For enterprise"
Triggers collaboration standards (PR template, CODEOWNERS, SLA).

### Pattern 4: "Optimize for cost"
Activates cost optimization guidelines even without cloud keywords.

---

## What v1.5 Enforces

Every code output must include (implicitly or explicitly):

1. **Functions ≤20 lines** - extracted if longer
2. **Complexity ≤10** - guard clauses, early returns
3. **Error handling 100%** - try/catch or Result type
4. **Input validation** - schema validation (Joi/Zod/express-validator)
5. **No hardcoded secrets** - uses env vars/KMS
6. **Tests with ≥80% coverage** - unit + integration
7. **Performance benchmarks** (if performance-critical)
8. **Observability** - structured logs, metrics, correlation IDs
9. **Resilience** - retry, timeout, circuit breaker for external calls
10. **Review Gate** - self-score ≥90 before output

---

## Common Mistakes (What v1.5 Prevents)

❌ **God Object** → Split into smaller functions
❌ **Arrow Code** → Use guard clauses: `if (!user) return res.status(404).end();`
❌ **Magic Constants** → Extract to named constants at top
❌ **N+1 Queries** → Use JOIN or batch fetch
❌ **Blocking I/O** → Use async/await, no sync fs/pg calls
❌ **O(n²)** → Use hash maps, indexes, set operations
❌ **No error handling** → Wrap all public functions in try/catch
❌ **No input validation** → Validate all external inputs
❌ **Hardcoded secrets** → Use `process.env.JWT_SECRET`
❌ **No tests** → Generate test file alongside code

---

## Customization

### Adjusting for Your Project Profile

v1.5 auto-detects project profile from query:

| Keyword | Adjustment |
|---------|------------|
| "small", "prototype", "POC" | Simplify Tier 2 (skip some verification) |
| "large", "enterprise", "scale" | Full rigor (all sections) |
| "payment", "health", "PII" | High risk: add threat modeling |
| "internal tool", "admin" | Low risk: basic security only |
| "AWS", "cloud", "cost" | Cost optimization section |

### Modifying the Prompt Engine

To customize AGENTS.md for your org:

1. **Add domain-specific edge cases**: Edit CONCURRENCY or add new section
2. **Adjust score weights**: Change Self-Score line (e.g., R25+M25+S25+T15+P10)
3. **Add compliance standards**: Extend COMPLIANCE section with SOC2, ISO27001
4. **Change targets**: Modify p50<100ms to p50<50ms for your SLAs

**Remember**: Keep ≤100 lines. Merge, don't add.

---

## Troubleshooting

**Q: AI output missing required section?**
A: Reinforce: "Follow AGENTS.md REVIEW GATE: include all 15 sections, don't skip any."

**Q: Code too complex (>20 lines)?**
A: v1.5 enforces function length. If AI exceeds, ask: "Refactor to functions ≤20 lines as required by TOP 5."

**Q: No tests generated?**
A: v1.5 mandates TEST GENERATION with coverage ≥80%. Remind: "Include runnable tests with mock external dependencies."

**Q: Performance targets not met?**
A: Include PERFORMANCE BENCHMARK with specific metrics. State: "Must achieve p99<200ms."

**Q: Compliance missing?**
A: Explicitly trigger: "This is GDPR/PCI regulated. Include COMPLIANCE section."

---

## Real-World Usage

**Scenario:** Building microservices at fintech startup.

**Approach:**
1. Place `AGENTS.md` at repo root (all services inherit)
2. Each service PR requires AI to follow v1.5
3. CI enforces self-score ≥90 via automated review
4. Sample code checked against anti-patterns (SonarQube)
5. Performance benchmarks run in staging (k6)

**Outcome:**
- All services consistent quality
- Security baked in (no post-hoc audits)
- Onboarding: new devs get AGENTS.md, produce production code immediately
- Code reviews: checklist from PR template, 50% faster

---

## Support

- **Issues**: https://github.com/cotapelu/autoqcoder/issues
- **Changelog**: See CHANGELOG.md
- **Migration**: See MIGRATION_GUIDE.md (from v1.42 or earlier)

---

**Tip**: Save sample_output.md as reference. Copy its structure for consistent outputs.