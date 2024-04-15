import { computed } from "vue";
import { ExecutionReference, StatusReference } from "../types";
import { StatusTransformerConfig } from "../types/configurations/status-transformer-config";

export function statusReferenceTransformer<TI extends unknown[], TO, TR extends ExecutionReference<TI, TO>, TF>(
    executionReference: TR,
    config: StatusTransformerConfig<TO, TF>,
): StatusReference<TI, TO, TR, TF> {
    return {
        ...executionReference,
        result: computed(() => config.getResult ? config.getResult(executionReference.output.value): undefined),
    }
}