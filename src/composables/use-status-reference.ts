import { Ref, ref } from "vue";
import { Method, MethodReference, StatusReference } from "../types";
import { StatusConfig } from "../types/configurations/status-config";
import { ExecutionStatus } from "../types/status";
import { ExecutionStatusType } from "../types/status-type";

export function useStatusReference<TResult, TReference extends MethodReference<TResponse, TArgs>, TResponse, TArgs extends any[], TError extends Error>(
    referenceFn: (method: Method<TResponse, TArgs>, configuration: StatusConfig<TResult, TResponse, TArgs>) => TReference,
    method: Method<TResponse, TArgs>,
    configuration?: StatusConfig<TResult, TResponse, TArgs, TError>,
): StatusReference<TResult, TReference, TResponse, TArgs, TError> {
    configuration ??= {}
    const initialResult: TResult | null = configuration.initialResult ?? null;
    const error = ref<TError | null>(null) as Ref<TError | null>;
    const status = ref<ExecutionStatus | null>(null);
    const result = ref<TResult | null>(initialResult) as Ref<TResult | null>;
    const oldSuccessCallback = configuration.onSuccess;
    const oldErrorCallback = configuration.onError;

    configuration.onError = async (err: TError, ...args: TArgs) => {
        if(oldErrorCallback) {
            await Promise.resolve(oldErrorCallback(err, ...args));
        }
        error.value = err;
    }

    configuration.onSuccess = async (response: TResponse, ...args: TArgs) => {
        if (configuration.getResult) {
            Promise.resolve(configuration.getResult(response)).then((r: TResult) => {
                result.value = r;
            });
        }
        if (configuration.getStatus) {
            Promise.resolve(configuration.getStatus(response)).then(async (s: ExecutionStatus) => {
                status.value = s;
                if(s.type === ExecutionStatusType.Successful) {
                    if (oldSuccessCallback) {
                        await Promise.resolve(oldSuccessCallback(response, ...args));
                    }
                } else if (s.type === ExecutionStatusType.Failed) {
                    if (configuration.onFailure) {
                        await Promise.resolve(configuration.onFailure(s, response, ...args));
                    }
                }
                return s;
            })
        }
        if (configuration.getError) {
            Promise.resolve(configuration.getError(response)).then((e: TError) => {
                error.value = e;
                if (configuration.onError) {
                    configuration.onError(e, ...args);
                }
            })
        }
    }

    const reference = referenceFn(method, configuration);
    return {
        error,
        status,
        result,
        ...reference,
    }
}