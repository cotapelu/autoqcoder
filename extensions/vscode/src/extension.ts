import * as vscode from 'vscode';
import { validateFile, fixIssues, runMentalTests, updateEvolutionFiles } from './utils/validator';
import { getMetrics } from './utils/metrics';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  console.log('AutoQCoder extension is now active!');

  // Validate current file command
  const validateCommand = vscode.commands.registerCommand('autoqcoder.validate', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor found');
      return;
    }

    const filePath = editor.document.fileName;
    await validateFile(filePath, context);
  });

  // Auto-fix issues command
  const fixCommand = vscode.commands.registerCommand('autoqcoder.fix', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor found');
      return;
    }

    const filePath = editor.document.fileName;
    await fixIssues(filePath, context);
  });

  // Mental test command
  const mentalTestCommand = vscode.commands.registerCommand('autoqcoder.mentalTest', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor found');
      return;
    }

    const filePath = editor.document.fileName;
    await runMentalTests(filePath, context);
  });

  // Show metrics command
  const showMetricsCommand = vscode.commands.registerCommand('autoqcoder.showMetrics', async () => {
    const metrics = await getMetrics();
    const message = `
**AutoQCoder Metrics:**
• Self-score: ${metrics.selfScore}/100
• Functions ≤20 lines: ${metrics.functions20Lines}%
• Complexity ≤10: ${metrics.complexity10}%
• Error handling coverage: ${metrics.errorHandling}%
• Mental test coverage: ${metrics.mentalCoverage}%
• Code deletions (violations): ${metrics.deletions}
• Evolution rounds completed: ${metrics.rounds}
    `.trim();

    vscode.window.showInformationMessage(message);
  });

  // Update evolution files command
  const updateEvolutionCommand = vscode.commands.registerCommand('autoqcoder.updateEvolution', async () => {
    await updateEvolutionFiles(context);
    vscode.window.showInformationMessage('Evolution files updated successfully!');
  });

  // Quick validation on save (optional, based on config)
  const config = vscode.workspace.getConfiguration('autoqcoder');
  if (config.get('validateOnSave', false)) {
    context.subscriptions.push(
      vscode.workspace.onDidSaveTextDocument(async (document) => {
        if (document.languageId !== 'markdown' && document.fileName.endsWith('.md')) {
          // Auto-validate AGENTS.md and AUTO-CONTINUE.md on save
          await validateFile(document.fileName, context);
        }
      })
    );
  }

  context.subscriptions.push(
    validateCommand,
    fixCommand,
    mentalTestCommand,
    showMetricsCommand,
    updateEvolutionCommand
  );
}

export function deactivate() {
  console.log('AutoQCoder extension is now deactivated');
}
