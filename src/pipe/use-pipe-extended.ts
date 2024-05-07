import { ExecutionReference, Method } from "../types";
import { Extension } from "../types/extensions/extension";
import { CacheableExecutionBuilder } from "./execution-builders";
import { ExecutionBuilder } from "./execution-builders/execution-builder";
import { ExtensionBuilder } from "./extension-builders/extensions-builder";

export function usePipeWithExtension<TI extends unknown[], TO, TE>(
    method: Method<TI, TO>,
    extension: Extension<TI, TE>,
    transform: <TR extends ExecutionReference<TI, TO, TE>>(executionReference: TR) => TR = r => r,
) {
    return new ExecutionBuilder(method, new ExtensionBuilder(extension), transform);
}

export function usePipeAndCacheExtended<TI extends unknown[], TO, TE>(
    method: Method<TI, TO>,
    extensionBuilder: Extension<TI, TE>,
    cacheMethod: Method<TI, TO>
) {
    return new CacheableExecutionBuilder(method, new ExtensionBuilder(extensionBuilder), cacheMethod);
}
