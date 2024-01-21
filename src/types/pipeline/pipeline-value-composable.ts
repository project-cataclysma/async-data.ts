import { MaybeRef } from "vue";
import { ExecutionComposable } from "../composables";

export type PipelineValueComposable<TResponse, P1, PN extends unknown[]> = (
  arg: MaybeRef<P1>,
) => ExecutionComposable<TResponse, PN>;
