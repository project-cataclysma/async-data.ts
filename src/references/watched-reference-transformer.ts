import { watchEffect } from "vue";
import { ExecutionReference } from "../types";

export function watchedReferenceTransformer<TO, TR extends ExecutionReference<[], TO>>(
    executionReference: TR,
): TR {
    watchEffect(executionReference.execute);
    return executionReference;
}