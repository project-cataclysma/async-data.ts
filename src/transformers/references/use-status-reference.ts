import { ref, watch } from "vue";
import { StatusReferenceConfig } from "../../types/transformers/references/status-reference-config";
import { ExecutionReference } from "../../types/references/execution-reference";
import { ExecutionStatusType } from "../../types/transformers/references/status-type";
import { computed } from "@vue/reactivity";
import { StatusReference } from "../../types/transformers/references/status-reference";

export function useStatusReference<
    TReference extends ExecutionReference<TI, TO>,
    TI extends unknown[],
    TO,
    TR,
    TS,
    TE,
>(
    reference: TReference,
    transformerConfig: StatusReferenceConfig<TI, TO, TR, TS, TE>
): StatusReference<TReference, TI, TO, TR, TS, TE> {
    const result = ref<TR>();
    const status = ref<TS>();
    const error = ref<TE>();
    const statusType = computed(() => {
        if (error.value) return ExecutionStatusType.ERRORED;
        else if (status.value) return transformerConfig.getStatusType(status.value);
        else return ExecutionStatusType.PENDING;
    });
    const execute = (...args: TI) => reference.execute(...args)
        .then(o => {
            result.value = transformerConfig.getResult(o);
            status.value = transformerConfig.getStatus(o);
            error.value = transformerConfig.getError(o);
            return o;
        })
        .catch((e: TE) => {
            error.value = e
            return undefined;
        });
    return {
        ...reference,
        execute,
        error: computed(() => error.value),
        result: computed(() => result.value),
        status: computed(() => status.value),
        statusType
    }
}