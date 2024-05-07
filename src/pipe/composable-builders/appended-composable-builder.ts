import { Method } from "../../types";
import { MethodTransformer } from "../../types/methods/method-transformer";
import { Transformer } from "../../types/transformer";
import { ComposableBuilder } from "./composable-builder";
import { AppendedComposableReferenceBuilder } from "../reference-builders/appended-composable-reference-builder";
import { AppendedExecutionReference } from "../../types/references/appended-execution-reference";
import { AppendedExecutionBuilder } from "../execution-builders/appended-execution-builder";

export class AppendedComposableBuilder<TC extends unknown[], TE extends unknown[], TO, TEP> extends ComposableBuilder<TC, TE, TO> {

    constructor(
        public execution: AppendedExecutionBuilder<[...tc: TC, ...te: TE], TO, TEP>,
        protected extendedPropsBuilder: Method<[...tc: TC, ...te: TE], TEP>
    ) {
        super(execution)
    }

    apply<TCN extends unknown[], TEN extends unknown[], TTA extends unknown[]>(
        transformation: Transformer<AppendedExecutionBuilder<[...tc: TC, ...te: TE], TO, TEP>, AppendedExecutionBuilder<[...tcn: TCN, ...ten: TEN], TO, TEP>, TTA>,
        ...args: TTA
    ): ComposableBuilder<TCN, TEN, TO> {
        return new ComposableBuilder(transformation(this.execution, ...args));
    }

    apply2<TCN extends unknown[], TEN extends unknown[], TTA extends unknown[]>(
        transformation: Transformer<AppendedExecutionBuilder<[...tc: TC, ...te: TE], TO, TEP>, AppendedExecutionBuilder<[...tcn: TCN, ...ten: TEN], TO, TEP>, TTA>,
        extendedPropsTransformer: MethodTransformer<[...tc: TC, ...te: TE], TEP, TEN, TEP, TTA>,
        ...args: TTA
    ): AppendedComposableBuilder<TCN, TEN, TO, TEP> {
        return new AppendedComposableBuilder(transformation(this.execution, ...args), extendedPropsTransformer(this.extendedPropsBuilder, ...args));
    }

    with<TCN extends unknown[], TEN extends unknown[], TTA extends unknown[]>(
        transformation: MethodTransformer<[...tc: TC, ...te: TE], TO, TEN, TO, TTA>,
        ...args: TTA
    ): ComposableBuilder<TCN, TEN, TO> {
        return this.apply((execution, ...ttargs: TTA) => execution.with(transformation, ...ttargs), ...args);
    }

    with2<TCN extends unknown[], TEN extends unknown[], TTA extends unknown[]>(
        transformation: MethodTransformer<[...tc: TC, ...te: TE], TO, TEN, TO, TTA>,
        extendedPropsTransformer: MethodTransformer<[...tc: TC, ...te: TE], TEP, TEN, TEP, TTA>,
        ...args: TTA
    ): AppendedComposableBuilder<TCN, TEN, TO, TEP> {
        return this.apply2((execution, ...ttargs: TTA) => execution.with2(transformation, extendedPropsTransformer, ...ttargs), extendedPropsTransformer, ...args);
    }

    withAll(): AppendedComposableBuilder<[...tc: TC, ...te: TE], [], TO, TEP> {
        return this.with2<[...tc: TC, ...te: TE], [], []>(exec => exec, eprops => eprops);
    }

    reference(): AppendedComposableReferenceBuilder<TC, TE, TO, TEP, AppendedExecutionReference<TE, TO, TEP>> {
        return new AppendedComposableReferenceBuilder(this.execution, this.extendedPropsBuilder, r => r);
    }

    build() {
        return (new AppendedComposableReferenceBuilder(this.execution, this.extendedPropsBuilder, r => r)).build();
    }
}