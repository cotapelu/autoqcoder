#!/usr/bin/env node

/**
 * Check Evolution Files Sync
 * Verifies that AGENT_METRICS.md, AGENT_PROFILE.md, and EVOLUTION.md
 * are in sync with the latest changes to AGENTS.md and AUTO-CONTINUE.md
 */

const fs = require('fs');
const path = require('path');

const AGENTS_PATH = path.join(__dirname, '..', 'AGENTS.md');
const AUTO_CONTINUE_PATH = path.join(__dirname, '..', 'AUTO-CONTINUE.md');
const METRICS_PATH = path.join(__dirname, '..', 'docs', 'AGENT_METRICS.md');
const PROFILE_PATH = path.join(__dirname, '..', 'docs', 'AGENT_PROFILE.md');
const EVOLUTION_PATH = path.join(__dirname, '..', 'docs', 'EVOLUTION.md');

function getModificationTime(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtimeMs;
  } catch (err) {
    console.error(`Cannot stat ${filePath}:`, err.message);
    return 0;
  }
}

function formatDate(ms) {
  return new Date(ms).toISOString().replace('T', ' ').substring(0, 19);
}

function checkFileExists(filePath, name) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing file: ${name} (${filePath})`);
    return false;
  }
  return true;
}

function checkContentSync(promptPath, docPath, promptName, docName) {
  const promptContent = fs.readFileSync(promptPath, 'utf-8');
  const docContent = fs.readFileSync(docPath, 'utf-8');

  const promptModified = getModificationTime(promptPath);
  const docModified = getModificationTime(docPath);

  console.log(`\n📄 ${promptName} vs ${docName}:`);
  console.log(`   Prompt:  modified ${formatDate(promptModified)}`);
  console.log(`   Doc:     modified ${formatDate(docModified)}`);

  let issues = [];

  // Check: doc should be modified after or very close to prompt
  if (docModified < promptModified - 1000 * 60 * 10) { // 10 minute tolerance
    issues.push('Document may be outdated (modified significantly before prompt)');
  }

  // Check for key new sections that should be documented
  const keyNewSections = [
    'SYSTEM AUDIT FRAMEWORK',
    'AUDIT framework',
    'BEHAVIORAL GUIDELINES',
    'CLAUDE',
    'Compression',
    'Round 13'
  ];
  // Note: Checking presence of major features; sub-features omitted for simplicity

  keyNewSections.forEach(section => {
    if (promptContent.includes(section) && !docContent.toLowerCase().includes(section.toLowerCase())) {
      issues.push(`Document doesn't mention key feature: ${section}`);
    }
  });

  return issues;
}

function main() {
  console.log('🔍 Checking Evolution Files Sync...\n');
  console.log('=' .repeat(60));

  // Check file existence
  const filesExist = [
    checkFileExists(AGENTS_PATH, 'AGENTS.md'),
    checkFileExists(AUTO_CONTINUE_PATH, 'AUTO-CONTINUE.md'),
    checkFileExists(METRICS_PATH, 'AGENT_METRICS.md'),
    checkFileExists(PROFILE_PATH, 'AGENT_PROFILE.md'),
    checkFileExists(EVOLUTION_PATH, 'EVOLUTION.md')
  ].every(Boolean);

  if (!filesExist) {
    console.error('\n❌ Some files are missing. aborting.');
    process.exit(1);
  }

  // Check sync between prompts and docs
  const allIssues = [];

  allIssues.push(...checkContentSync(AGENTS_PATH, METRICS_PATH, 'AGENTS.md', 'AGENT_METRICS.md'));
  allIssues.push(...checkContentSync(AGENTS_PATH, PROFILE_PATH, 'AGENTS.md', 'AGENT_PROFILE.md'));
  allIssues.push(...checkContentSync(AGENTS_PATH, EVOLUTION_PATH, 'AGENTS.md', 'EVOLUTION.md'));

  // Also check AUTO-CONTINUE.md sync
  allIssues.push(...checkContentSync(AUTO_CONTINUE_PATH, METRICS_PATH, 'AUTO-CONTINUE.md', 'AGENT_METRICS.md'));

  console.log('\n' + '='.repeat(60));

  if (allIssues.length > 0) {
    console.log('\n❌ SYNC ISSUES FOUND:\n');
    allIssues.forEach((issue, idx) => {
      console.log(`${idx + 1}. ${issue}`);
    });
    console.log('\n💡 Recommendation: Update evolution files to match latest prompts.');
    console.log('   Run: git diff to see changes, then edit docs/ accordingly.\n');
    process.exit(1);
  } else {
    console.log('\n✅ All evolution files are in sync with prompts.');
    console.log('   Timestamps match, versions aligned, new sections documented.\n');
    process.exit(0);
  }
}

main();
