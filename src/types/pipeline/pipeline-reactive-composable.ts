import { MaybeRef } from "vue";
import { ExecutionReference } from "../references";
import { Pipeline } from "./pipeline";

export type PipelineReactiveComposable<TResponse, P1, PN extends unknown[]> = (
  arg: MaybeRef<P1>,
) => Pipeline<ExecutionReference<TResponse, PN>, TResponse, PN>;
