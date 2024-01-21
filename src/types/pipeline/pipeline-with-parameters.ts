import { ExecutionReference } from "../references/execution-reference";
import { PipelineValuesComposable } from "./pipeline-values-composable";
import { PipelineWithoutParameters } from ".";
import { PipelineValueComposable } from "./pipeline-value-composable";

export type PipelineWithParameters<
  TReference extends ExecutionReference<TResponse, TArgs>,
  TResponse,
  TArgs extends [p1: P1, ...pn: PN],
  P1,
  PN extends unknown[],
> = PipelineWithoutParameters<TReference, TResponse, TArgs> & {
  value: PipelineValueComposable<TResponse, P1, PN>;
  values: PipelineValuesComposable<TResponse, TArgs>;
};
