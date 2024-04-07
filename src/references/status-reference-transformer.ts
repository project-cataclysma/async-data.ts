import { computed } from "vue";
import { ExecutionReference, StatusReference } from "../types";

export function statusReferenceTransformer<TI extends unknown[], TO, TR extends ExecutionReference<TI, TO>, TF>(
    executionReference: TR,
    getResult: (output: TO) => TF
): StatusReference<TI, TO, TR, TF> {
    return {
        ...executionReference,
        result: computed(() => getResult(executionReference.output.value)),
    }
}