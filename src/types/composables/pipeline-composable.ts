import { ExecutionConfig } from "../configs";
import { ExecuitonReference, PipelineReference } from "../references";

export type PipelineComposable<
    TConfig extends ExecutionConfig<TResponse, TArgs, TError>,
    TReference extends ExecuitonReference<TResponse, TArgs>,
    TResponse, TArgs extends any[],
    TError extends Error = Error
> = (config?: Partial<TConfig>) => PipelineReference< TReference, TResponse, TArgs>