import { Method } from "../types";
import { CacheableExecutionBuilder } from "./execution-builders";
import { ExecutionBuilder } from "./execution-builders/execution-builder";

export function usePipe<TI extends unknown[], TO>(method: Method<TI, TO>) {
    return new ExecutionBuilder(method);
}

export function usePipeAndCache<TI extends unknown[], TO>(method: Method<TI, TO>, cacheMethod: Method<TI, TO>) {
    return new CacheableExecutionBuilder(method, cacheMethod);
}