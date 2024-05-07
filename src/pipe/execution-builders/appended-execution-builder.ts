import { ExecutionReference, Method } from "../../types";
import { MethodTransformer } from "../../types/methods/method-transformer";
import { AppendedExecutionReference } from "../../types/references/appended-execution-reference";
import { AppendedComposableBuilder } from "../composable-builders/appended-composable-builder";
import { ComposableBuilder } from "../composable-builders/composable-builder";
import { AppendedReferenceBuilder } from "../reference-builders/appended-reference-builder";
import { ExecutionBuilder } from "./execution-builder";

export class AppendedExecutionBuilder<TI extends unknown[], TO, TEP> extends ExecutionBuilder<TI, TO> {
    /**
     * @param method the method to be referenced
     */
    constructor(
        public method: Method<TI, TO>,
        protected buildExtendedProperties: Method<TI, TEP>,
        protected transform: <TR extends ExecutionReference<TI, TO>>(executionReference: TR) => TR = r => r,
    ) {
        super(method, transform)
    }

    with<TIN extends unknown[], TON, TTA extends unknown[]>(
        transformation: MethodTransformer<TI, TO, TIN, TON, TTA>,
        ...args: TTA
    ): ExecutionBuilder<TIN, TON> {
        // return this.withBuilder(transformation, ExecutionBuilder)(...args);
        return new ExecutionBuilder(transformation(this.method, ...args));
    }

    with2<TIN extends unknown[], TON, TTA extends unknown[]>(
        transformation: MethodTransformer<TI, TO, TIN, TON, TTA>,
        extendedPropsTransformation: MethodTransformer<TI, TEP, TIN, TEP, TTA>,
        ...args: TTA
    ) {
        return new AppendedExecutionBuilder(transformation(this.method, ...args), extendedPropsTransformation(this.buildExtendedProperties, ...args))
    }

    composable<TCN extends unknown[], TEN extends unknown[], TTA extends unknown[]>(
        transformation: MethodTransformer<TI, TO, [...cargs: TCN, ...targs: TEN], TO, TTA>,
        ...args: TTA
    ): ComposableBuilder<TCN, TEN, TO> {
        return new ComposableBuilder(this.with(transformation, ...args));
    }

    composable2<TCN extends unknown[], TEN extends unknown[], TTA extends unknown[]>(
        transformation: MethodTransformer<TI, TO, [...cargs: TCN, ...targs: TEN], TO, TTA>,
        extendedPropsTransformation: MethodTransformer<TI, TEP, [...cargs: TCN, ...targs: TEN], TEP, TTA>,
        ...args: TTA
    ): ComposableBuilder<TCN, TEN, TO> {
        return new AppendedComposableBuilder(this.with(transformation, ...args), extendedPropsTransformation(this.buildExtendedProperties, ...args));
    }

    composableAll(): ComposableBuilder<TI, [], TO> {
        return new AppendedComposableBuilder(this, this.buildExtendedProperties);
    }

    reference(): AppendedReferenceBuilder<TI, TO, TEP, AppendedExecutionReference<TI, TO, TEP>> {
        return new AppendedReferenceBuilder(this, this.buildExtendedProperties, this.transform);
    }

    build() {
        return this.reference().build();
    }
}