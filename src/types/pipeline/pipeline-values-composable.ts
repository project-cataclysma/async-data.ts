import { ExecutionComposable } from "../composables";

export type PipelineValuesComposable<
  TResponse,
  TArgs extends unknown[],
> = TArgs extends [
  ...input: infer TI extends unknown[],
  ...remaining: infer TR extends unknown[],
]
  ? (...args: TI) => ExecutionComposable<TResponse, TR>
  : ExecutionComposable<TResponse, []>;
