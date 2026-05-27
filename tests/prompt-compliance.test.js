/**
 * Prompt Compliance Test Suite
 * Tests that AGENTS.md has all mandatory sections and content
 */

const fs = require('fs');
const path = require('path');

// Read AGENTS.md
const agentsPath = path.join(__dirname, '..', 'AGENTS.md');
const agentsContent = fs.readFileSync(agentsPath, 'utf-8');

// Required sections (alphabetical for clarity)
const REQUIRED_SECTIONS = [
  'CORE QUALITY GATE',
  'PRODUCTION STANDARDS',
  'SELF-EVOLUTION & PRODUCTION READINESS',
  'MANDATORY PRINCIPLES',
  'CONCURRENCY',
  'DEBUGGING & ISSUE RESOLUTION',
  'FRONTEND ARCHITECTURE',
  'TEST GENERATION',
  'COMPLIANCE, COST & LEGACY',
  'SELF-EVALUATION QUESTIONS',
  'PROJECT PROFILE',
  'DOMAIN-SPECIFIC EDGE CASES',
  'API DEPRECATION',
  'COVERAGE REFACTORING TRIGGERS',
  'FINAL OPTIMIZATION & META-LEARNING',
  'SYSTEM AUDIT & SECURITY REVIEW'
];

// Required subsections that must be present
const REQUIRED_SUBSECTIONS = {
  'COMPLIANCE, COST & LEGACY': [
    'GDPR',
    'HIPAA',
    'PCI',
    'SOX',
    'COPPA',
    'Cost Optimization',
    'Legacy System Integration'
  ],
  'DOMAIN-SPECIFIC EDGE CASES': [
    'Web/Frontend',
    'Backend API',
    'Mobile',
    'Data/ML',
    'Embedded'
  ],
  'PROJECT PROFILE': [
    'Size',
    'Risk',
    'Deployment',
    'Team'
  ],
  'SYSTEM AUDIT & SECURITY REVIEW': [
    'Business Logic Integrity',
    'End-to-End Flow Audit',
    'Concurrency & Race Condition',
    'Database & Data Integrity',
    'Caching & Consistency',
    'Idempotency',
    'Failure Scenarios',
    'Security Audit',
    'Scalability Analysis',
    'Observability & Monitoring',
    'AUDIT REPORT TEMPLATE',
    'FIX PRIORITY MATRIX',
    'AUDIT CHECKLIST'
  ]
};

// Required penalties that must be defined
const REQUIRED_PENALTIES = [
  'Penalty -25',
  'Penalty -15',
  'Penalty -10',
  'Penalty -30' // Audit
];

