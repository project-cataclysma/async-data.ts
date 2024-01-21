import { useValuesReference } from "../references";
import { ExecutionComposable } from "../types";
import { ExecutionConfig } from "../types/configs";
import { Method } from "../types/method";
import { ExecutionReference } from "../types/references";

export function useValuesComposable<
  TReference extends ExecutionReference<TResponse, TArgs>,
  TResponse,
  TArg extends unknown[],
  TArgs extends unknown[],
  TError extends Error,
>(
  referenceFn: (
    method: Method<TResponse, TArgs>,
    configuration: ExecutionConfig<TResponse, TArgs>,
  ) => TReference,
  action: Method<TResponse, [...arg: TArg, ...args: TArgs]>,
  defaultConfig: ExecutionConfig<TResponse, TArgs, TError>,
  ...arg: TArg
): ExecutionComposable<TResponse, TArgs> {
  return (config?: Partial<ExecutionConfig<TResponse, TArgs, TError>>) =>
    useValuesReference(
      referenceFn,
      action,
      {
        ...defaultConfig,
        ...config,
      },
      ...arg,
    );
}
