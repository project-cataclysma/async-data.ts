import { ExecutionReference } from "../references";
import { FormComposable } from "../composables";

export type PipelineFormComposable<TResponse, P1, PN extends unknown[]> = (
  initialValue: P1,
) => FormComposable<TResponse, PN, P1, ExecutionReference<TResponse, PN>>;
