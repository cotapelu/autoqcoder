const fs = require('fs');
const path = require('path');
const { expect } = require('chai');

describe('AGENTS.md Validation', () => {
  const agentsPath = path.join(__dirname, '..', 'AGENTS.md');
  let content;
  let lines;

  before(() => {
    content = fs.readFileSync(agentsPath, 'utf8');
    lines = content.split('\n');
  });

  it('should have line count ≤100', () => {
    expect(lines.length).to.be.at.most(100);
    console.log(`Line count: ${lines.length}`);
  });

  it('should contain required sections', () => {
    const required = [
      'TOP 5',
      'TEMPLATE',
      'ANTI-PATTERNS',
      'SECURITY',
      'REVIEW GATE'
    ];

    required.forEach(section => {
      expect(content).to.include(section);
    });
  });

  it('should document self-score target ≥90', () => {
    expect(content).to.match(/Self-score.*≥90/);
  });

  it('should have no empty lines at start or end', () => {
    expect(lines[0].trim()).to.not.be.empty;
    expect(lines[lines.length - 1].trim()).to.not.be.empty;
  });

  it('should include 12 anti-patterns', () => {
    const antiPatterns = [
      'God Object',
      'Arrow Code',
      'Magic Constants',
      'Shotgun Surgery',
      'Circular Dep',
      'Deep Inheritance',
      'Feature Envy',
      'N+1 Queries',
      'Blocking I/O',
      'O(n²)',
      'Unbounded Cache',
      'Sync Rate Limit'
    ];

    antiPatterns.forEach(pattern => {
      expect(content).to.include(pattern);
    });
  });

  it('should include performance targets', () => {
    expect(content).to.include('p50<100ms');
    expect(content).to.include('p99<200ms');
    expect(content).to.include('1000+ RPS');
  });

  it('should include observability components', () => {
    expect(content).to.include('Structured JSON logs');
    expect(content).to.include('Correlation IDs');
    expect(content).to.include('/metrics');
    expect(content).to.include('SLOs');
  });

  it('should include resilience patterns', () => {
    expect(content).to.include('Retry');
    expect(content).to.include('Timeout');
    expect(content).to.include('Circuit breaker');
    expect(content).to.include('Bulkhead');
    expect(content).to.include('Fallback');
    expect(content).to.include('Health');
  });

  it('should include error message format', () => {
    expect(content).to.include('[ERROR] Component Action');
    expect(content).to.include('ValidationError');
    expect(content).to.include('i18n-ready');
  });

  it('should include compliance & cost triggers', () => {
    expect(content).to.include('COMPLIANCE');
    expect(content).to.include('GDPR');
    expect(content).to.include('COST');
    expect(content).to.include('Right-size');
  });

  it('should have review gate with 3 phases', () => {
    expect(content).to.include('PHASE 1: METRICS');
    expect(content).to.include('PHASE 2: ANTI-PATTERNS');
    expect(content).to.include('PHASE 3: DEVIL\'S ADVOCATE');
    expect(content).to.include('OUTPUT GATE');
  });

  it('should mention test coverage requirement', () => {
    expect(content).to.include('Coverage');
    expect(content).to.include('≥80%');
  });

  it('should not contain prohibited patterns', () => {
    // No eval without validation
    expect(content).to.not.include('eval(');

    // No hardcoded credentials (simple check)
    expect(content).to.not.match(/password\s*=\s*['"]/i);
    expect(content).to.not.match(/secret\s*=\s*['"]/i);
    expect(content).to.not.match(/api[_-]?key\s*=\s*['"]/i);
  });

  it('should have version footer', () => {
    expect(content).to.include('v1.5');
  });
});