import { ExecutionComposable, StatusComposable } from "../composables";
import { StatusConfig } from "../configs";
import { ExecutionReference } from "../references/execution-reference";

export type PipelineWithoutParameters<
  TReference extends ExecutionReference<TResponse, TArgs>,
  TResponse,
  TArgs extends unknown[],
> = {
  status: <TResult, TError extends Error = Error>(
    config?: Partial<StatusConfig<TResult, TResponse, TArgs, TError>>,
  ) => StatusComposable<TResult, TReference, TResponse, TArgs, TError>;
  execute: () => (...args: TArgs) => ExecutionReference<TResponse, []>;
  get: () => ExecutionComposable<TResponse, TArgs, TReference>;
};
