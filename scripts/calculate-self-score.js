#!/usr/bin/env node

/**
 * Calculate Self-Score from AGENTS.md (Simplified)
 * Checks mandatory sections + audit framework presence + checkbox thoroughness
 */

const fs = require('fs');
const path = require('path');

const AGENTS_PATH = path.join(__dirname, '..', 'AGENTS.md');
const content = fs.readFileSync(AGENTS_PATH, 'utf-8');

const MAX_SCORE = 100;
const SECTION_WEIGHT = 5; // 16 sections × 5 = 80
const CHECKBOX_BONUS_MAX = 20; // Up to 20 points based on total checkboxes

const MANDATORY_SECTIONS = [
  '1. QUALITY FRAMEWORK',
  '2. PRODUCTION STANDARDS',
  '3. EVOLUTION FRAMEWORK',
  '4. MANDATORY PRINCIPLES',
  '5. DEBUGGING FRAMEWORK',
  '6. ANALYSIS & EXECUTION MODES',
  '7. TESTING & QUALITY ASSURANCE',
  '8. SYSTEM AUDIT FRAMEWORK',
  '9. COMPLIANCE, COST & LEGACY',
  '10. SELF-IMPROVEMENT & MAINTENANCE',
  '11. FRONTEND ARCHITECTURE GUIDELINES',
  '12. BACKEND ARCHITECTURE PATTERNS',
  '13. SKILL INTEGRATION',
  '14. CONCURRENCY ANALYSIS TEMPLATE',
  '15. VERIFICATION & AUTOMATION',
  '16. COLLABORATIVE REVIEW & RELEASE',
  '17. BEHAVIORAL GUIDELINES',
  'TEMPLATE'
];

// Required penalties
const REQUIRED_PENALTIES = ['Penalty -25', 'Penalty -15', 'Penalty -10', 'Penalty -30'];

function analyze() {
  const foundSections = MANDATORY_SECTIONS.filter(s => content.includes(`## ${s}`));
  const missingSections = MANDATORY_SECTIONS.filter(s => !content.includes(`## ${s}`));

  const totalCheckboxes = (content.match(/\[[ x]\]/g) || []).length;
  const hasAllPenalties = REQUIRED_PENALTIES.every(p => content.includes(p));
  const hasAudit = content.includes('SYSTEM AUDIT FRAMEWORK');
  const hasAuditWorkflow = content.includes('Audit') && content.includes('Verify');

  return {
    sections: { found: foundSections.length, total: MANDATORY_SECTIONS.length, missing: missingSections },
    checkboxes: totalCheckboxes,
    penalties: hasAllPenalties,
    audit: hasAudit && hasAuditWorkflow
  };
}

function calculateScore(analysis) {
  let score = 0;

  // Sections: 80 points
  score += analysis.sections.found * SECTION_WEIGHT;

  // Missing sections penalty: -30 each
  if (analysis.sections.missing.length > 0) {
    score -= analysis.sections.missing.length * 30;
  }

  // Checkbox bonus: up to 20 points (aim for 100+ checkboxes = 20 pts)
  const checkboxBonus = Math.min(analysis.checkboxes / 5, 20); // 1 point per 5 checkboxes, max 20
  score += checkboxBonus;

  // Audit framework bonus: +5
  if (analysis.audit) {
    score += 5;
  }

  // Penalties all present: +5
  if (analysis.penalties) {
    score += 5;
  }

  return Math.max(0, Math.min(100, score));
}

// Main
console.log('📊 Calculating Self-Score from AGENTS.md...\n');
console.log('='.repeat(60));

const analysis = analyze();
const score = calculateScore(analysis);
const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'F';

console.log('\n📈 ANALYSIS:\n');
console.log(`  Sections:        ${analysis.sections.found}/${analysis.sections.total} mandatory sections`);
console.log(`  Checkboxes:      ${analysis.checkboxes} total checklist items`);
console.log(`  All penalties:   ${analysis.penalties ? '✅' : '❌'}`);
console.log(`  Audit framework: ${analysis.audit ? '✅' : '❌'}`);

console.log(`\n${'='.repeat(60)}`);
console.log(`\n🎯 FINAL SCORE: ${score}/100 (Grade: ${grade})\n`);

if (analysis.sections.missing.length > 0) {
  console.log('❌ Missing mandatory sections:');
  analysis.sections.missing.forEach(s => console.log(`   - ${s}`));
}

if (!analysis.penalties) {
  console.log('\n❌ Missing some penalty definitions (-25, -15, -10, -30)');
}

if (!analysis.audit) {
  console.log('\n❌ Missing SYSTEM AUDIT & SECURITY REVIEW section');
}

console.log('\n' + '='.repeat(60));
console.log('\n📝 NOTES:');
console.log('  - Base: 16 sections × 5 = 80 pts');
console.log('  - Checkboxes: 1 pt per 5 items (max 20)');
console.log('  - All penalties: +5');
console.log('  - Audit framework: +5');
console.log('  - Missing section: -30 each');
console.log('\n');

if (score >= 90) {
  console.log('✅ SELF-SCORE ≥90: PASS (Quality Gate)');
  process.exit(0);
} else {
  console.log('❌ SELF-SCORE <90: FAIL');
  console.log('   Fix missing items above to reach 90+ threshold.\n');
  process.exit(1);
}
