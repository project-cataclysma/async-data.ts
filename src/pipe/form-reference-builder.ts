import { ExecutionReference } from "../types";
import { ApiDeinition } from "../types/api-definition";
import { computed, ref } from 'vue';
import { ReferenceBuilder } from "./reference-builder";
import { ExecutionBuilder } from "./execution-builder";

export class FormReferenceBuilder<
    TF,
    TA extends unknown[],
    TO,
    TR extends ExecutionReference<TA, TO>
> {
    constructor(
        protected execution: ExecutionBuilder<[tf: TF, ...args: TA], TO>,
        protected transform: (executionReference: ExecutionReference<TA, TO>) => TR,
    ) {

    }

    build(): TR {
        const form = ref<TF>()
        const method = this.execution.with(
            (exec) => (...args: TA) => exec(form.value, ...args)
        ).execute;
        const executing = ref(false);
        const executed = ref(false);
        const output = ref<TO>();
        async function execute (...args: TA): Promise<TO> {
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
            output: computed(() => output.value),
        })
    }

    async(...args: [tf: TF, ...args: TA]): Promise<TO> {
        return Promise.resolve(this.execution.execute(...args))
    }

    api(): ApiDeinition<[], [tf: TF, ...args: TA], TO, TR> {
        return {
            async: this.async,
            composable: () => this.async,
            reference: this.build,
        }
    }
}