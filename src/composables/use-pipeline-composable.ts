import { usePipelineReference } from "../references";
import { PipelineComposable } from "../types";
import { ExecutionConfig } from "../types/configs";
import { Method } from "../types/method";
import { ExecuitonReference } from "../types/references";

export function usePipelineComposable<
    TConfig extends ExecutionConfig<TResponse, TArgs, TError>,
    TReference extends ExecuitonReference<TResponse, TArgs>,
    TResponse, TArgs extends any[],
    TError extends Error
>(
    referenceFn: (method: Method<TResponse, TArgs>, configuration: TConfig) => TReference,
    action: Method<TResponse, TArgs>,
    defaultConfig: TConfig
): PipelineComposable<TConfig, TReference, TResponse, TArgs, TError> {
    return (config?: Partial<TConfig>) => usePipelineReference(referenceFn, action, {
        ...defaultConfig,
        ...config,
    });
}