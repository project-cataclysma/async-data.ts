import { CacheableReference, ExecutionReference } from "../../types";
import { ExecutionBuilder } from "../execution-builders/execution-builder";
import { ReferenceBuilder } from "./reference-builder";

export class CacheableReferenceBuilder<TI extends unknown[], TO, TE, TR extends ExecutionReference<TI, TO, TE>> extends ReferenceBuilder<TI, TO, TE, TR> {
    constructor(
        protected execution: ExecutionBuilder<TI, TO, TE>,
        protected transform: (executionReference: CacheableReference<TI, TO, TE, ExecutionReference<TI, TO, TE>>) => CacheableReference<TI, TO, TE, TR>,
    ) {
        super(execution, transform);
    }
}
