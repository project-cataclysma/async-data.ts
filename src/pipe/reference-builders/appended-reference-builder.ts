import { computed, ref } from "vue";
import { Method } from "../../types";
import { AppendedExecutionReference } from "../../types/references/appended-execution-reference";
import { Transformer } from "../../types/transformer";
import { ExecutionBuilder } from "../execution-builders";
import { ReferenceBuilder } from "./reference-builder";

export class AppendedReferenceBuilder<TI extends unknown[], TO, TEP, TR extends AppendedExecutionReference<TI, TO, TEP>> extends ReferenceBuilder<TI, TO, TR> {
    constructor(
        protected execution: ExecutionBuilder<TI, TO>,
        protected extendedPropsBuilder: Method<TI, TEP>,
        protected transform: (executionReference: AppendedExecutionReference<TI, TO, TEP>) => TR,
    ) {
        super(execution, transform)
    }

    then<TRN extends TR, TTA extends unknown[]>(
        transform: Transformer<TR, TRN, TTA>,
        ...args: TTA
    ): ReferenceBuilder<TI, TO, TRN> {
        return new ReferenceBuilder(this.execution, (r) => transform(this.transform(r), ...args));
    }

    build(): TR {
        const method = this.execution.method;
        const executing = ref(false);
        const executed = ref(false);
        const output = ref<TO>();
        async function extendedProps(...args: TI): Promise<TEP> {
            return Promise.resolve(this.extendedPropsBuilder(...args))
        }
        async function execute(...args: TI): Promise<TO> {
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