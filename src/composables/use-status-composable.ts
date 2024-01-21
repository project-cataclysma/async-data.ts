import { useStatusReference } from "../references";
import { StatusComposable } from "../types";
import { StatusConfig } from "../types/configs";
import { Method } from "../types/method";
import { ExecutionReference } from "../types/references";

export function useStatusComposable<
  TResult,
  TReference extends ExecutionReference<TResponse, TArgs>,
  TResponse,
  TArgs extends unknown[],
  TError extends Error,
>(
  referenceFn: (
    method: Method<TResponse, TArgs>,
    configuration: StatusConfig<TResult, TResponse, TArgs>,
  ) => TReference,
  action: Method<TResponse, TArgs>,
  defaultConfig: StatusConfig<TResult, TResponse, TArgs, TError>,
): StatusComposable<TResult, TReference, TResponse, TArgs, TError> {
  return (config?: Partial<StatusConfig<TResult, TResponse, TArgs, TError>>) =>
    useStatusReference(referenceFn, action, {
      ...defaultConfig,
      ...config,
    });
}
