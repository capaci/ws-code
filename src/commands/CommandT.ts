export type CommandT = {
    id: string;
    title: string
    run(vscode: any): (...args: any[]) => any
};
