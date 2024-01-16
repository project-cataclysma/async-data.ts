import { useExecutionReference } from "../../references";
import { ExecutionConfig } from "../configs";
import { Method } from "../method";

export function useExecutionComposable<
    TResponse,
    TArgs extends any[]
>(
    action: Method<TResponse, TArgs>,
    method: ExecutionConfig<TResponse, TArgs>
) {
    return () => useExecutionReference(action, method);
}