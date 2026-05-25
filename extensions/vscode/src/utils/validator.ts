import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

export async function validateFile(filePath: string, context: vscode.ExtensionContext): Promise<void> {
  const uri = vscode.Uri.file(filePath);
  const fileName = path.basename(filePath);

  // Only validate markdown files
  if (!fileName.endsWith('.md')) {
    vscode.window.showWarningMessage(`AutoQCoder: Skipping non-markdown file: ${fileName}`);
    return;
  }

  const statusItem = vscode.window.withStatusBarItem(vscode.StatusBarItem.Right, 100);
  statusItem.text = '$(sync~spin) AutoQCoder validating...';
  statusItem.show();

  try {
    // Read file content
    const content = fs.readFileSync(filePath, 'utf-8');

    // Run validation checks
    const results: ValidationResult = {
      fileName,
      isValid: true,
      issues: [],
      selfScore: 0
    };

    // Check functions ≤20 lines (for code files if applicable)
    // For markdown, check structure and compliance

    // Check for required sections in AGENTS.md
    if (fileName === 'AGENTS.md') {
      validateAGENTS(content, results);
    } else if (fileName === 'AUTO-CONTINUE.md') {
      validateAUTOCONTINUE(content, results);
    }

    // Calculate self-score
    results.selfScore = calculateSelfScore(results);

    // Show results
    await showValidationResults(results, statusItem);

    // Store in global state for metrics
    context.globalState.update(`validation_${fileName}`, {
      timestamp: Date.now(),
      score: results.selfScore,
      issues: results.issues.length
    });

  } catch (error: any) {
    statusItem.text = '$(x) AutoQCoder Error';
    vscode.window.showErrorMessage(`Validation failed: ${error.message}`);
  } finally {
    setTimeout(() => statusItem.dispose(), 5000);
  }
}

interface ValidationResult {
  fileName: string;
  isValid: boolean;
  issues: ValidationIssue[];
  selfScore: number;
}

