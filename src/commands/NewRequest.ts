import * as vscode from 'vscode';
import { CommandT } from "./CommandT";
import { NewRequestPanel } from "../panels/NewRequestPanel";

const cats = [
    { title: 'CodingCat', url: 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif' },
    { title: 'CompilingCat', url: 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif' }
];


const newRequest: CommandT = {
    id: 'ws-code.newRequest',
    title: 'WS Code: Start new websocket session',
    run(context: vscode.ExtensionContext): (...args: any[]) => any {
        return () => {
            NewRequestPanel.render(context, context.extensionUri);
        };
    }
};


export default newRequest;
