import { ExecutionConfig, ExecutionReference, Method } from "../types";

export function usePipelineGetComposable<
  TReference extends ExecutionReference<TResponse, TArgs>,
  TResponse,
  TArgs extends unknown[],
>(
  referenceFn: ComposableBuilder<TReference, TResponse, TArgs>,
  method: Method<TResponse, TArgs>,
  defaultConfig?: ExecutionConfig<TResponse, TArgs>,
) {
  return (config?: Partial<ExecutionConfig<TResponse, TArgs>>) => () =>
    referenceFn(method, { ...defaultConfig, ...config });
}
