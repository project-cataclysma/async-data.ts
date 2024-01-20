export type MethodWithParameters<
  TResponse,
  TArgs extends [arg: unknown, ...args: unknown[]],
> = (...args: TArgs) => Promise<TResponse>;

export function isMethodWithParameters<TResponse>(
  m: (...args: unknown[]) => void,
) {
  return !!(m as MethodWithParameters<
    TResponse,
    [arg: unknown, ...args: unknown[]]
  >);
}
