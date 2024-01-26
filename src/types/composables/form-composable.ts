import { ExecutionConfig } from "../../types";
import { ExecutionReference, FormReference } from "../references";

export type FormComposable<
  TResponse,
  TArgs extends unknown[],
  TArg,
  TReference extends ExecutionReference<TResponse, TArgs> = ExecutionReference<
    TResponse,
    TArgs
  >,
> = (
  config?: Partial<ExecutionConfig<TResponse, TArgs>>,
) => FormReference<TReference, TResponse, TArg, TArgs>;
