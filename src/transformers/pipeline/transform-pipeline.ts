import { ExecutionReference } from "../../types/references/execution-reference";
import { Pipeline } from "../../types/pipeline";
import { ExecutionReferenceBuilderConfig } from "../../types/reference-builder/execution-reference-builder-config";
import { ExecutionComposable } from "../../types/composables/execution-composable";
import { ExecutionReferenceBuilder } from "../../types/reference-builder/execution-reference-builder";

export function transformPipelineReference<
    TRI extends ExecutionReference<TI, TO>,
    TI extends unknown[],
    TO,
    TTA extends unknown[],
>(
    pipeline: Pipeline<TI, TO>,
    referenceTransfomer: <TRF extends ExecutionReference<TI, TO>>(reference: TRI, ...args: TTA) => TRF,
    ...args: TTA
): Pipeline<TI, TO> {
    return {
        reference,
        composable,
    };
}