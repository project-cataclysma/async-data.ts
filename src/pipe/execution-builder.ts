import { ExecutionReference } from "../types";
import { ComposableBuilder } from "./composable-builder";
import { ReferenceBuilder } from "./reference-builder";

export class ExecutionBuilder<TI extends unknown[], TO> {
    constructor(
        public execute: (...args: TI) => Promise<TO> | TO,
    ) {

    }

    with<TIN extends unknown[]>(
        transformation: (execute: (...args: TI) => TO | Promise<TO>) => ((...args: TIN) => TO | Promise<TO>),
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

    composableAll(): ComposableBuilder<TI, [], TO> {
        return new ComposableBuilder(this.with(exec => exec));
    }

    reference(): ReferenceBuilder<TI, TO, ExecutionReference<TI, TO>> {
        return new ReferenceBuilder(this, (r) => r);
    }

    build() {
        return this.reference().build();
    }
}