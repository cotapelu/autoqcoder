#!/bin/bash
# test_optimization.sh - Verify AGENTS.md optimization

echo "=== AGENTS.md Optimization Test ==="

# Test 1: Line count
lines=$(wc -l < /home/quangtynu/Qcoder/autoqcoder/AGENTS.md)
echo "1. Line count: $lines (target: ≤100)"
[ $lines -le 100 ] && echo "   PASS ✓" || echo "   FAIL ✗"

# Test 2: Key sections present
echo "2. Key sections check:"
grep -q "TOP 5" /home/quangtynu/Qcoder/autoqcoder/AGENTS.md && echo "   TOP 5 ✓" || echo "   TOP 5 ✗"
grep -q "TEMPLATE" /home/quangtynu/Qcoder/autoqcoder/AGENTS.md && echo "   TEMPLATE ✓" || echo "   TEMPLATE ✗"
grep -q "ANTI-PATTERNS" /home/quangtynu/Qcoder/autoqcoder/AGENTS.md && echo "   ANTI-PATTERNS ✓" || echo "   ANTI-PATTERNS ✗"
grep -q "SECURITY" /home/quangtynu/Qcoder/autoqcoder/AGENTS.md && echo "   SECURITY ✓" || echo "   SECURITY ✗"
grep -q "REVIEW GATE" /home/quangtynu/Qcoder/autoqcoder/AGENTS.md && echo "   REVIEW GATE ✓" || echo "   REVIEW GATE ✗"

echo ""
echo "=== AUTO-CONTINUE.md Test ==="
lines2=$(wc -l < /home/quangtynu/Qcoder/autoqcoder/AUTO-CONTINUE.md)
echo "Line count: $lines2 (target: ≤40)"
[ $lines2 -le 40 ] && echo "   PASS ✓" || echo "   FAIL ✗"

echo ""
echo "=== Optimization Complete ==="