import { useFormComposable } from "../composables";
import { ExecutionConfig, ExecutionReference, Method } from "../types";

export function usePipelineFormComposable<
  TReference extends ExecutionReference<TResponse, PN>,
  TResponse,
  TArgs extends [p0: unknown, ...pn: PN],
  PN extends unknown[],
>(
  referenceFn: ComposableBuilder<TReference, TResponse, PN>,
  method: Method<TResponse, TArgs>,
  defaultConfig?: ExecutionConfig<TResponse, PN>,
) {
  return (arg: TArgs[0]) =>
    useFormComposable(referenceFn, method, defaultConfig, arg);
}
