import { ref, computed } from "vue";
import { ExecutionReference } from "..";
import { Execution } from "../types/reference-builder/execution";
import { ExecutionReferenceBuilderConfig } from "../types/reference-builder/execution-reference-builder-config";
import { ExecutionState } from "../types/execution-state";

export function useExecutionReference<TI extends unknown[], TO>(
    execution: Execution<TI, TO>,
    config?: ExecutionReferenceBuilderConfig<TI, TO>
): ExecutionReference<TI, TO> {
    const executing = ref(false);
    const executed = ref(false);
    const output = ref<TO>();
    const execute = async (...args: TI) => {
        executing.value = true;
        return Promise.resolve(execution(...args)).then(o => {
            executed.value = true;
            output.value = o;
            return o;
        });
    }
    const state = computed(() => executed.value
        ? executing.value ? ExecutionState.REEXECUTING : ExecutionState.EXECUTED
        : executing.value ? ExecutionState.EXECUTING : ExecutionState.PENDING
    );
    return {
        execute,
        executed: computed(() => executed.value),
        executing: computed(() => executing.value),
        output: computed(() => output.value),
        state,
    }
}