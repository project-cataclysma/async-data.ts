import { Method, ExecuitonReference, StatusReference } from "../types";
import { StatusConfig } from "../types/configs/status-config";
import { useExecutionReference } from "./use-execution-reference";
import { useStatusReference } from "./use-status-reference";

export function useStatusReferenceExecution<TResult, TResponse, TArgs extends any[], TError extends Error>(
    method: Method<TResponse, TArgs>,
    configuration?: StatusConfig<TResult, TResponse, TArgs, TError>,
): StatusReference<TResult, ExecuitonReference<TResponse, TArgs>, TResponse, TArgs, TError> {
    return useStatusReference(useExecutionReference, method, configuration)
}