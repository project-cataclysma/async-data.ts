import { ExecutionReference } from "../references/execution-reference"
import { ExecutionReferenceBuilderConfig } from "../reference-builder/execution-reference-builder-config"
import { ExecutionReferenceBuilder } from "../reference-builder/execution-reference-builder";
import { ExecutionComposable } from "../composables/execution-composable";

export type Pipeline<
    TI extends unknown[],
    TO
> = {
    reference<TR extends ExecutionReference<TI, TO>>(
        referenceBuilder: ExecutionReferenceBuilder<TR, TI, TO>,
        config?: ExecutionReferenceBuilderConfig<TI, TO>
    ): TR;
    composable<TR extends ExecutionReference<TI, TO>>(
        referenceBuilder: ExecutionReferenceBuilder<TR, TI, TO>,
        config?: ExecutionReferenceBuilderConfig<TI, TO>
    ): ExecutionComposable<TR, [], TI, TO>;
    // execute<TReferenceF extends ExecutionReference<[], TO>>(
    //     executionBuilder: ExecutionReferenceBuilder<TReferenceF, [], TO>,
    //     config?: ExecutionReferenceBuilderConfig<[], TO>
    // ): ExecutionComposable<TReferenceF, TI, [], TO>;
}