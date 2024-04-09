import { MaybeRefOrGetter, Ref, toValue } from "vue";
import { ExecutionReference } from "../types";
import { ComposableReferenceBuilder } from "./composable-reference-builder";
import { ExecutionBuilder } from "./execution-builder";
import { FormReference } from "../types/references/form-reference";

export class FormComposableBuilder<
    TF,
    TC extends unknown[],
    TE extends unknown[],
    TO,
> {
    constructor(
        public execution: ExecutionBuilder<[tf: TF, ...tc: TC, ...te: TE], TO>,
    ) {
    }

    reference(tf: Ref<TF>): ComposableReferenceBuilder<TC, TE, TO, FormReference<TE, TO, ExecutionReference<TE, TO>, TF>> {
        return new ComposableReferenceBuilder(this.execution.with(exec => (...args: [...tc: TC, ...te: TE]) => exec(toValue(tf), ...args)), r => ({
            ...r,
            form: tf,
        }));
    }
    
    build(tf: Ref<TF>) {
        return (new ComposableReferenceBuilder(this.execution.with(exec => (...args: [...tc: TC, ...te: TE]) => exec(toValue(tf), ...args)), r => ({ ...r, form: tf }))).build();
    }
}