import { ExecutionReference } from "../types";
import { ComposableReferenceBuilder } from "./composable-reference-builder";
import { ExecutionBuilder } from "./execution-builder";
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

    apply<TCN extends unknown[], TEN extends unknown[]>(
        transformation: (execution: ExecutionBuilder<[...tc: TC, ...te: TE], TO>) => (ExecutionBuilder<[...tcn: TCN, ...ten: TEN], TO>),
    ): ComposableBuilder<TCN, TEN, TO> {
        return new ComposableBuilder(transformation(this.execution));
    }

    with<TCN extends unknown[], TEN extends unknown[]>(
        transformation: (execute: (...args: [...tc: TC, ...te: TE]) => TO) => ((...args: TEN) => TO),
    ): ComposableBuilder<TCN, TEN, TO> {
        return this.apply((execution) => execution.with(transformation));
    }

    withAll(): ComposableBuilder<[...tc: TC, ...te: TE], [], TO> {
        return this.with<[...tc: TC, ...te: TE], []>(exec => exec);
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