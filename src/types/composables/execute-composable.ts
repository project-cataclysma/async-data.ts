import { ExecutionReference } from "../references";

export type ExecuteComposable<TResponse, TArgs extends unknown[]> = (
  ...args: TArgs
) => ExecutionReference<TResponse, []>;
