import { CacheableReference, ExecutionReference } from "../../types";
import { ExecutionBuilder } from "../execution-builders/execution-builder";
import { ReferenceBuilder } from "./reference-builder";

export class CacheableReferenceBuilder<TI extends unknown[], TO, TR extends ExecutionReference<TI, TO>> extends ReferenceBuilder<TI, TO, TR> {
    constructor(
        protected execution: ExecutionBuilder<TI, TO>,
        protected transform: (executionReference: CacheableReference<TI, TO, ExecutionReference<TI, TO>>) => CacheableReference<TI, TO, TR>,
    ) {
        super(execution, transform);
    }
}