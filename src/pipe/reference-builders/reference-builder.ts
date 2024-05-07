import { ExecutionReference } from "../../types";
import { ApiDeinition } from "../../types/api-definition";
import { Transformer } from "../../types/transformer";
import { ExecutionBuilder } from "../execution-builders/execution-builder";
import { computed, ref } from 'vue';

export class ReferenceBuilder<TI extends unknown[], TO, TE, TR extends ExecutionReference<TI, TO, TE>> {
    constructor(
        protected execution: ExecutionBuilder<TI, TO, TE>,
        protected transform: (executionReference: ExecutionReference<TI, TO, TE>) => TR,
    ) {

    }

    then<TRN extends TR, TTA extends unknown[]>(
        transform: Transformer<TR, TRN, TTA>,
        ...args: TTA
    ): ReferenceBuilder<TI, TO, TE, TRN> {
        return new ReferenceBuilder(this.execution, (r) => transform(this.transform(r), ...args));
    }

    build(): TR {
        const method = this.execution.method;
        const extension = this.execution.extensionBuilder.extension;
        const executing = ref(false);
        const executed = ref(false);
        const output = ref<TO>();
        const extensionProperties = extension.builder();
        async function execute(...args: TI): Promise<TO> {
            executing.value = true;
            const _output = Promise.resolve(method(...args)).then(_output => {
                executed.value = true;
                executing.value = false;
                output.value = _output;
                return _output;
            });
            extension.updater(extensionProperties, ...args);
            return await _output;
        }
        return this.transform({
            executing: computed(() => executing.value),
            executed: computed(() => executed.value),
            execute,
            output: computed(() => output.value),
            ...extensionProperties
        })
    }

    async(...args: TI): Promise<TO> {
        return Promise.resolve(this.execution.method(...args))
    }

    api(): ApiDeinition<[], TI, TO, TR> {
        return {
            async: this.async,
            composable: () => this.async,
            reference: this.build,
        }
    }
}
