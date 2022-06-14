import { CommandT } from "./CommandT";

const helloWorld: CommandT = {
    id: 'ws-code.helloWorld',
    title: 'Hello World',
    run(vscode: any): (...args: any[]) => any {
        return () => {
            vscode.window.showInformationMessage('Hello World from ws-code!');
        };
    }
};


export default helloWorld;
