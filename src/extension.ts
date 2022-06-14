// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import helloWorld from './commands/HelloWorld';
import { CommandT } from './commands/CommandT';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ws-code" is now active!');

	const commands: Array<CommandT> = [
		helloWorld
	];
	
	const disposables = commands.map(element => vscode.commands.registerCommand(
			helloWorld.id,
			helloWorld.run(vscode)
	));
	
	context.subscriptions.push(...disposables);
}

// this method is called when your extension is deactivated
export function deactivate() {}
