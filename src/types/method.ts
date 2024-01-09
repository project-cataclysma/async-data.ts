export type Method<TResponse, TArgs extends any[]> = (
    ...args: TArgs
) => Promise<TResponse>;