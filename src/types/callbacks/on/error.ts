export type OnError<TError extends Error, TArgs extends any[]> = (
    error: TError,
    ...args: TArgs
) => void;