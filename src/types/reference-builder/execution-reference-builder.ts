import { ExecutionReference } from "../references/execution-reference";
import { Execution } from "./execution";
import { ExecutionReferenceBuilderConfig } from "./execution-reference-builder-config";

export type ExecutionReferenceBuilder<TReference extends ExecutionReference<TI, TO>, TI extends unknown[], TO> = (
    execution: Execution<TI, TO>,
    config?: ExecutionReferenceBuilderConfig<TI, TO>
) => TReference