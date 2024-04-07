import { computed } from "vue";
import { ExecutionReference, StatusReference } from "../types";

export function statusReferenceTransformer<TI extends unknown[], TO, TR extends ExecutionReference<TI, TO>, TF>(
    reference: TR,
): StatusReference<TI, TO, TR, TF> {
    return {
        ...reference,
        result: computed(() => undefined)
    }
}