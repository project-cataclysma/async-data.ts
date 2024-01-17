import { ExecutionComposable, StatusComposable } from "./composables";
import { StatusConfig } from "./configs";
import { ExecuitonReference } from "./references/execution-reference";

export type Pipeline<TReference extends ExecuitonReference<TResponse, TArgs>, TResponse, TArgs extends any[]> = {
    status: <TResult, TError extends Error = Error>(config?: Partial<StatusConfig<TResult, TResponse, TArgs, TError>>) => StatusComposable<StatusConfig<TResult, TResponse, TArgs, TError>, TResult, TReference, TResponse, TArgs, TError>;
    execute: () => ExecutionComposable<TResponse, TArgs>;
}