describe('AGENTS.md Prompt Compliance', () => {

  test('has all 16 mandatory sections', () => {
    const missing = REQUIRED_SECTIONS.filter(section =>
      !agentsContent.includes(`## ${section}`)
    );

    if (missing.length > 0) {
      console.log('\n❌ Missing sections:');
      missing.forEach(s => console.log(`   - ${s}`));
    }

    expect(missing).toEqual([]);
  });

  test('each section has required subsections', () => {
    const errors = [];

    for (const [section, subsections] of Object.entries(REQUIRED_SUBSECTIONS)) {
      const sectionIndex = agentsContent.indexOf(`## ${section}`);
      if (sectionIndex === -1) continue; // Already caught by previous test

      const nextSectionIndex = agentsContent.indexOf('## ', sectionIndex + 1);
      const sectionContent = agentsContent.substring(
        sectionIndex,
        nextSectionIndex === -1 ? undefined : nextSectionIndex
      );

      const missingSubs = subsections.filter(sub =>
        !sectionContent.toLowerCase().includes(sub.toLowerCase())
      );

      if (missingSubs.length > 0) {
        errors.push({ section, missing: missingSubs });
      }
    }

    if (errors.length > 0) {
      console.log('\n❌ Missing subsections:');
      errors.forEach(e => {
        console.log(`   ${e.section}:`);
        e.missing.forEach(m => console.log(`     - ${m}`));
      });
    }

    expect(errors).toEqual([]);
  });

  test('has all required penalties defined', () => {
    const missing = REQUIRED_PENALTIES.filter(penalty =>
      !agentsContent.includes(penalty)
    );

    if (missing.length > 0) {
      console.log('\n❌ Missing penalties:');
      missing.forEach(p => console.log(`   - ${p}`));
    }

    expect(missing).toEqual([]);
  });

  test('mentions all 10 skills in Skill Integration table', () => {
    const skills = [
      'angular-modular-architect',
      'backend-db-pattern',
      'code-review',
      'dotnet-modular-architect',
      'erp-architect',
      'iam-platform-layer',
      'go-architect',
      'python-architect',
      'react-architect',
      'rust-architect'
    ];

    const missing = skills.filter(skill =>
      !agentsContent.toLowerCase().includes(skill)
    );

    if (missing.length > 0) {
      console.log('\n❌ Missing skills:');
      missing.forEach(s => console.log(`   - ${s}`));
    }

    expect(missing).toEqual([]);
  });

  test('has proper structure (no duplicate section headers)', () => {
    const sectionHeaders = [];
    const lines = agentsContent.split('\n');

    lines.forEach(line => {
      if (line.startsWith('## ')) {
        sectionHeaders.push(line.substring(3).trim());
      }
    });

    // Check for duplicates
    const duplicates = sectionHeaders.filter((header, index) =>
      sectionHeaders.indexOf(header) !== index
    );

    if (duplicates.length > 0) {
      console.log('\n❌ Duplicate sections:', duplicates);
    }

    expect(duplicates).toEqual([]);
  });

  test('self-score ≥ 90 required in Quality Gate', () => {
    expect(agentsContent).toMatch(/Self-score.*≥90/);
  });

  test('mentions 12 anti-patterns', () => {
    const antiPatterns = [
      'God Object',
      'Arrow Code',
      'Magic Constants',
      'Shotgun Surgery',
      'Circular Dep',
      'Deep Inheritance',
      'Feature Envy',
      'N\\+1 Queries',
      'Blocking I/O',
      'O(n²)',
      'Unbounded Cache',
      'Sync Rate Limit'
    ];

    const missing = antiPatterns.filter(ap =>
      !agentsContent.includes(ap)
    );

    if (missing.length > 0) {
      console.log('\n❌ Missing anti-patterns:');
      missing.forEach(ap => console.log(`   - ${ap}`));
    }

    expect(missing).toEqual([]);
  });

  test('functions ≤ 20 lines requirement present', () => {
    expect(agentsContent).toMatch(/Functions\s*≤\s*20\s*lines/);
  });

  test('complexity ≤ 10 requirement present', () => {
    expect(agentsContent).toMatch(/Complexity\s*≤\s*10/);
  });

  test('coverage ≥ 80% requirement present', () => {
    expect(agentsContent).toMatch(/Coverage\s*≥\s*80%/);
  });

  test('audit penalty -30 is defined', () => {
    expect(agentsContent).toMatch(/Penalty\s*-\s*30/);
  });

  test('mentions both flow directions (UI→DB and DB→UI)', () => {
    expect(agentsContent).toMatch(/UI→DB/);
    expect(agentsContent).toMatch(/DB→UI/);
  });

  test('git commit requirement is mandatory', () => {
    expect(agentsContent).toMatch(/git commit/);
  });

  test('code preservation rule (KHÔNG XÓA) is present', () => {
    expect(agentsContent).toMatch(/KHÔNG XÓA/);
  });

  test('mental testing mode is described', () => {
    expect(agentsContent).toMatch(/MENTAL TESTING/);
  });

  test('missing code = write more principle', () => {
    expect(agentsContent).toMatch(/MISSING CODE.*WRITE MORE/i);
  });

  // --- QUANTITATIVE CHECKS ---

  test('has reasonable line count (200-500 lines)', () => {
    const lines = agentsContent.split('\n').length;
    expect(lines).toBeGreaterThanOrEqual(200);
    expect(lines).toBeLessThanOrEqual(600); // Allow some flexibility
  });

  test('has at least 100 checklist items', () => {
    const checklistMatches = agentsContent.match(/\[[ x]\]/g);
    const count = checklistMatches ? checklistMatches.length : 0;
    expect(count).toBeGreaterThanOrEqual(100);
  });

});

console.log('Running Prompt Compliance Tests for AGENTS.md...\n');
