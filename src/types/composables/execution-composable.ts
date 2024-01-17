import { ExecutionConfig } from "../../types";
import { ExecuitonReference } from "../references";

export type ExecutionComposable<
    TConfig extends ExecutionConfig<TResponse, TArgs>,
    TResponse,
    TArgs extends any[]
> = (config?: Partial<TConfig>) => ExecuitonReference<TResponse, TArgs>