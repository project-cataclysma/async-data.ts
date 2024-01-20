import { useExecutionReference } from "../references";
import { ExecutionConfig } from "../types/configs";
import { ExecutionComposable } from "../types/composables";
import { Method } from "../types/method";

export function useExecutionComposable<
  TConfig extends ExecutionConfig<TResponse, TArgs>,
  TResponse,
  TArgs extends unknown[],
>(
  action: Method<TResponse, TArgs>,
  defaultConfig: TConfig,
): ExecutionComposable<TResponse, TArgs> {
  return (config?: Partial<TConfig>) =>
    useExecutionReference(action, {
      ...defaultConfig,
      ...config,
    });
}
