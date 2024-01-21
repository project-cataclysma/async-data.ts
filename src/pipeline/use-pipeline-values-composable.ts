import { Method, ExecutionConfig, ExecutionReference } from "../types";
import { useValuesComposable } from "../composables";

export function usePipelineValuesComposable<
  TReference extends ExecutionReference<TResponse, [...pi: TPI, ...pf: TPF]>,
  TResponse,
  TPI extends unknown[],
  TPF extends unknown[],
>(
  referenceFn: (
    method: Method<TResponse, [...pi: TPI, ...pf: TPF]>,
    configuration: ExecutionConfig<TResponse, [...pi: TPI, ...pf: TPF]>,
  ) => TReference,
  method: Method<TResponse, [...pi: TPI, ...pf: TPF]>,
  defaultConfig?: ExecutionConfig<TResponse, [...pi: TPI, ...pf: TPF]>,
) {
  return (...pi: TPI) =>
    useValuesComposable(
      referenceFn,
      (...pf: TPF) => method(...pi, ...pf),
      defaultConfig,
    );
}
