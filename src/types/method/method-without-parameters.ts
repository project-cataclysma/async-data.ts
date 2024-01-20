export type MethodWithoutParameters<TResponse, TArgs extends unknown[] = []> = (
  ...args: TArgs
) => Promise<TResponse>;
