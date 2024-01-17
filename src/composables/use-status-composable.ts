import { useStatusReference } from "../references";
import { StatusComposable } from "../types";
import { StatusConfig } from "../types/configs";
import { Method } from "../types/method";
import { ExecuitonReference } from "../types/references";

export function useStatusComposable<
    TConfig extends StatusConfig<TResult, TResponse, TArgs, TError>,
    TResult,
    TReference extends ExecuitonReference<TResponse, TArgs>,
    TResponse, TArgs extends any[],
    TError extends Error
>(
    referenceFn: (method: Method<TResponse, TArgs>, configuration: StatusConfig<TResult, TResponse, TArgs>) => TReference,
    action: Method<TResponse, TArgs>,
    defaultConfig: TConfig
): StatusComposable<TConfig, TResult, TReference, TResponse, TArgs, TError> {
    return (config?: Partial<TConfig>) => useStatusReference(referenceFn, action, {
        ...defaultConfig,
        ...config,
    });
}