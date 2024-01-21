import { ExecutionConfig } from "../../types";
import { ExecutionReference } from "../references";

export type ExecutionComposable<
  TResponse,
  TArgs extends unknown[],
  TReference extends ExecutionReference<TResponse, TArgs> = ExecutionReference<
    TResponse,
    TArgs
  >,
> = (config?: Partial<ExecutionConfig<TResponse, TArgs>>) => TReference;
