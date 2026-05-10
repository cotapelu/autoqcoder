# autoqcoder
Self-optimizing prompt engine for AI coding agents. **AGENTS.md v1.5** - enterprise-ready, 79 lines.

## Usage

### Option 1: Manual Download
```bash
# Copy files directly to your project root
curl -O https://raw.githubusercontent.com/cotapelu/autoqcoder/main/AGENTS.md
curl -O https://raw.githubusercontent.com/cotapelu/autoqcoder/main/AUTO-CONTINUE.md
```

### Option 2: One-line Setup (Recommended)
```bash
# From any project directory - auto installs AGENTS.md + AUTO-CONTINUE.md
npx github:cotapelu/autoqcoder
```

## Files Included
- `AGENTS.md` - **v1.5**: Production-grade prompt engine (79 lines) with performance benchmarks, observability, resilience, and review gate
- `AUTO-CONTINUE.md` - Continuous evolution workflow (34 lines)

## Features
- ✅ **93+ self-score** with OUTPUT GATE enforcement
- ✅ **79 lines** - Simplicity-first (vs v2.0's 709 lines)
- ✅ **12 anti-patterns** with fixes (God Object, Arrow Code, etc.)
- ✅ **Enterprise production features**: Performance benchmarks, Structured logs, Metrics, Resilience patterns (retry/circuit-breaker), Error quality, Concurrency analysis, Compliance auto-trigger, Cost optimization
- ✅ **100% security** - threat modeling, STRIDE+DREAD, OWASP checklist
- ✅ **3-phase review gate** - self-score ≥90 required before output

## Stats

| File | v1.42 | v1.5 | v2.0 (abandoned) |
|------|------|------|----------------|
| AGENTS.md | 60 lines | **79 lines** | 709 lines |
| AUTO-CONTINUE.md | 34 lines | 34 lines | - |

**v1.5 adds enterprise features while staying 11x smaller than v2.0**

## Quick Example

```bash
# Install
npx github:cotapelu/autoqcoder

# Use
echo "Read AGENTS.md. Build a secure login API with JWT." | your-ai-agent
```

The AI will generate production-ready code with:
- Functions ≤20 lines
- 100% error handling
- Input validation
- Performance benchmarks
- Structured logs & metrics
- Resilience (retry, circuit breaker)
- Full test coverage ≥80%
- Self-score ≥90

## Documentation
- [USAGE_EXAMPLES.md](USAGE_EXAMPLES.md) - Practical examples and patterns
- [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) - Upgrade from v1.42 or v2.0
- [CHANGELOG.md](CHANGELOG.md) - Version history

## License
MIT