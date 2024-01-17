import { useExecutionReference } from "../references";
import { ExecutionConfig } from "../types/configs";
import { ExecutionComposable } from "../types/composables";
import { Method } from "../types/method";

export function useExecutionComposable<
    TResponse,
    TArgs extends any[]
> (
    action: Method<TResponse, TArgs>,
    method: ExecutionConfig<TResponse, TArgs>
): ExecutionComposable<TResponse, TArgs> {
    return () => useExecutionReference(action, method);
}