import { MaybeRef, toValue } from "vue";
import { Method, ExecuitonReference, ExecutionConfig } from "../types";

export function useValueReference<
  TReference extends ExecuitonReference<TResponse, TArgs>,
  TResponse,
  TArg,
  TArgs extends unknown[],
>(
  referenceFn: (
    method: Method<TResponse, TArgs>,
    configuration: ExecutionConfig<TResponse, TArgs>,
  ) => TReference,
  method: Method<TResponse, [arg: TArg, ...args: TArgs]>,
  configuration: ExecutionConfig<TResponse, TArgs>,
  arg: MaybeRef<TArg>,
): ExecuitonReference<TResponse, TArgs> {
  return referenceFn(
    (...args: TArgs) => method(toValue(arg), ...args),
    configuration,
  );
}