interface ValidationIssue {
  line: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

function validateAGENTS(content: string, results: ValidationResult): void {
  const lines = content.split('\n');

  // Check required sections
  const requiredSections = [
    'CORE QUALITY GATE',
    'PRODUCTION STANDARDS',
    'SELF-EVOLUTION & PRODUCTION READINESS',
    'MANDATORY PRINCIPLES',
    'CONCURRENCY',
    'DEBUGGING & ISSUE RESOLUTION',
    'FRONTEND ARCHITECTURE',
    'MENTAL TESTING MODE'
  ];

  requiredSections.forEach(section => {
    if (!content.includes(section)) {
      results.isValid = false;
      results.issues.push({
        line: 0,
        message: `Missing required section: ${section}`,
        severity: 'error'
      });
    }
  });

  // Check for anti-patterns in content (should list 12)
  if (!content.includes('12 anti-patterns') && !content.includes('Anti-Patterns')) {
    results.issues.push({
      line: 0,
      message: 'Should document 12 anti-patterns',
      severity: 'warning'
    });
  }

  // Check line count (should be <250)
  if (lines.length > 250) {
    results.issues.push({
      line: 0,
      message: `File too long: ${lines.length} lines (target <250)`,
      severity: 'warning'
    });
  }

  // Check for mental testing section
  if (!content.includes('MENTAL TESTING MODE') && !content.includes('Mental Testing')) {
    results.issues.push({
      line: 0,
      message: 'Missing Mental Testing Mode section',
      severity: 'error'
    });
  }

  // Check for code preservation rule
  if (!content.includes('KHÔNG XÓA CODE') && !content.includes('Code Preservation')) {
    results.issues.push({
      line: 0,
      message: 'Missing Code Preservation Rule',
      severity: 'error'
    });
  }
}

function validateAUTOCONTINUE(content: string, results: ValidationResult): void {
  const lines = content.split('\n');

  // Check required sections
  const requiredSections = [
    'WORKFLOW',
    'SESSION START',
    'EVOLUTION & SELF-IMPROVEMENT',
    'GIT COMMIT REQUIREMENT',
    'MENTAL TESTING MODE',
    'CODE PRESERVATION RULE',
    'CHANGE COST & RISK ASSESSMENT',
    'MISSING CODE = WRITE MORE',
    'SKILL INTEGRATION'
  ];

  requiredSections.forEach(section => {
    if (!content.includes(section)) {
      results.isValid = false;
      results.issues.push({
        line: 0,
        message: `Missing required section: ${section}`,
        severity: 'error'
      });
    }
  });

  // Check for git commit mandate
  if (!content.includes('git commit') && !content.includes('Git commit')) {
    results.issues.push({
      line: 0,
      message: 'Missing git commit requirement',
      severity: 'error'
    });
  }

  // Check line count (should be <250)
  if (lines.length > 250) {
    results.issues.push({
      line: 0,
      message: `File too long: ${lines.length} lines (target <250)`,
      severity: 'warning'
    });
  }
}

function calculateSelfScore(results: ValidationResult): number {
  let score = 100;

  // Deduct for each error
  const errors = results.issues.filter(i => i.severity === 'error');
  score -= errors.length * 10;

  // Deduct for warnings
  const warnings = results.issues.filter(i => i.severity === 'warning');
  score -= warnings.length * 5;

  return Math.max(0, score);
}

async function showValidationResults(results: ValidationResult, statusItem: vscode.StatusBarItem): Promise<void> {
  statusItem.text = results.isValid
    ? '$(pass-filled) AutoQCoder: All checks passed'
    : '$(warning) AutoQCoder: Issues found';

  if (results.issues.length > 0) {
    const message = results.issues
      .map(i => `${i.severity.toUpperCase()}: ${i.message}`)
      .join('\n');

    const action = await vscode.window.showWarningMessage(
      `AutoQCoder: ${results.issues.length} issue(s) found in ${results.fileName}\n\n${message}\n\nSelf-score: ${results.selfScore}/100`,
      'Show Details',
      'Auto-Fix',
      'Dismiss'
    );

    if (action === 'Show Details') {
      // Show detailed output in output channel
      const channel = vscode.window.createOutputChannel('AutoQCoder');
      channel.show(true);
      channel.appendLine(`Validation Results for ${results.fileName}:`);
      channel.appendLine(`Status: ${results.isValid ? 'PASS' : 'FAIL'}`);
      channel.appendLine(`Self-score: ${results.selfScore}/100`);
      channel.appendLine('\nIssues:');
      results.issues.forEach(i => {
        channel.appendLine(`  [${i.severity.toUpperCase()}] ${i.message}`);
      });
    } else if (action === 'Auto-Fix') {
      // Trigger auto-fix (to be implemented)
      vscode.window.showInformationMessage('Auto-fix feature coming soon...');
    }
  } else {
    vscode.window.showInformationMessage(
      `AutoQCoder: ✅ ${results.fileName} passed all checks (Self-score: ${results.selfScore}/100)`
    );
  }
}

export async function fixIssues(filePath: string, context: vscode.ExtensionContext): Promise<void> {
  const uri = vscode.Uri.file(filePath);
  const fileName = path.basename(filePath);

  // For now, show a message - actual auto-fix logic in Phase 4+
  const action = await vscode.window.showInformationMessage(
    `AutoQCoder: Auto-fix for ${fileName} is planned for Phase 4.`,
    'View Roadmap',
    'Dismiss'
  );

  if (action === 'View Roadmap') {
    // Open EVOLUTION.md or show roadmap
    const evolutionPath = path.join(path.dirname(filePath), 'docs', 'EVOLUTION.md');
    if (fs.existsSync(evolutionPath)) {
      const doc = await vscode.workspace.openTextDocument(evolutionPath);
      await vscode.window.showTextDocument(doc);
    }
  }
}

export async function runMentalTests(filePath: string, context: vscode.ExtensionContext): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage('No active editor found');
    return;
  }

  const content = editor.document.getText();
  const languageId = editor.document.languageId;

  // Basic mental test prompts based on language
  const prompts: Record<string, string[]> = {
    javascript: [
      'Are all async operations properly awaited?',
      'Is error handling 100%?',
      'Are there any unhandled promise rejections?',
      'Is input validation present?',
      'Are there any console.log statements left?'
    ],
    typescript: [
      'Are all functions ≤20 lines?',
      'Is complexity ≤10?',
      'Are there any "any" types that should be explicit?',
      'Is error handling 100%?',
      'Are all external inputs validated?'
    ],
    markdown: [
      'Are all required sections present?',
      'Is structure clear and organized?',
      'Are code blocks properly formatted?',
      'Are links and references valid?'
    ]
  };

  const languagePrompts = prompts[languageId] || prompts.markdown;

  const quickPick = await vscode.window.showQuickPick(
    languagePrompts.map(p => ({ label: p, description: 'Mental test this aspect' })),
    {
      placeHolder: `Select mental test for ${languageId}...`
    }
  );

  if (quickPick) {
    vscode.window.showInformationMessage(`Mental test: "${quickPick.label}" - Answer in your mind based on code.`);
  }
}

export async function updateEvolutionFiles(context: vscode.ExtensionContext): Promise<void> {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    vscode.window.showErrorMessage('No workspace folder found');
    return;
  }

  const rootPath = workspaceFolders[0].uri.fsPath;
  const metricsPath = path.join(rootPath, 'docs', 'AGENT_METRICS.md');
  const profilePath = path.join(rootPath, 'docs', 'AGENT_PROFILE.md');
  const evolutionPath = path.join(rootPath, 'docs', 'EVOLUTION.md');

  // Check if files exist
  if (!fs.existsSync(metricsPath) || !fs.existsSync(profilePath) || !fs.existsSync(evolutionPath)) {
    vscode.window.showWarningMessage('Evolution files not found. Please ensure they exist in docs/');
    return;
  }

  // For now, just show a message - actual auto-update planned for Phase 4
  vscode.window.showInformationMessage(
    'Evolution files check complete. Auto-update from git stats will be implemented in Phase 4.'
  );
}

export async function getMetrics(): Promise<{ [key: string]: any }> {
  // Read from AGENT_METRICS.md (parse it)
  // For now return defaults
  return {
    selfScore: 95,
    functions20Lines: 100,
    complexity10: 100,
    errorHandling: 100,
    mentalCoverage: 297,
    deletions: 0,
    rounds: 7
  };
}
