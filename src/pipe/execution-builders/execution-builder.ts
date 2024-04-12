import { ExecutionReference, Method } from "../../types";
import { MethodTransformer } from "../../types/methods/method-transformer";
import { ComposableBuilder } from "../composable-builder";
import { ReferenceBuilder } from "../reference-builder";

export class ExecutionBuilder<TI extends unknown[], TO> {
    /**
     * @param method the method to be referenced
     */
    constructor(
        public method: Method<TI, TO>,
    ) {

    }

    with<TIN extends unknown[], TTA extends unknown[]>(
        transformation: MethodTransformer<TI, TO, TIN, TO, TTA>,
        ...args: TTA
    ): ExecutionBuilder<TIN, TO> {
        return new ExecutionBuilder(transformation(this.method, ...args));
    }

    composable<TCN extends unknown[], TEN extends unknown[], TTA extends unknown[]>(
        transformation: MethodTransformer<TI, TO, [...cargs: TCN, ...targs: TEN], TO, TTA>,
        ...args: TTA
    ): ComposableBuilder<TCN, TEN, TO> {
        return new ComposableBuilder(this.with(transformation, ...args));
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