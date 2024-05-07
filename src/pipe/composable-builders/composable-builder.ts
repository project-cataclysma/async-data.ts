import { ExecutionReference } from "../../types";
import { MethodTransformer } from "../../types/methods/method-transformer";
import { Transformer } from "../../types/transformer";
import { ComposableReferenceBuilder } from "../reference-builders/composable-reference-builder";
import { ExecutionBuilder } from "../execution-builders/execution-builder";
import { FormComposableBuilder } from "./form-composable-builder";

export class ComposableBuilder<
    TC extends unknown[],
    TE extends unknown[],
    TO,
    TEP = object
> {
    constructor(
        public execution: ExecutionBuilder<[...tc: TC, ...te: TE], TO, TEP>,
    ) {
    }

    apply<TCN extends unknown[], TEN extends unknown[], TTA extends unknown[]>(
        transformation: Transformer<ExecutionBuilder<[...tc: TC, ...te: TE], TO, TEP>, ExecutionBuilder<[...tcn: TCN, ...ten: TEN], TO, TEP>, TTA>,
        ...args: TTA
    ): ComposableBuilder<TCN, TEN, TO, TEP> {
        return new ComposableBuilder(transformation(this.execution, ...args));
    }

    with<TCN extends unknown[], TEN extends unknown[], TTA extends unknown[]>(
        transformation: MethodTransformer<[...tc: TC, ...te: TE], TO, TEN, TO, TTA>,
        extensionTransformation: MethodTransformer<[...tc: TC, ...te: TE], TEP, TEN, TEP, TTA>,
        ...args: TTA
    ): ComposableBuilder<TCN, TEN, TO, TEP> {
        return this.apply((execution, ...ttargs: TTA) => execution.with(transformation, extensionTransformation, ...ttargs), ...args);
    }

    withAll(): ComposableBuilder<[...tc: TC, ...te: TE], [], TO, TEP> {
        return this.with<[...tc: TC, ...te: TE], [], []>(exec => exec, exec => exec);
    }

    form() {
        return new FormComposableBuilder(this.execution)
    }

    reference(): ComposableReferenceBuilder<TC, TE, TO, TEP, ExecutionReference<TE, TO, TEP>> {
        return new ComposableReferenceBuilder(this.execution, r => r);
    }

    build() {
        return (new ComposableReferenceBuilder(this.execution, r => r)).build();
    }
}
