import { ExecutionReference } from "../types";
import { ExecutionBuilder } from "./execution-builder";
import { computed, ref } from 'vue';

export class ReferenceBuilder<TI extends unknown[], TO, TR extends ExecutionReference<TI, TO>> {
    constructor(
        protected execution: ExecutionBuilder<TI, TO>,
        protected transform: (executionReference: ExecutionReference<TI, TO>) => TR,
    ) {

    }

    then<TTA extends unknown[], TRN extends TR> (
        transform: (executionReference: TR, ...args: TTA) => TRN,
        ...args: TTA
    ): ReferenceBuilder<TI, TO, TRN> {
        return new ReferenceBuilder(this.execution, (r) => transform(this.transform(r), ...args));
    }

    build(): TR {
        const method = this.execution.execute;
        const executing = ref(false);
        const executed = ref(false);
        const output = ref<TO>();
        async function execute (...args: TI): Promise<TO> {
            executing.value = true;
            return Promise.resolve(method(...args)).then(_output => {
                executed.value = true;
                executing.value = false;
                output.value = _output;
                return _output;
            });
        }
        return this.transform({
            executing: computed(() => executing.value),
            executed: computed(() => executed.value),
            execute,
            output,
        })
    }
}