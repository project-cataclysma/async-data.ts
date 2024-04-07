import { ExecutionBuilder } from "./execution-builder";
import { computed, ref } from 'vue';

export class ReferenceBuilder<TI extends unknown[], TO> {
    constructor(
        protected execution: ExecutionBuilder<TI, TO>
    ) {

    }

    then<TR extends ReferenceBuilder<TI, TO>>(
        transform: (reference: this) => TR
    ): TR {
        return transform(this);
    }

    build() {
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
        return {
            executing: computed(() => executing.value),
            executed: computed(() => executing.value),
            execute,
            output,
        }
    }
}