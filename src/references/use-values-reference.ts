import { Method, ExecutionReference, ExecutionConfig } from "../types";

export function useValuesReference<
  TReference extends ExecutionReference<TResponse, TArgs>,
  TResponse,
  TArg extends unknown[],
  TArgs extends unknown[],
>(
  referenceFn: (
    method: Method<TResponse, TArgs>,
    configuration: ExecutionConfig<TResponse, TArgs>,
  ) => TReference,
  method: Method<TResponse, [...arg: TArg, ...args: TArgs]>,
  configuration: ExecutionConfig<TResponse, TArgs>,
  ...arg: TArg
): ExecutionReference<TResponse, TArgs> {
  const reference = referenceFn(
    (...args: TArgs) => method(...arg, ...args),
    configuration,
  );
  return reference;
}
