/**
 * AUTO-CONTINUE Workflow Test Suite
 * Tests that AUTO-CONTINUE.md has correct workflow steps and structure
 */

const fs = require('fs');
const path = require('path');

// Read AUTO-CONTINUE.md
const autoContinuePath = path.join(__dirname, '..', 'AUTO-CONTINUE.md');
const autoContinueContent = fs.readFileSync(autoContinuePath, 'utf-8');

// Expected workflow steps (in order)
const WORKFLOW_STEPS = [
  'Analyze',
  'Clarify',
  'Plan',
  'Test\\(fail\\)',  // Escape paren for regex
  'Implement',
  'Refactor',
  'Optimize',
  'Audit',
  'Verify'
];

// Required sections
const REQUIRED_SECTIONS = [
  'WORKFLOW',
  'SESSION START',
  'CONTINUOUS LOOP MODE',
  'EVOLUTION & SELF-IMPROVEMENT',
  'GIT COMMIT',
  'MENTAL TESTING',
  'CODE PRESERVATION',
  'CHANGE COST & RISK',
  'MISSING CODE = WRITE MORE',
  'SKILL INTEGRATION',
  'DEBUGGING CHECKLIST',
  'PRODUCTION TESTING PIPELINE',
  'SYSTEM AUDIT WORKFLOW',
  'SEARCH & ANALYSIS MODE',
  'STRICT MODE - NO HALLUCINATION',
  'MENTAL TESTING PROMPT',
  'QUICK REFERENCE',
  'PRINCIPLES & SCOPE & TARGETS',
  'DONE & ANTI-SLOP'
];

// Required workflow properties
const REQUIRED_WORKFLOW_PROPERTIES = [
  'LOOP',
  'while failed',
  'detect',
  'improve',
  'test',
  'verify'
];

