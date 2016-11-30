'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('加载wzx-extension插件成功');


    // wzx jump out
    // 用于快速跳出到目标位置： 如下一个' or " or ] or ) or } 之类
    let wzxJumpOut = vscode.commands.registerCommand('extension.wzx.jumpOut', () => {
        let doc = vscode.window.activeTextEditor;
        let splitArray = ['}', ']', ')', '>', '"', '\'', '`'];
        let pos = 999999;
        let findPos = -1;

        for (var k in splitArray) {
            findPos = doc.document.getText().indexOf(splitArray[k], doc.document.offsetAt(doc.selection.active));
            if (findPos >= 0 && findPos < pos) {
                pos = findPos;
            }
        }

        if (pos > 0) {
            // 找到最近的一个，跳出
            let jumpPos = doc.document.positionAt(pos + 1);
            doc.selection = new vscode.Selection(jumpPos, jumpPos);
        }
    });
    context.subscriptions.push(wzxJumpOut);
}

// this method is called when your extension is deactivated
export function deactivate() {
}