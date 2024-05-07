import { Method } from "../../types";
import { AppendedExecutionReference } from "../../types/references/appended-execution-reference";
import { ExecutionBuilder } from "../execution-builders";
import { ReferenceBuilder } from "./reference-builder";

export class AppendedReferenceBuilder<TI extends unknown[], TO, TEP, TR extends AppendedExecutionReference<TI, TO, TEP>> extends ReferenceBuilder<TI, TO, TR> {
    constructor(
        protected execution: ExecutionBuilder<TI, TO>,
        protected extendedPropsBuilder: Method<TI, TEP>,
        protected transform: (executionReference: AppendedExecutionReference<TI, TO, TEP>) => TR,
    ) {
        super(execution, transform)
    }
}