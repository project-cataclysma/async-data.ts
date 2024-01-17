import { ExecuitonReference, ExecutionConfig, Method, StatusConfig, Pipeline } from "./types";
import { useExecutionComposable, useStatusComposable } from "./composables";

export function usePipeline<
    TReference extends ExecuitonReference<TResponse, TArgs>,
    TResponse,
    TArgs extends any[],
>(
    referenceFn: (method: Method<TResponse, TArgs>, configuration: ExecutionConfig<TResponse, TArgs>) => TReference,
    method: Method<TResponse, TArgs>,
    defaultConfig?: ExecutionConfig<TResponse, TArgs>,
): Pipeline<TReference, TResponse, TArgs> {
    return {
        execute: () => useExecutionComposable(method, defaultConfig),
        status<TResult, TError extends Error = Error>(config?: Partial<StatusConfig<TResult, TResponse, TArgs, TError>>){
            return useStatusComposable(referenceFn, method, {...defaultConfig, ...config});
        }
    }
}