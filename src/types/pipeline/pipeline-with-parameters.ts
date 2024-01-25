import { ExecutionReference } from "../references/execution-reference";
import { PipelineValuesComposable } from "./pipeline-values-composable";
import { PipelineWithoutParameters } from "./pipeline-without-parameters";
import { PipelineReactiveComposable } from "./pipeline-reactive-composable";
import { PipelineValueComposable } from "./pipeline-value-composable";
import { PipelineFormComposable } from "./pipeline-form-composable";

export type PipelineWithParameters<
  TReference extends ExecutionReference<TResponse, TArgs>,
  TResponse,
  TArgs extends [p1: P1, ...pn: PN],
  P1,
  PN extends unknown[],
> = PipelineWithoutParameters<TReference, TResponse, TArgs> & {
  form: PipelineFormComposable<TResponse, P1, PN>;
  reactive: PipelineReactiveComposable<TResponse, P1, PN>;
  value: PipelineValueComposable<TResponse, P1, PN>;
  values: PipelineValuesComposable<TResponse, TArgs>;
};
