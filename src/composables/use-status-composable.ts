import { useStatusReference } from "../references";
import { StatusComposable } from "../types";
import { StatusConfig } from "../types/configs";
import { Method } from "../types/method";
import { ExecuitonReference } from "../types/references";

export function useStatusComposable<
    TResult,
    TReference extends ExecuitonReference<TResponse, TArgs>,
    TResponse, TArgs extends any[],
    TError extends Error
>(
    referenceFn: (method: Method<TResponse, TArgs>, configuration: StatusConfig<TResult, TResponse, TArgs>) => TReference,
    action: Method<TResponse, TArgs>,
    method: StatusConfig<TResult, TResponse, TArgs, TError>
): StatusComposable<TResult, TReference, TResponse, TArgs> {
    return () => useStatusReference(referenceFn, action, method);
}