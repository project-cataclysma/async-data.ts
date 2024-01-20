import {
  ExecuitonReference,
  ExecutionConfig,
  Method,
  StatusConfig,
  Pipeline,
} from "../types";
import {
  useExecutionComposable,
  useStatusComposable,
  useValueComposable,
  useValuesComposable,
} from "../composables";
import { isMethodWithParameters } from "../types/method/method-with-parameters";
import { useExecuteReference } from "../references/use-execute-reference";

export function usePipeline<
  TReference extends ExecuitonReference<TResponse, TArgs>,
  TResponse,
  TArgs extends unknown[],
>(
  referenceFn: (
    method: Method<TResponse, TArgs>,
    configuration: ExecutionConfig<TResponse, TArgs>,
  ) => TReference,
  method: Method<TResponse, TArgs>,
  defaultConfig?: ExecutionConfig<TResponse, TArgs>,
): Pipeline<TReference, TResponse, TArgs> {
  const get = () => useExecutionComposable(method, defaultConfig);
  const execute = (...args: TArgs) =>
    useExecuteReference(referenceFn, method, defaultConfig, ...args);
  const status = <TResult, TError extends Error = Error>(
    config?: Partial<StatusConfig<TResult, TResponse, TArgs, TError>>,
  ) => {
    return useStatusComposable(referenceFn, method, {
      ...defaultConfig,
      ...config,
    });
  };

  if (isMethodWithParameters(method)) {
    return {
      execute,
      get,
      status,
      value: (arg: TArgs[0]) =>
        useValueComposable(referenceFn, method, defaultConfig, arg),
      // TODO: Create a composable to represent this.
      // This way, we can split the TArgs dynamically.
      values: (...args: unknown[]) =>
        useValuesComposable(referenceFn, method, defaultConfig, ...args),
    } as Pipeline<TReference, TResponse, TArgs>;
  } else {
    return {
      execute,
      get,
      status,
    } as Pipeline<TReference, TResponse, TArgs>;
  }
}
