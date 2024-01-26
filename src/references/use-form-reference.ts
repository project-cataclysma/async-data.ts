import { Ref, ref } from "vue";
import {
  Method,
  ExecutionReference,
  ExecutionConfig,
  FormReference,
} from "../types";

export function useFormReference<
  TReference extends ExecutionReference<TResponse, TArgs>,
  TResponse,
  TArg,
  TArgs extends unknown[],
>(
  referenceFn: (
    method: Method<TResponse, TArgs>,
    configuration: ExecutionConfig<TResponse, TArgs>,
  ) => TReference,
  method: Method<TResponse, [arg: TArg, ...args: TArgs]>,
  configuration: ExecutionConfig<TResponse, TArgs>,
  initialValue: TArg,
): FormReference<TReference, TResponse, TArg, TArgs> {
  const form = ref(initialValue) as Ref<TArg>;
  const reference = referenceFn(
    (...args: TArgs) => method(form.value, ...args),
    configuration,
  );
  return {
    ...reference,
    form,
  };
}