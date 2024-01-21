import { useStatusComposable } from "../composables";
import {
  ExecutionConfig,
  ExecutionReference,
  Method,
  StatusConfig,
} from "../types";

export function usePipelineStatusComposable<
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
  return <TResult, TError extends Error = Error>(
    config?: Partial<StatusConfig<TResult, TResponse, TArgs, TError>>,
  ) => {
    return useStatusComposable(referenceFn, method, {
      ...defaultConfig,
      ...config,
    });
  };
}
