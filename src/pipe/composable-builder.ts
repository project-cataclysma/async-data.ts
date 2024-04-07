import { ExecutionReference } from "../types";
import { ComposableReferenceBuilder } from "./composable-reference-builder";
import { ExecutionBuilder } from "./execution-builder";
import { ReferenceBuilder } from "./reference-builder";

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
        this
        return new ComposableBuilder(transformation(this.execution));
    }

    with<TCN extends unknown[], TEN extends unknown[]>(
        transformation: (execute: (...args: [...tc: TC, ...te: TE]) => TO) => ((...args: TEN) => TO),
    ): ComposableBuilder<TCN, TEN, TO> {
        return this.apply((execution) => execution.with(transformation));
    }

    reference(): ComposableReferenceBuilder<TC, TE, TO, ExecutionReference<TE, TO>> {
        return new ComposableReferenceBuilder(this.execution, r => r);
    }
    
    build() {
        return (new ComposableReferenceBuilder(this.execution, r => r)).build();
    }
}