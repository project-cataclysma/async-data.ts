import { watchEffect } from "vue";
import { ExecutionReference } from "../types";

export function watchedReferenceTransformer<TO, TE, TR extends ExecutionReference<[], TO, TE>>(
    executionReference: TR,
): TR {
    watchEffect(executionReference.execute);
    return executionReference;
}
