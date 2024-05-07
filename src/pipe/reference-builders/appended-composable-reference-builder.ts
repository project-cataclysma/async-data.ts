import { Method } from "../../types";
import { ApiDeinition } from "../../types/api-definition";
import { AsyncMethod, SyncMethod } from "../../types/methods";
import { AppendedExecutionReference } from "../../types/references/appended-execution-reference";
import { Transformer } from "../../types/transformer";
import { AppendedExecutionBuilder } from "../execution-builders/appended-execution-builder";
import { AppendedReferenceBuilder } from "./appended-reference-builder";
import { ComposableReferenceBuilder } from "./composable-reference-builder";

export class AppendedComposableReferenceBuilder<TC extends unknown[], TE extends unknown[], TO, TEP, TR extends AppendedExecutionReference<TE, TO, TEP>> extends ComposableReferenceBuilder<TC, TE, TO, TR> {
    constructor(
        protected execution: AppendedExecutionBuilder<[...tc: TC, ...te: TE], TO, TEP>,
        protected extendedPropsBulider: Method<[...tc: TC, ...te: TE], TEP>,
        protected transform: (executionReference: AppendedExecutionReference<TE, TO, TEP>) => TR,
    ) {
        super(execution, transform)
    }
    then<TRN extends TR, TTA extends unknown[]>(
        transform: Transformer<TR, TRN, TTA>,
        ...args: TTA
    ): AppendedComposableReferenceBuilder<TC, TE, TO, TEP, TRN> {
        return new AppendedComposableReferenceBuilder(this.execution, this.extendedPropsBulider, (r) => transform(this.transform(r), ...args));
    }


    reference(): SyncMethod<TC, AppendedReferenceBuilder<TE, TO, TEP, TR>> {
        return (...cargs: TC) => this.execution.with2(exec => (...eargs: TE) => exec(...cargs, ...eargs), ep => (...eargs: TE) => ep(...cargs, ...eargs)).reference().then(this.transform);
    }

    build(): SyncMethod<TC, TR> {
        const reference = this.reference();
        return (...cargs: TC) => reference(...cargs).build();
    }

    async(...cargs: TC): AsyncMethod<TE, TO> {
        return (...eargs: TE) => Promise.resolve(this.execution.method(...cargs, ...eargs))
    }

    api(): ApiDeinition<TC, TE, TO, TR> {
        return {
            async: (...args: [...ti: TC, ...te: TE]) => Promise.resolve(this.execution.method(...args)),
            composable: (...cargs: TC) => this.async(...cargs),
            reference: this.build()
        }
    }
}