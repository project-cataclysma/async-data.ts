import { ExecutionComposable, StatusComposable } from "../composables";
import { StatusConfig } from "../configs";
import { ExecuitonReference } from "../references/execution-reference";

export type PipelineWithoutParameters<
  TReference extends ExecuitonReference<TResponse, TArgs>,
  TResponse,
  TArgs extends unknown[],
> = {
  status: <TResult, TError extends Error = Error>(
    config?: Partial<StatusConfig<TResult, TResponse, TArgs, TError>>,
  ) => StatusComposable<TResult, TReference, TResponse, TArgs, TError>;
  execute: () => ExecutionComposable<TResponse, TArgs>;
};
