import { ExecutionReference } from "../types/references/execution-reference";
import { Execution } from "../types/reference-builder/execution";
import { ExecutionReferenceBuilder } from "../types/reference-builder/execution-reference-builder";
import { ExecutionReferenceBuilderConfig } from "../types/reference-builder/execution-reference-builder-config";
import { ExecutionComposable } from "../types/composables/execution-composable";
import { ReferenceTransfomer } from "../types/transformers";

export class Pipeline<TI extends unknown[], TO, TR extends ExecutionReference<TI, TO>> {
    constructor(
        public execution: Execution<TI, TO>,
        public transformer: (
            execution: Execution<TI, TO>,
            config?: ExecutionReferenceBuilderConfig<TI, TO>
        ) => TR,
    ) {

    }

    then<TRN extends ExecutionReference<TI, TO>, TTA extends unknown[]>(
        transformer: ReferenceTransfomer<TR, TRN, TI, TI, TO, TO, TTA>,
        ...ttargs: TTA
    ): Pipeline<TI, TO, TRN> {
        return new Pipeline(
            this.execution,
            (...args) => transformer(this.transformer(...args), ...ttargs),
        );
    }

    reference(
        config?: ExecutionReferenceBuilderConfig<TI, TO>
    ): TR {
        return this.transformer(this.execution, config);
    }

    composable(
        config?: ExecutionReferenceBuilderConfig<TI, TO>
    ): ExecutionComposable<TR, [], TI, TO> {
        return () => this.reference(config);
    }
}

export function pipe<
    TI extends unknown[],
    TO,
    TR extends ExecutionReference<TI, TO>
>(
    execution: Execution<TI, TO>,
    referenceBuilder: ExecutionReferenceBuilder<TR, TI, TO>
): Pipeline<TI, TO, TR> {
    return new Pipeline(execution, referenceBuilder)
}