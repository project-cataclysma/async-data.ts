import { StatusConfig } from "../configs";
import { ExecuitonReference, StatusReference } from "../references";

export type StatusComposable<TResult, TReference extends ExecuitonReference<TResponse, TArgs>, TResponse, TArgs extends any[], TError extends Error = Error> = (config?: Partial<StatusConfig<TResult, TResponse, TArgs, TError>>) => StatusReference<TResult, TReference, TResponse, TArgs>