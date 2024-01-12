export type OnSuccess<TResponse, TArgs extends any[]> = (
    response: TResponse,
    ...args: TArgs
) => void;