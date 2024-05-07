import { ExecutionReference, Method } from "../../types";
import { SyncMethod } from "../../types/methods";
import { MethodTransformer } from "../../types/methods/method-transformer";
import { ComposableBuilder } from "../composable-builders/composable-builder";
import { ExtensionBuilder } from "../extension-builders/extensions-builder";
import { ReferenceBuilder } from "../reference-builders/reference-builder";

export class ExecutionBuilder<TI extends unknown[], TO, TE = object> {
    /**
     * @param method the method to be referenced
     */
    constructor(
        public method: Method<TI, TO>,
        public extensionBuilder: ExtensionBuilder<TI, TE>,
        protected transform: <TR extends ExecutionReference<TI, TO, TE>>(executionReference: TR) => TR = r => r,
    ) {

    }

    /**
     * @deprecated this is an experimental snippet of code. Likely to be removed
     * @param transformation 
     * @param builder 
     * @param bargs 
     * @returns 
     */
    withBuilder<TIN extends unknown[], TON, TBA extends unknown[], TB extends ExecutionBuilder<TIN, TON>, TTA extends unknown[]>(
        transformation: MethodTransformer<TI, TO, TIN, TON, TTA>,
        builder: new (method: Method<TIN, TON>, ...args: TBA) => TB,
        ...bargs: TBA
    ): SyncMethod<TTA, TB> {
        return (...targs: TTA) => new builder(transformation(this.method, ...targs), ...bargs);
    }

    with<TIN extends unknown[], TTA extends unknown[]>(
        transformation: MethodTransformer<TI, TO, TIN, TO, TTA>,
        extensionTransformation: MethodTransformer<TI, TE, TIN, TE, TTA>,
        ...args: TTA
    ): ExecutionBuilder<TIN, TO, TE> {
        // return this.withBuilder(transformation, ExecutionBuilder)(...args);
        const extensionBuilder = this.extensionBuilder.with(extensionTransformation, ...args);
        return new ExecutionBuilder(transformation(this.method, ...args), extensionBuilder);
    }

    composable<TCN extends unknown[], TEN extends unknown[], TTA extends unknown[]>(
        transformation: MethodTransformer<TI, TO, [...cargs: TCN, ...targs: TEN], TO, TTA>,
        extensionTransformation: MethodTransformer<TI, TE, [...cargs: TCN, ...targs: TEN], TE, TTA>,
        ...args: TTA
    ): ComposableBuilder<TCN, TEN, TO, TE> {
        return new ComposableBuilder(this.with(transformation, extensionTransformation, ...args));
    }

    composableAll(): ComposableBuilder<TI, [], TO, TE> {
        return new ComposableBuilder(this.with(exec => exec, exec => exec));
    }

    reference(): ReferenceBuilder<TI, TO, TE, ExecutionReference<TI, TO, TE>> {
        return new ReferenceBuilder(this, this.transform);
    }

    build() {
        return this.reference().build();
    }
}
