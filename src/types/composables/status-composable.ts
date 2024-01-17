import { ExecuitonReference, StatusReference } from "../references";

export type StatusComposable<TResult, TReference extends ExecuitonReference<TResponse, TArgs>, TResponse, TArgs extends any[]> = () => StatusReference<TResult, TReference, TResponse, TArgs>