'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


// 定义滚动的枚举，用于快速滚动到屏幕顶/中/底部
enum Scroll {
    Center,
    Top,
    Bottom
}
var scrollPosition: Scroll = Scroll.Center;     // 默认第一次处理为居中

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

    // wzx center curr line
    // 用于将当前行置于居中，类似emacs的ctrl+l
    let wzxCenterLine = vscode.commands.registerCommand('extension.wzx.centerLine', () => {
        const doc = vscode.window.activeTextEditor;
        const selection = doc.selection;
        const range = new vscode.Range(selection.start, selection.end);
        // 每次编辑后需要重新置为center
        vscode.window.onDidChangeActiveTextEditor(() => {
            scrollPosition = Scroll.Center;
        })

        if (scrollPosition === Scroll.Top) {
            let promises = [
                vscode.commands.executeCommand("scrollPageDown"),
                vscode.commands.executeCommand("scrollPageDown")
            ];
            Promise.all(promises).then(() => {
                doc.revealRange(selection, vscode.TextEditorRevealType.Default)
            });
            scrollPosition = Scroll.Bottom;
        } else if (scrollPosition === Scroll.Bottom) {
            let promises = [
                vscode.commands.executeCommand("scrollPageUp"),
                vscode.commands.executeCommand("scrollPageUp")
            ];
            Promise.all(promises).then(() => {
                doc.revealRange(selection, vscode.TextEditorRevealType.Default)
            });
            scrollPosition = Scroll.Center;
        } else {
            doc.revealRange(range, vscode.TextEditorRevealType.InCenter);
            scrollPosition = Scroll.Top;
        }
    });
    context.subscriptions.push(wzxCenterLine);
}

// this method is called when your extension is deactivated
export function deactivate() {
}