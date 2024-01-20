export type OnSuccess<TResponse, TArgs extends unknown[]> = (
  response: TResponse,
  ...args: TArgs
) => void;
