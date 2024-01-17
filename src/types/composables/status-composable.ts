import { StatusConfig } from "../configs";
import { ExecuitonReference, StatusReference } from "../references";

export type StatusComposable<TConfig extends StatusConfig<TResult, TResponse, TArgs, TError>, TResult, TReference extends ExecuitonReference<TResponse, TArgs>, TResponse, TArgs extends any[], TError extends Error = Error> = (config?: Partial<TConfig>) => StatusReference<TResult, TReference, TResponse, TArgs>