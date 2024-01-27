import { MaybeRef, toValue } from "vue";
import {
  ComposableBuilder,
  Method,
  ExecutionReference,
  ExecutionConfig,
} from "../types";

export function useReactiveReference<
  TReference extends ExecutionReference<TResponse, TArgs>,
  TResponse,
  TArg,
  TArgs extends unknown[],
>(
  referenceFn: ComposableBuilder<TReference, TResponse, TArgs>,
  method: Method<TResponse, [arg: TArg, ...args: TArgs]>,
  configuration: ExecutionConfig<TResponse, TArgs>,
  arg: MaybeRef<TArg>,
): ExecutionReference<TResponse, TArgs> {
  return referenceFn(
    (...args: TArgs) => method(toValue(arg), ...args),
    configuration,
  );
}
