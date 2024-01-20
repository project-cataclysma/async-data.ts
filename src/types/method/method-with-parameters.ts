import { Method } from "./method";

export type MethodWithParameters<
  TResponse,
  TArgs extends [arg: unknown, ...args: unknown[]],
> = Method<TResponse, TArgs>;

export function isMethodWithParameters<TResponse>(
  m: (...args: unknown[]) => void,
) {
  return !!(m as MethodWithParameters<
    TResponse,
    [arg: unknown, ...args: unknown[]]
  >);
}
