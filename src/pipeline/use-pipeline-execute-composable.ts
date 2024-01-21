import { useExecuteComposable } from "../composables";
import { ExecutionConfig, ExecutionReference, Method } from "../types";

export function usePipelineExecuteComposable<
  TReference extends ExecutionReference<TResponse, TArgs>,
  TResponse,
  TArgs extends unknown[],
>(
  referenceFn: (
    method: Method<TResponse, TArgs>,
    configuration: ExecutionConfig<TResponse, TArgs>,
  ) => TReference,
  method: Method<TResponse, TArgs>,
  defaultConfig?: ExecutionConfig<TResponse, TArgs>,
) {
  return (config?: Partial<ExecutionConfig<TResponse, TArgs>>) =>
    useExecuteComposable(referenceFn, method, { ...defaultConfig, ...config });
}
