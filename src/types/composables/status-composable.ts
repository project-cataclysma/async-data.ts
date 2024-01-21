import { StatusConfig } from "../configs";
import { ExecutionReference, StatusReference } from "../references";

export type StatusComposable<
  TResult,
  TReference extends ExecutionReference<TResponse, TArgs>,
  TResponse,
  TArgs extends unknown[],
  TError extends Error = Error,
> = (
  config?: Partial<StatusConfig<TResult, TResponse, TArgs, TError>>,
) => StatusReference<TResult, TReference, TResponse, TArgs>;
