import { ExecutionComposable } from "..";

export type PipelineValuesComposable<
    TResponse,
    TArgs extends [arg: any, ...args: any[]],
> = TArgs extends [...input: infer TI, ...remaining: infer TR]
  ? (...args: TI) => ExecutionComposable<TResponse, TR>
  : ExecutionComposable<TResponse, []>