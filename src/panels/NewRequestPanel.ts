import * as vscode from "vscode";
import { getUri } from "../utilities/getUri";

export class NewRequestPanel {
    public static currentPanel: NewRequestPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this._panel = panel;
        this._panel.onDidDispose(this.dispose, null, this._disposables);
        this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri);
        this._setWebviewMessageListener(this._panel.webview);
    }

    public static render(context: vscode.ExtensionContext, extensionUri: vscode.Uri) {
        if (NewRequestPanel.currentPanel) {
            NewRequestPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
            return;
        }

        // Create and show panel
        const panel = vscode.window.createWebviewPanel(
            'ws-code',
            'Start new websocket session',
            vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );

        NewRequestPanel.currentPanel = new NewRequestPanel(panel, extensionUri);
    }

    public dispose() {
        NewRequestPanel.currentPanel = undefined;

        this._panel.dispose();

        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }


    private _getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
        const toolkitUri = getUri(webview, extensionUri, [
            "node_modules",
            "@vscode",
            "webview-ui-toolkit",
            "dist",
            "toolkit.js", // A toolkit.min.js file is also available
        ]);
        const mainUri = getUri(webview, extensionUri, ["webview-ui", "main.js"]);

        return /*html*/ `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script type="module" src="${toolkitUri}"></script>
                <script type="module" src="${mainUri}"></script>
                <title>Cat Coding</title>
            </head>
            <body>
                <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
                <h1 id="lines-of-code-counter">0</h1>
                <vscode-button id="howdy">Howdy!</vscode-button>
            </body>
        </html>`;
    }

    private _setWebviewMessageListener(webview: vscode.Webview) {
        webview.onDidReceiveMessage(
            (message: any) => {
                const command = message.command;
                const text = message.text;

                switch (command) {
                    case "hello":
                        vscode.window.showInformationMessage(text);
                        break;
                    case 'alert':
                        vscode.window.showErrorMessage(message.text);
                        break;
                }
            },
            undefined,
            this._disposables
        );
    }
}
