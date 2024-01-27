import { useFormReference } from "../references";
import { ComposableBuilder, ExecutionComposable } from "../types";
import { ExecutionConfig } from "../types/configs";
import { Method } from "../types/method";
import { ExecutionReference } from "../types/references";

export function useFormComposable<
  TReference extends ExecutionReference<TResponse, TArgs>,
  TResponse,
  TArg,
  TArgs extends unknown[],
  TError extends Error,
>(
  referenceFn: ComposableBuilder<TReference, TResponse, TArgs>,
  action: Method<TResponse, [arg: TArg, ...args: TArgs]>,
  defaultConfig: ExecutionConfig<TResponse, TArgs, TError>,
  initialValue: TArg,
): ExecutionComposable<TResponse, TArgs> {
  return (config?: Partial<ExecutionConfig<TResponse, TArgs, TError>>) =>
    useFormReference(
      referenceFn,
      action,
      {
        ...defaultConfig,
        ...config,
      },
      initialValue,
    );
}
