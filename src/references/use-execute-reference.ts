import { watchEffect } from "vue";
import { Method, ExecutionReference, ExecutionConfig } from "../types";

/**
 * NOTE, this composable is not the same as the useExecutionReference
 * This composable takes another ExecutionReference, and will trigger it's execution.
 * Furthermore, it'll establish a watch effect, so that any reactive changes will cause a re-execution.
 * @param referenceFn
 * @param method
 * @param configuration
 * @param args
 */
export function useExecuteReference<
  TReference extends ExecutionReference<TResponse, []>,
  TResponse,
  TArgs extends unknown[],
>(
  referenceFn: (
    method: Method<TResponse, TArgs>,
    configuration: ExecutionConfig<TResponse, TArgs>,
  ) => TReference,
  method: Method<TResponse, [...args: TArgs]>,
  configuration: ExecutionConfig<TResponse, TArgs>,
  ...args: TArgs
): ExecutionReference<TResponse, []> {
  const reference = referenceFn(() => method(...args), configuration);
  reference.execute();
  watchEffect(reference.execute);
  return reference;
}
