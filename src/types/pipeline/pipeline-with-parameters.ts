import { MaybeRef } from "vue";
import { ExecutionComposable } from "../composables";
import { ExecuitonReference } from "../references/execution-reference";
import { PipelineValuesComposable } from "./pipeline-values-composable";
import { PipelineWithoutParameters } from ".";

export type PipelineWithParameters<
  TReference extends ExecuitonReference<TResponse, TArgs>,
  TResponse,
  TArgs extends [p1: P1, ...pn: PN],
  P1,
  PN extends unknown[],
> = PipelineWithoutParameters<TReference, TResponse, TArgs> & {
  value: (arg: MaybeRef<P1>) => ExecutionComposable<TResponse, PN>;
  values: PipelineValuesComposable<TResponse, TArgs>;
};
