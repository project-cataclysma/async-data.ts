import { ExecutionReference } from "../types";
import { MethodTransformer } from "../types/methods/method-transformer";
import { Transformer } from "../types/transformer";
import { ComposableReferenceBuilder } from "./composable-reference-builder";
import { ExecutionBuilder } from "./execution-builders/execution-builder";
import { FormComposableBuilder } from "./form-composable-builder";

export class ComposableBuilder<
    TC extends unknown[],
    TE extends unknown[],
    TO,
> {
    constructor(
        public execution: ExecutionBuilder<[...tc: TC, ...te: TE], TO>,
    ) {
    }

    apply<TCN extends unknown[], TEN extends unknown[], TTA extends unknown[]>(
        transformation: Transformer<ExecutionBuilder<[...tc: TC, ...te: TE], TO>, ExecutionBuilder<[...tcn: TCN, ...ten: TEN], TO>, TTA>,
        ...args: TTA
    ): ComposableBuilder<TCN, TEN, TO> {
        return new ComposableBuilder(transformation(this.execution, ...args));
    }

    with<TCN extends unknown[], TEN extends unknown[], TTA extends unknown[]>(
        transformation: MethodTransformer<[...tc: TC, ...te: TE], TO, TEN, TO, TTA>,
        ...args: TTA
    ): ComposableBuilder<TCN, TEN, TO> {
        return this.apply((execution, ...ttargs: TTA) => execution.with(transformation, ...ttargs), ...args);
    }

    withAll(): ComposableBuilder<[...tc: TC, ...te: TE], [], TO> {
        return this.with<[...tc: TC, ...te: TE], [], []>(exec => exec);
    }

    form() {
        return new FormComposableBuilder(this.execution)
    }

    reference(): ComposableReferenceBuilder<TC, TE, TO, ExecutionReference<TE, TO>> {
        return new ComposableReferenceBuilder(this.execution, r => r);
    }

    build() {
        return (new ComposableReferenceBuilder(this.execution, r => r)).build();
    }
}