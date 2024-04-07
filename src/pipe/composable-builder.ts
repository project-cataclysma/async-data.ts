import { ExecutionReference } from "../types";
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

    reference(): (...cargs: TC) => ReferenceBuilder<TE, TO, ExecutionReference<TE, TO>> {
        return (...cargs: TC) => this.execution
            .with(exec => (...eargs: TE) => exec(...cargs, ...eargs))
            .reference();
    }

    build() {
        return (...cargs: TC) => this.execution
            .with(exec => (...eargs: TE) => exec(...cargs, ...eargs))
            .reference()
            .build();
    }
}