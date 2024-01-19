export type MethodWithParameters<
    TResponse,
    TArgs extends [arg: any, ...args: any[]],
> = (...args: TArgs) => Promise<TResponse>;

export function isMethodWithParameters<TResponse>(m: (...args: any[]) => void) {
    return !!(m as MethodWithParameters<TResponse, [arg: any, ...args: any[]]>);
}