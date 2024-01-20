export type OnError<TError extends Error, TArgs extends unknown[]> = (
  error: TError,
  ...args: TArgs
) => void;
