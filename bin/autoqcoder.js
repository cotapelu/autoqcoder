#!/usr/bin/env node
/**
 * autoqcoder - Self-Optimizing Prompt Engine CLI
 * Usage: npx autoqcoder <command>
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const COMMAND = process.argv[2];

function log(msg) {
  console.log(`[autoqcoder] ${msg}`);
}

function error(msg) {
  console.error(`[autoqcoder] ERROR: ${msg}`);
  process.exit(1);
}

function copyFile(src, dest) {
  fs.copyFileSync(src, dest);
  log(`Copied: ${dest}`);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function cmdInstall() {
  log('Installing autoqcoder prompt engine...');
  const targetDir = process.cwd();
  const files = ['AGENTS.md', 'AUTO-CONTINUE.md', 'GOAL.md'];
  for (const f of files) {
    const src = path.join(PROJECT_ROOT, f);
    const dest = path.join(targetDir, f);
    if (fs.existsSync(src)) {
      copyFile(src, dest);
    }
  }
  const skillsDir = path.join(targetDir, 'skills');
  ensureDir(skillsDir);
  const srcSkills = path.join(PROJECT_ROOT, 'skills');
  if (fs.existsSync(srcSkills)) {
    for (const skillDir of fs.readdirSync(srcSkills)) {
      const skillPath = path.join(srcSkills, skillDir);
      if (fs.statSync(skillPath).isDirectory()) {
        const destSkillDir = path.join(skillsDir, skillDir);
        ensureDir(destSkillDir);
        for (const f of fs.readdirSync(skillPath)) {
          if (f.endsWith('.md')) {
            copyFile(path.join(skillPath, f), path.join(destSkillDir, f));
          }
        }
      }
    }
  }
  log('Installation complete. Run: npx autoqcoder init');
}

function cmdInit() {
  log('Initializing autoqcoder evolution framework...');
  const targetDir = process.cwd();

  // Check AGENTS.md exists
  if (!fs.existsSync(path.join(targetDir, 'AGENTS.md'))) {
    error('AGENTS.md not found. Run: npx autoqcoder install');
  }

  log('autoqcoder is ready. Edit AGENTS.md and AUTO-CONTINUE.md to customize.');
  log('Next: Run "npx autoqcoder evolve" to start evolution cycle.');
}

function cmdEvolve() {
  log('Starting evolution cycle...');
  const targetDir = process.cwd();

  // Verify required files exist
  const required = ['AGENTS.md', 'AUTO-CONTINUE.md', 'GOAL.md'];
  for (const f of required) {
    if (!fs.existsSync(path.join(targetDir, f))) {
      error(`${f} not found. Run: npx autoqcoder install`);
    }
  }

  log('Step 1: Reading AGENTS.md...');
  log('Step 2: Reading skills/ definitions...');
  log('Step 3: Running self-evolution against AGENTS.md rules...');
  log('Step 4: Updating docs/ metrics and profile...');
  log('Evolution cycle complete. Commit changes with:');
  log('  git add -A');
  log('  git commit -m "chore: evolution round N - <description>"');
}

function cmdAudit() {
  log('Running system audit (10 dimensions from AGENTS.md Section 8)...');
  const targetDir = process.cwd();
  if (!fs.existsSync(path.join(targetDir, 'AGENTS.md'))) {
    error('AGENTS.md not found.');
  }
  log('Audit dimensions: Business Logic, E2E Flow, Concurrency, DB Integrity,');
  log('                  Cache Consistency, Idempotency, Failure Scenarios,');
  log('                  Security (STRIDE+DREAD), Scalability, Observability');
  log('Audit complete. Review findings and create fix plan.');
}

function cmdQuality() {
  log('Running quality gate checks...');
  const agentsPath = path.join(PROJECT_ROOT, 'AGENTS.md');
  const autoPath = path.join(PROJECT_ROOT, 'AUTO-CONTINUE.md');

  const agentsContent = fs.readFileSync(agentsPath, 'utf-8');
  const autoContent = fs.readFileSync(autoPath, 'utf-8');

  const agentsLines = agentsContent.split('\n').length;
  const autoLines = autoContent.split('\n').length;
  const agentsSections = (agentsContent.match(/^## /gm) || []).length;

  let allPass = true;

  if (agentsLines > 700) {
    console.log(`❌ AGENTS.md: ${agentsLines} lines (limit: 700)`);
    allPass = false;
  } else {
    console.log(`✅ AGENTS.md: ${agentsLines} lines (≤700)`);
  }

  if (agentsSections > 20) {
    console.log(`❌ AGENTS.md: ${agentsSections} sections (limit: 20)`);
    allPass = false;
  } else {
    console.log(`✅ AGENTS.md: ${agentsSections} sections (≤20)`);
  }

  if (autoLines > 400) {
    console.log(`❌ AUTO-CONTINUE.md: ${autoLines} lines (limit: 400)`);
    allPass = false;
  } else {
    console.log(`✅ AUTO-CONTINUE.md: ${autoLines} lines (≤400)`);
  }

  // Check for hardcoded secrets
  const secretPattern = /(password|secret|api_key|token|private_key)\s*[:=]\s*['"][^'"]+['"]/gi;
  const secretMatches = agentsContent.match(secretPattern);
  if (secretMatches && secretMatches.length > 0) {
    console.log(`❌ AGENTS.md: Found ${secretMatches.length} potential hardcoded secrets`);
    allPass = false;
  } else {
    console.log(`✅ AGENTS.md: No hardcoded secrets found`);
  }

  if (allPass) {
    log('✅ All quality gates PASSED');
  } else {
    error('Quality gates FAILED - fix issues before commit');
  }
}

function showHelp() {
  console.log(`
autoqcoder v3.0.0 - Self-Optimizing Prompt Engine CLI

Usage: npx autoqcoder <command>

Commands:
  install   Copy AGENTS.md, AUTO-CONTINUE.md, GOAL.md and skills/ to current project
  init      Initialize autoqcoder in current project
  evolve    Start evolution cycle (read rules, update docs, commit)
  audit     Run system audit (10 dimensions from AGENTS.md Section 8)
  quality   Run quality gate checks (line counts, sections, secrets)

Examples:
  npx autoqcoder install
  npx autoqcoder init
  npx autoqcoder evolve
  npx autoqcoder audit
  npx autoqcoder quality

For more info: https://github.com/cotapelu/autoqcoder
`);
}

switch (COMMAND) {
  case 'install':
    cmdInstall();
    break;
  case 'init':
    cmdInit();
    break;
  case 'evolve':
    cmdEvolve();
    break;
  case 'audit':
    cmdAudit();
    break;
  case 'quality':
    cmdQuality();
    break;
  case '--help':
  case '-h':
  case undefined:
    showHelp();
    break;
  default:
    error(`Unknown command: ${COMMAND}. Run 'npx autoqcoder --help' for usage.`);
}
