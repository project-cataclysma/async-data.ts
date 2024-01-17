import { ExecuitonReference, ExecutionConfig, Method, StatusConfig } from "../types";
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
    const reference = referenceFn(method, configuration);
    return {
        ...reference
    }
}