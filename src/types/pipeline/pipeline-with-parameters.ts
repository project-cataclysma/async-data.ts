import { MaybeRef } from "vue";
import { ExecutionComposable, StatusComposable } from "../composables";
import { StatusConfig } from "../configs";
import { ExecuitonReference } from "../references/execution-reference";
import { PipelineValuesComposable } from "./pipeline-values-composable";

export type PipelineWithParameters<TReference extends ExecuitonReference<TResponse, TArgs>, TResponse, TArgs extends [p1: P1, ...pn: PN], P1 extends any, PN extends any[]> = {
    status: <TResult, TError extends Error = Error>(config?: Partial<StatusConfig<TResult, TResponse, TArgs, TError>>) => StatusComposable<TResult, TReference, TResponse, TArgs, TError>;
    execute: () => ExecutionComposable<TResponse, TArgs>;
    value: (arg: MaybeRef<P1>) => ExecutionComposable<TResponse, PN>;
    values: PipelineValuesComposable<TResponse, TArgs>;
}