import { ExecuitonReference, ExecutionConfig, Method, StatusConfig } from "../types";
import { PipelineReference } from "../types/references/pipeline-reference";
import { useExecutionComposable, useStatusComposable } from "../composables";

export function usePipelineReference<
    TReference extends ExecuitonReference<TResponse, TArgs>,
    TResponse,
    TArgs extends any[],
>(
    referenceFn: (method: Method<TResponse, TArgs>, configuration: ExecutionConfig<TResponse, TArgs>) => TReference,
    method: Method<TResponse, TArgs>,
    defaultConfig?: ExecutionConfig<TResponse, TArgs>,
): PipelineReference<TReference, TResponse, TArgs> {
    return {
        execute: () => useExecutionComposable(method, defaultConfig),
        status<TResult, TError extends Error = Error>(config?: Partial<StatusConfig<TResult, TResponse, TArgs, TError>>){
            return useStatusComposable(referenceFn, method, {...defaultConfig, ...config});
        }
    }
}