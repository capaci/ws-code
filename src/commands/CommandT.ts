import * as vscode from 'vscode';

export type CommandT = {
    id: string;
    title: string
    run(context: vscode.ExtensionContext): (...args: any[]) => any
};
