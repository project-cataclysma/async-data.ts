import { ExecutionReference, Method } from "../../types";
import { SyncMethod } from "../../types/methods";
import { MethodTransformer } from "../../types/methods/method-transformer";
import { ComposableBuilder } from "../composable-builder";
import { ReferenceBuilder } from "../reference-builders/reference-builder";

export class ExecutionBuilder<TI extends unknown[], TO> {
    /**
     * @param method the method to be referenced
     */
    constructor(
        public method: Method<TI, TO>,
        protected transform: <TR extends ExecutionReference<TI, TO>>(executionReference: TR) => TR = r => r,
    ) {

    }

    /**
     * @deprecated this is an experimental snippet of code. Likely to be removed
     * @param transformation 
     * @param builder 
     * @param bargs 
     * @returns 
     */
    withBuilder<TIN extends unknown[], TBA extends unknown[], TB extends ExecutionBuilder<TIN, TO>, TTA extends unknown[]>(
        transformation: MethodTransformer<TI, TO, TIN, TO, TTA>,
        builder: new (method: Method<TIN, TO>, ...args: TBA) => TB,
        ...bargs: TBA
    ): SyncMethod<TTA, TB> {
        return (...targs: TTA) => new builder(transformation(this.method, ...targs), ...bargs);
    }

    with<TIN extends unknown[], TON, TTA extends unknown[]>(
        transformation: MethodTransformer<TI, TO, TIN, TON, TTA>,
        ...args: TTA
    ): ExecutionBuilder<TIN, TON> {
        // return this.withBuilder(transformation, ExecutionBuilder)(...args);
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
        return new ReferenceBuilder(this, this.transform);
    }

    build() {
        return this.reference().build();
    }
}