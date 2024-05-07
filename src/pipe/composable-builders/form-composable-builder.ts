import { Ref, toValue } from "vue";
import { ExecutionReference } from "../../types";
import { ComposableReferenceBuilder } from "../reference-builders/composable-reference-builder";
import { ExecutionBuilder } from "../execution-builders/execution-builder";
import { FormReference } from "../../types/references/form-reference";

export class FormComposableBuilder<
    TF,
    TC extends unknown[],
    TE extends unknown[],
    TO,
    TEP
> {
    constructor(
        public execution: ExecutionBuilder<[tf: TF, ...tc: TC, ...te: TE], TO, TEP>,
    ) {
    }

    reference(tf: Ref<TF>): ComposableReferenceBuilder<TC, TE, TO, TEP, FormReference<TE, TO, TEP, ExecutionReference<TE, TO, TEP>, TF>> {
        return new ComposableReferenceBuilder(
            this.execution.with(
                exec => (...args: [...tc: TC, ...te: TE]) => exec(toValue(tf), ...args),
                exec => (...args: [...tc: TC, ...te: TE]) => exec(toValue(tf), ...args),
            ), r => ({
                ...r,
                form: tf,
            })
        );
    }

    build(tf: Ref<TF>) {
        return (new ComposableReferenceBuilder(
            this.execution.with(
                exec => (...args: [...tc: TC, ...te: TE]) => exec(toValue(tf), ...args),
                exec => (...args: [...tc: TC, ...te: TE]) => exec(toValue(tf), ...args),
            ),
            r => ({ ...r, form: tf })
        )).build();
    }
}
