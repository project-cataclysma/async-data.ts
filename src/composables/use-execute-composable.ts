import { ExecutionConfig } from "../types/configs";
import { ComposableBuilder, ExecuteComposable } from "../types/composables";
import { Method } from "../types/method";
import { useExecuteReference } from "../references/use-execute-reference";
import { ExecutionReference } from "../types/references";

export function useExecuteComposable<
  TReference extends ExecutionReference<TResponse, TArgs>,
  TConfig extends ExecutionConfig<TResponse, TArgs>,
  TResponse,
  TArgs extends unknown[],
>(
  referenceFn: ComposableBuilder<TReference, TResponse, TArgs>,
  action: Method<TResponse, TArgs>,
  defaultConfig: TConfig,
): ExecuteComposable<TResponse, TArgs> {
  return (...args: TArgs) =>
    useExecuteReference(referenceFn, action, defaultConfig, ...args);
}
