import { ExecutionBuilder } from "./execution-builder";
import { Method } from "../../types/methods";
import { MethodTransformer } from "../../types/methods/method-transformer";
import { StatusReference, ExecutionReference } from "../../types";
import { ReferenceBuilder } from "../reference-builders/reference-builder";
import { StatusTransformerConfig } from "../../types/configurations/status-transformer-config";
import { statusReferenceTransformer } from "../../references";

export class StatusExecutionBuilder<TI extends unknown[], TO, TF> extends ExecutionBuilder<TI, TO> {
    /**
     * @param method The method to reference
     * @param cacheMethod The method to use when executing the cache
     */
    constructor(
        public method: Method<TI, TO>,
        public config: StatusTransformerConfig<TO, TF>,
        protected transform: <TR extends ExecutionReference<TI, TO>>(executionReference: TR) => StatusReference<TI, TO, TR, TF> = (r) => statusReferenceTransformer(r, this.config),
    ) {
        super(method , transform);
    }

    with<TIN extends unknown[], TTA extends unknown[]>(
        transformation: MethodTransformer<TI, TO, TIN, TO, TTA>,
        ...args: TTA
    ): StatusExecutionBuilder<TIN, TO, TF> {
        return new StatusExecutionBuilder<TIN, TO, TF>(transformation(this.method, ...args), this.config);
    }

    reference(): ReferenceBuilder<TI, TO, StatusReference<TI, TO, ExecutionReference<TI, TO>, TF>> {
        return new ReferenceBuilder(this, this.transform);
    }
    
    build() {
        return this.reference().build();
    }
}