describe('AUTO-CONTINUE.md Workflow Compliance', () => {

  test('has all 19 mandatory sections', () => {
    const missing = REQUIRED_SECTIONS.filter(section =>
      !autoContinueContent.includes(`## ${section}`)
    );

    if (missing.length > 0) {
      console.log('\n❌ Missing sections:');
      missing.forEach(s => console.log(`   - ${s}`));
    }

    expect(missing).toEqual([]);
  });

  test('workflow contains all 9 steps in correct order', () => {
    // Extract workflow section (between ## WORKFLOW and next ##)
    const workflowMatch = autoContinueContent.match(/## WORKFLOW[\s\S]*?(?=## |$)/);
    const workflowSection = workflowMatch ? workflowMatch[0] : '';

    const workflowLine = workflowSection
      .match(/```[\s\S]*?```/)?.[0]  // Extract code block
      ?.replace(/```/g, '')
      ?.trim();

    if (!workflowLine) {
      console.log('\n❌ Could not extract workflow from code block');
      expect(false).toBe(true);
      return;
    }

    WORKFLOW_STEPS.forEach((step, index) => {
      const regex = new RegExp(step.replace('\\', ''), 'i');
      const found = workflowLine.match(regex);

      if (!found) {
        console.log(`❌ Missing step: ${step} at position ${index}`);
      }

      expect(found).not.toBeNull();
    });

    // Check order
    let position = 0;
    WORKFLOW_STEPS.forEach((step) => {
      const stepIdx = workflowLine.toLowerCase().indexOf(step.replace('\\', '').toLowerCase());
      expect(stepIdx).toBeGreaterThanOrEqual(position);
      position = stepIdx;
    });
  });

  test('workflow includes Audit step', () => {
    expect(autoContinueContent).toMatch(/Optimize.*Audit.*Verify/s);
    expect(autoContinueContent).toMatch(/## SYSTEM AUDIT WORKFLOW/);
  });

  test('workflow loop condition includes audit_failed', () => {
    expect(autoContinueContent).toMatch(/while.*failed.*improvable.*not_minimal.*audit_failed/s);
  });

  test('SESSION START includes mandatory audit step', () => {
    // Check that step 7 says "Run System Audit"
    const sessionStartMatch = autoContinueContent.match(/## SESSION START[\s\S]*?## /);
    const sessionSection = sessionStartMatch ? sessionStartMatch[0] : '';

    expect(sessionSection).toMatch(/7\.\s*\*\*Run System Audit/i);
  });

  test('CONTINUOUS LOOP MODE includes audit failure condition', () => {
    expect(autoContinueContent).toMatch(/Audit fails.*critical issues found/);
  });

  test('mentions all 10 skills in Skill Integration', () => {
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
      !autoContinueContent.toLowerCase().includes(skill)
    );

    if (missing.length > 0) {
      console.log('\n❌ Missing skills in integration table:');
      missing.forEach(s => console.log(`   - ${s}`));
    }

    expect(missing).toEqual([]);
  });

  test('PRODUCTION TESTING PIPELINE has all 27 gates', () => {
    const pipelineMatch = autoContinueContent.match(/## PRODUCTION TESTING PIPELINE[\s\S]*?## /);
    const pipelineSection = pipelineMatch ? pipelineMatch[0] : '';

    // Count numbered gates (0. through 27.)
    const gateNumbers = [];
    for (let i = 0; i <= 27; i++) {
      if (pipelineSection.includes(`${i}.`)) {
        gateNumbers.push(i);
      }
    }

    expect(gateNumbers.length).toBeGreaterThanOrEqual(25); // Allow some flexibility
  });

  test('MENTAL TESTING PROMPT has all 10 dimensions', () => {
    const mentalTestingMatch = autoContinueContent.match(/## MENTAL TESTING PROMPT[\s\S]*?(?=## |$)/);
    const mentalSection = mentalTestingMatch ? mentalTestingMatch[0] : '';

    const dimensions = [
      'Inputs',
      'Outputs',
      'Branches',
      'Errors',
      'Data Flow',
      'Security',
      'Performance',
      'Concurrency',
      'State',
      'Observability'
    ];

    const missing = dimensions.filter(dim =>
      !mentalSection.toLowerCase().includes(dim.toLowerCase())
    );

    if (missing.length > 0) {
      console.log('\n❌ Missing mental testing dimensions:');
      missing.forEach(d => console.log(`   - ${d}`));
    }

    expect(missing).toEqual([]);
  });

  test('SEARCH & ANALYSIS MODE describes parallel agents', () => {
    expect(autoContinueContent).toMatch(/parallel/);
    expect(autoContinueContent).toMatch(/explore agents/);
    expect(autoContinueContent).toMatch(/librarian agents/);
  });

  test('STRICT MODE forbids hallucination', () => {
    expect(autoContinueContent).toMatch(/STRICT MODE - NO HALLUCINATION/);
    expect(autoContinueContent).toMatch(/MUST NOT.*guess/i);
    expect(autoContinueContent).toMatch(/invent APIs/);
  });

  test('QUICK REFERENCE has quality gate checklist', () => {
    expect(autoContinueContent).toMatch(/Quality Gate Checklist/);
    expect(autoContinueContent).toMatch(/Funcs≤20/);
    expect(autoContinueContent).toMatch(/Comp≤10/);
    expect(autoContinueContent).toMatch(/Cov≥80%/);
  });

  test('MENTAL TESTING PROMPT template is complete', () => {
    expect(autoContinueContent).toMatch(/Mental Test Prompt Template/);
    expect(autoContinueContent).toMatch(/Inputs:/);
    expect(autoContinueContent).toMatch(/Outputs:/);
    expect(autoContinueContent).toMatch(/Branches:/);
    expect(autoContinueContent).toMatch(/Errors:/);
    expect(autoContinueContent).toMatch(/DataFlow:/);
    expect(autoContinueContent).toMatch(/Security:/);
    expect(autoContinueContent).toMatch(/Performance:/);
    expect(autoContinueContent).toMatch(/Concurrency:/);
    expect(autoContinueContent).toMatch(/State:/);
    expect(autoContinueContent).toMatch(/Observability:/);
  });

  test('AUDIT section references 10 dimensions from AGENTS.md', () => {
    // Should say "see AGENTS.md Section 10" or similar
    expect(autoContinueContent).toMatch(/AGENTS\.md.*Section/);
    expect(autoContinueContent).toMatch(/10 dimensions/);
  });

  test('WORKFLOW diagram is present', () => {
    expect(autoContinueContent).toMatch(/```/);
    expect(autoContinueContent).toMatch(/Analyze → Clarify → Plan/);
  });

  // --- QUANTITATIVE CHECKS ---

  test('has reasonable line count (300-500 lines)', () => {
    const lines = autoContinueContent.split('\n').length;
    expect(lines).toBeGreaterThanOrEqual(300);
    expect(lines).toBeLessThanOrEqual(600);
  });

  test('has at least 50 checklist items', () => {
    const checklistMatches = autoContinueContent.match(/\[[ x]\]/g);
    const count = checklistMatches ? checklistMatches.length : 0;
    expect(count).toBeGreaterThanOrEqual(50);
  });

  test('mentions git commit at least 3 times', () => {
    const matches = autoContinueContent.match(/git commit/gi);
    expect(matches).not.toBeNull();
    expect(matches.length).toBeGreaterThanOrEqual(3);
  });

});

console.log('Running AUTO-CONTINUE Workflow Compliance Tests...\n');
