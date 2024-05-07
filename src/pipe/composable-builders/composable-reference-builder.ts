import { ExecutionReference } from "../../types";
import { ApiDeinition } from "../../types/api-definition";
import { AsyncMethod, SyncMethod } from "../../types/methods";
import { Transformer } from "../../types/transformer";
import { ExecutionBuilder } from "../execution-builders/execution-builder";
import { ReferenceBuilder } from "../reference-builders/reference-builder";

export class ComposableReferenceBuilder<TC extends unknown[], TE extends unknown[], TO, TR extends ExecutionReference<TE, TO>> {
    constructor(
        protected execution: ExecutionBuilder<[...tc: TC, ...te: TE], TO>,
        protected transform: (executionReference: ExecutionReference<TE, TO>) => TR,
    ) {
    }

    then<TRN extends TR, TTA extends unknown[]>(
        transform: Transformer<TR, TRN, TTA>,
        ...args: TTA
    ): ComposableReferenceBuilder<TC, TE, TO, TRN> {
        return new ComposableReferenceBuilder(this.execution, (r) => transform(this.transform(r), ...args));
    }

    reference(): SyncMethod<TC, ReferenceBuilder<TE, TO, TR>> {
        return (...cargs: TC) => this.execution.with(exec => (...eargs: TE) => exec(...cargs, ...eargs)).reference().then(this.transform);
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