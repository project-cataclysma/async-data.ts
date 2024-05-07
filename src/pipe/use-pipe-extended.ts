import { ExecutionReference, Method } from "../types";
import { Extension } from "../types/extensions/extension";
import { CacheableExecutionBuilder } from "./execution-builders";
import { ExecutionBuilder } from "./execution-builders/execution-builder";
import { ExtensionBuilder } from "./extension-builders/extensions-builder";

export function usePipeWithExtension<TI extends unknown[], TO, TE>(
    method: Method<TI, TO>,
    extension: Extension<TI, TE>,
    transform: <TR extends ExecutionReference<TI, TO>>(executionReference: TR) => TR = r => r,
) {
    return new ExecutionBuilder(method, new ExtensionBuilder(extension), transform);
}

export function usePipeAndCache<TI extends unknown[], TO>(method: Method<TI, TO>, cacheMethod: Method<TI, TO>) {
    return new CacheableExecutionBuilder(method, cacheMethod);
}
