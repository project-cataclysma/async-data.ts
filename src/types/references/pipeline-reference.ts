import { StatusReference } from ".";
import { ExecutionComposable } from "..";
import { ExecuitonReference } from "./execution-reference";

export type PipelineReference<TReference extends ExecuitonReference<TResponse, TArgs>, TResponse, TArgs extends any[]> = {
    status: <TResult, TError extends Error>() => StatusReference<TResult, TReference, TResponse, TArgs, TError>;
    execute: () => TReference;
}