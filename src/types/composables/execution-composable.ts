import { ExecuitonReference } from "../references";

export type ExecutionComposable<TResponse, TArgs extends any[]> = () => ExecuitonReference<TResponse, TArgs>