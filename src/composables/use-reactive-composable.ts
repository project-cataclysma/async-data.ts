import { MaybeRef } from "vue";
import { useReactiveReference } from "../references";
import { ExecutionComposable } from "../types";
import { ExecutionConfig } from "../types/configs";
import { Method } from "../types/method";
import { ExecutionReference } from "../types/references";

export function useReactiveComposable<
  TReference extends ExecutionReference<TResponse, TArgs>,
  TResponse,
  TArg,
  TArgs extends unknown[],
  TError extends Error,
>(
  referenceFn: (
    method: Method<TResponse, TArgs>,
    configuration: ExecutionConfig<TResponse, TArgs>,
  ) => TReference,
  action: Method<TResponse, [arg: TArg, ...args: TArgs]>,
  defaultConfig: ExecutionConfig<TResponse, TArgs, TError>,
  arg: MaybeRef<TArg>,
): ExecutionComposable<TResponse, TArgs> {
  return (config?: Partial<ExecutionConfig<TResponse, TArgs, TError>>) =>
    useReactiveReference(
      referenceFn,
      action,
      {
        ...defaultConfig,
        ...config,
      },
      arg,
    );
}
