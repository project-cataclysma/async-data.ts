import { ExecutionConfig } from "../../types";
import { ExecutionReference } from "../references";

export type ExecutionComposable<TResponse, TArgs extends unknown[]> = (
  config?: Partial<ExecutionConfig<TResponse, TArgs>>,
) => ExecutionReference<TResponse, TArgs>;
