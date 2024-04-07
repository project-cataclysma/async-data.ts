import { ComposableBuilder } from "./composable-builder";
import { ReferenceBuilder } from "./reference-builder";

export class ExecutionBuilder<TI extends unknown[], TO> {
    constructor(
        public execute: (...args: TI) => TO,
    ) {

    }

    with<TIN extends unknown[]>(
        transformation: (execute: (...args: TI) => TO) => ((...args: TIN) => TO),
    ): ExecutionBuilder<TIN, TO> {
        return new ExecutionBuilder(transformation(this.execute));
    }

    composable<TCN extends unknown[], TEN extends unknown[]>(
        transformation: (
            execute: (...args: TI) => TO
        ) => ((...args: [...cargs: TCN, ...targs: TEN]) => TO),
    ): ComposableBuilder<TCN, TEN, TO> {
        return new ComposableBuilder(this.with(transformation));
    }

    reference(): ReferenceBuilder<TI, TO> {
        return new ReferenceBuilder(this);
    }

    build() {
        return this.reference().build();
    }
}