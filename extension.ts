import * as vscode from 'vscode';
import { exec, spawn } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { t } from './i18n';

export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration('flashRunC');
  const compiler = config.get<string>('compiler');

  if (!compiler || !['gcc', 'clang', 'tcc'].includes(compiler)) {
    vscode.window.showWarningMessage(
      t('compilerNotSet'),
      t('openSettings')
    ).then(selection => {
      if (selection === t('openSettings')) {
        vscode.commands.executeCommand('workbench.action.openSettings', 'flashRunC.compiler');
      }
    });
  }

  const disposable = vscode.commands.registerCommand('flashRunC.runCFile', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage(t('noEditor'));
      return;
    }

    const doc = editor.document;
    if (doc.languageId !== 'c') {
      vscode.window.showErrorMessage(t('onlyCFiles'));
      return;
    }

    const flags = config.get<string>('compilerFlags')!;
    const customName = config.get<string>('outputName')!;
    const autoDelete = config.get<boolean>('autoDeleteExecutable')!;
    const enableBuildFolder = config.get<boolean>('enableBuildFolder')!;
    const buildFolder = config.get<string>('buildFolder')!;
    const selectedCompiler = compiler!;

    doc.save().then(async () => {
      const srcPath = doc.fileName;
      const base = path.basename(srcPath, '.c');
      let outDir = path.dirname(srcPath);
      if (enableBuildFolder) {
        outDir = path.join(outDir, buildFolder);
        if (!fs.existsSync(outDir)) {
          fs.mkdirSync(outDir);
        }
      }
      const outName = customName || base;
      const exePath = path.join(outDir, outName);
      
      const platform = process.platform;
      let platformCmd = '';
      let exeRunPath = `"${exePath}"`;
      const deleteCmd = platform === 'win32'
        ? `del \"${exePath}.exe\"`
        : `rm \"${exePath}\"`;

      // 플랫폼별 컴파일러 명령어 설정
      if (selectedCompiler === 'gcc') {
        if (platform === 'win32') {
          platformCmd = `gcc \"${srcPath}\" ${flags} -o \"${exePath}.exe\"`;
          exeRunPath = `\"${exePath}.exe\"`;
        } else {
          platformCmd = `gcc \"${srcPath}\" ${flags} -o \"${exePath}\"`;
        }
      } else if (selectedCompiler === 'clang') {
        if (platform === 'win32') {
          platformCmd = `clang \"${srcPath}\" ${flags} -o \"${exePath}.exe\"`;
          exeRunPath = `\"${exePath}.exe\"`;
        } else {
          platformCmd = `clang \"${srcPath}\" ${flags} -o \"${exePath}\"`;
        }
      } else if (selectedCompiler === 'tcc') {
        if (platform === 'win32') {
          platformCmd = `tcc \"${srcPath}\" ${flags} -o \"${exePath}.exe\"`;
          exeRunPath = `\"${exePath}.exe\"`;
        } else {
          platformCmd = `tcc \"${srcPath}\" ${flags} -o \"${exePath}\"`;
        }
      } else {
        vscode.window.showErrorMessage(t('unsupportedCompiler'));
        return;
      }

      // 컴파일 시작 시간
      const startTime = Date.now();
      vscode.window.showInformationMessage(t('compiling'));

      // 일정 시간 기다린 후 터미널에서 실행
      setTimeout(() => {
        const terminal = vscode.window.createTerminal('Flash Run C');
        terminal.show();
        terminal.sendText(`${platformCmd} && ${exeRunPath}` + (autoDelete ? ` && ${deleteCmd}` : ''));

        const compileTime = ((Date.now() - startTime) / 1000).toFixed(3);
        vscode.window.showInformationMessage(
          `Compile done in ${compileTime}s`
        );

      }, 1000); // 1초 대기 후 실행
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}