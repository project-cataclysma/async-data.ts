import { ExecutionConfig } from "../types/configs";
import { ExecuteComposable } from "../types/composables";
import { Method } from "../types/method";
import { useExecuteReference } from "../references/use-execute-reference";
import { ExecutionReference } from "..";

export function useExecuteComposable<
  TReference extends ExecutionReference<TResponse, TArgs>,
  TConfig extends ExecutionConfig<TResponse, TArgs>,
  TResponse,
  TArgs extends unknown[],
>(
  referenceFn: (
    method: Method<TResponse, TArgs>,
    configuration: ExecutionConfig<TResponse, TArgs>,
  ) => TReference,
  action: Method<TResponse, TArgs>,
  defaultConfig: TConfig,
): ExecuteComposable<TResponse, TArgs> {
  return (...args: TArgs) =>
    useExecuteReference(referenceFn, action, defaultConfig, ...args);
}
