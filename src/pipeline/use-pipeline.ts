import {
  ExecutionReference,
  ExecutionConfig,
  Method,
  Pipeline,
} from "../types";
import { isMethodWithParameters } from "../types/method/method-with-parameters";
import { usePipelineValuesComposable } from "./use-pipeline-values-composable";
import { usePipelineExecuteComposable } from "./use-pipeline-execute-composable";
import { usePipelineStatusComposable } from "./use-pipeline-status-composable";
import { usePipelineGetComposable } from "./use-pipeline-get-composable";
import { usePipelineValueComposable } from "./use-pipeline-value-composable";
import { usePipelineFormComposable } from "./use-pipeline-form-composable";
import { usePipelineReactiveComposable } from "./use-pipeline-reactive-composable";

export function usePipeline<
  TReference extends ExecutionReference<TResponse, TArgs>,
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
  const get = usePipelineGetComposable(referenceFn, method, defaultConfig);
  const execute = usePipelineExecuteComposable(
    referenceFn,
    method,
    defaultConfig,
  );
  const status = usePipelineStatusComposable(
    referenceFn,
    method,
    defaultConfig,
  );

  if (isMethodWithParameters(method)) {
    const reactive = usePipelineReactiveComposable(
      referenceFn,
      method,
      defaultConfig,
    );
    const value = usePipelineValueComposable(
      referenceFn,
      method,
      defaultConfig,
    );
    const form = usePipelineFormComposable(referenceFn, method, defaultConfig);
    const values = usePipelineValuesComposable(
      referenceFn,
      method,
      defaultConfig,
    );
    return {
      execute,
      form,
      get,
      reactive,
      status,
      value,
      values,
    } as Pipeline<TReference, TResponse, TArgs>;
  } else {
    return {
      execute,
      get,
      status,
    } as Pipeline<TReference, TResponse, TArgs>;
  }
}
