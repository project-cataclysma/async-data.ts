export type Method<TResponse, TArgs extends unknown[]> = (
  ...args: TArgs
) => Promise<TResponse>;
