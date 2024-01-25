import { MaybeRef, toValue } from "vue";
import { ExecutionConfig, ExecutionReference, Method } from "../types";
import { PipelineValueComposable } from "../types/pipeline/pipeline-value-composable";
import { usePipeline } from ".";

export function usePipelineValueComposable<
  TReference extends ExecutionReference<TResponse, PN>,
  TResponse,
  P1,
  PN extends unknown[],
>(
  referenceFn: (
    method: Method<TResponse, PN>,
    configuration: ExecutionConfig<TResponse, PN>,
  ) => TReference,
  method: Method<TResponse, [p1: P1, ...args: PN]>,
  defaultConfig?: ExecutionConfig<TResponse, PN>,
): PipelineValueComposable<TResponse, P1, PN> {
  return (arg: MaybeRef<P1>) =>
    usePipeline(
      referenceFn,
      (...args: PN) => method(toValue(arg), ...args),
      defaultConfig,
    );
}
