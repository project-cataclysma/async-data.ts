import { useStatusReference } from "./use-status-reference";
import { ExecuitonReference, ExecutionConfig, Method } from "../types";
import { PipelineReference } from "../types/references/pipeline-reference";

export function usePipelineReference<
    TReference extends ExecuitonReference<TResponse, TArgs>,
    TMethod extends Method<TResponse, TArgs>,
    TConfig extends ExecutionConfig<TResponse, TArgs>,
    TResponse, TArgs extends any[],
>(
    referenceFn: (method: TMethod, configuration: TConfig) => TReference,
    method: TMethod,
    configuration?: TConfig,
): PipelineReference<TReference, TResponse, TArgs> {
    return {
        execute: () => referenceFn(method, configuration),
        status: () => useStatusReference(referenceFn, method, configuration),
    }
}