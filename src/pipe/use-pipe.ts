import { ExecutionReference, Method } from "../types";
import { CacheableExecutionBuilder } from "./execution-builders";
import { ExecutionBuilder } from "./execution-builders/execution-builder";

export function usePipe<TI extends unknown[], TO>(
    method: Method<TI, TO>,
    transform: <TR extends ExecutionReference<TI, TO>>(executionReference: TR) => TR = r => r,
) {
    return new ExecutionBuilder(method, transform);
}

export function usePipeAndCache<TI extends unknown[], TO>(method: Method<TI, TO>, cacheMethod: Method<TI, TO>) {
    return new CacheableExecutionBuilder(method, cacheMethod);
}
