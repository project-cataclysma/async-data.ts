import { ExecutionReference } from "../types";
import { ExecutionBuilder } from "./execution-builder";
import { ReferenceBuilder } from "./reference-builder";

export class ComposableReferenceBuilder<TC extends unknown[], TE extends unknown[], TO, TR extends ExecutionReference<TE, TO>> {
    constructor(
        protected execution: ExecutionBuilder<[...tc: TC, ...te: TE], TO>,
        protected transform: (executionReference: ExecutionReference<TE, TO>) => TR,
    ) {
    }
    
    then<TTA extends unknown[], TRN extends TR> (
        transform: (executionReference: TR, ...args: TTA) => TRN,
        ...args: TTA
    ): ComposableReferenceBuilder<TC, TE, TO, TRN> {
        return new ComposableReferenceBuilder(this.execution, (r) => transform(this.transform(r), ...args));
    }

    reference(): (...cargs: TC) => ReferenceBuilder<TE, TO, TR> {
        return (...cargs: TC) => this.execution.with(exec => (...eargs: TE) => exec(...cargs, ...eargs)).reference().then(this.transform);
    }

    build(): (...cargs: TC) => TR {
        const reference = this.reference();
        return (...cargs: TC) => reference(...cargs).build();
    }
}