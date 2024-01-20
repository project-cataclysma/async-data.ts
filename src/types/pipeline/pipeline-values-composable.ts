import { ExecutionComposable } from "..";

export type PipelineValuesComposable<
  TResponse,
  TArgs extends [arg: unknown, ...args: unknown[]],
> = TArgs extends [...input: infer TI, ...remaining: infer TR]
  ? (...args: TI) => ExecutionComposable<TResponse, TR>
  : ExecutionComposable<TResponse, []>;
