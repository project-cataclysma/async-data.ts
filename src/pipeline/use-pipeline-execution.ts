import { ExecuitonReference, ExecutionConfig, Method, Pipeline } from "../types";
import { useExecutionReference } from "../references";
import { usePipeline } from "./use-pipeline";

export function usePipelineExecution<
    TResponse,
    TArgs extends any[],
>(
    method: Method<TResponse, TArgs>,
    defaultConfig?: ExecutionConfig<TResponse, TArgs>,
): Pipeline<ExecuitonReference<TResponse, TArgs>, TResponse, TArgs> {
    return usePipeline(useExecutionReference, method, defaultConfig);
}