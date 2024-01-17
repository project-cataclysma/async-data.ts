import { ExecuitonReference } from "./execution-reference";

export type PipelineReference<TReference extends ExecuitonReference<TResponse, TArgs>, TResponse, TArgs extends any[]> = TReference & {

}