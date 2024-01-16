import { useStatusReference } from "../../composables";
import { StatusConfig } from "../configs";
import { Method } from "../method";
import { ExecuitonReference } from "../references";

export function useStatusComposable<
    TResult,
    TReference extends ExecuitonReference<TResponse, TArgs>,
    TResponse, TArgs extends any[],
    TError extends Error
>(
    referenceFn: (method: Method<TResponse, TArgs>, configuration: StatusConfig<TResult, TResponse, TArgs>) => TReference,
    action: Method<TResponse, TArgs>,
    method: StatusConfig<TResult, TResponse, TArgs, TError>
) {
    return () => useStatusReference(referenceFn, action, method);
}