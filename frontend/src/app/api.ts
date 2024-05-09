const base = "http://127.0.0.1:8000"

export interface IOperatorStatus {
    operators: number;
    trials: number;
    alarms: number;
}

export interface IIssueStatus {
    issues: number;
    fixed: number;
}

export interface ITestResult {
    operator: string,
    trail: number,
    alarm: number;
}

export interface IIssue {
    operator: string;
    link: string;
    status: "" | "confirmed" | "fixed";
}

export interface ITestDetail extends ITestResult {
    crash: number;
    health: number;
    cases: object;
    fields: object;
    issues: IIssue[]
}

export async function getOperatorStatus(): Promise<IOperatorStatus> {
    const res = await fetch(`${base}/operator/status`);
    return res.json();
}

export async function getIssueStatus(): Promise<IIssueStatus> {
    const res = await fetch(`${base}/issue/status`);
    return res.json();
}

export async function getTestResults(): Promise<ITestResult[]> {
    const res = await fetch(`${base}/operator/list`);
    return res.json();
}

export async function getOperatorTestDetails(operator: string): Promise<ITestDetail[]> {
    const res = await fetch(`${base}/operator/details?operator=${operator}`);
    return res.json();
}