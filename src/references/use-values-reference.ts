import { MaybeRef, Ref, ref, toValue } from "vue";
import { Method, ExecuitonReference, ExecutionConfig } from "../types";

export function useValuesReference<
    TReference extends ExecuitonReference<TResponse, TArgs>,
    TResponse,
    TArg extends any[],
    TArgs extends any[],
>(
    referenceFn: (method: Method<TResponse, TArgs>, configuration: ExecutionConfig<TResponse, TArgs>) => TReference,
    method: Method<TResponse, [...arg: TArg, ...args: TArgs]>,
    ...arg: TArg
): ExecuitonReference<TResponse, TArgs> {
    const reference = referenceFn((...args: TArgs) => method(...arg, ...args), { });
    return reference;
}