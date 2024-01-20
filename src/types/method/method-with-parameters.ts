import { MethodWithoutParameters } from "./method-without-parameters";

export type MethodWithParameters<
  TResponse,
  TArgs extends [arg: unknown, ...args: unknown[]],
> = MethodWithoutParameters<TResponse, TArgs>;

export function isMethodWithParameters<TResponse>(
  m: (...args: unknown[]) => void,
) {
  return !!(m as MethodWithParameters<
    TResponse,
    [arg: unknown, ...args: unknown[]]
  >);
}
