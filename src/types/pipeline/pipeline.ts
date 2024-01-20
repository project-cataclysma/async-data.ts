import { ExecuitonReference } from "../references/execution-reference";
import { PipelineWithParameters } from "./pipeline-with-parameters";
import { PipelineWithoutParameters } from "./pipeline-without-parameters";

export type Pipeline<
  TReference extends ExecuitonReference<TResponse, TArgs>,
  TResponse,
  TArgs extends unknown[],
> = TArgs extends [p1: infer P1, ...pn: infer PN]
  ? PipelineWithParameters<TReference, TResponse, TArgs, P1, PN>
  : PipelineWithoutParameters<TReference, TResponse, TArgs>;
