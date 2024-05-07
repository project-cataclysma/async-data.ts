import { ExecutionBuilder } from "./execution-builder";
import { Method } from "../../types/methods";
import { MethodTransformer } from "../../types/methods/method-transformer";
import { StatusReference, ExecutionReference } from "../../types";
import { StatusTransformerConfig } from "../../types/configurations/status-transformer-config";
import { statusReferenceTransformer } from "../../references";
import { ExtensionBuilder } from "../extension-builders/extensions-builder";

export class StatusExecutionBuilder<TI extends unknown[], TO, TE, TF> extends ExecutionBuilder<TI, TO, TE> {
    /**
     * @param method The method to reference
     * @param cacheMethod The method to use when executing the cache
     */
    constructor(
        public method: Method<TI, TO>,
        public extensionBuilder: ExtensionBuilder<TI, TE>,
        public config: StatusTransformerConfig<TO, TF>,
        protected transform: <TR extends ExecutionReference<TI, TO, TE>>(executionReference: TR) => StatusReference<TI, TO, TE, TR, TF> = (r) => statusReferenceTransformer(r, this.config),
    ) {
        super(method, extensionBuilder, transform);
    }

    with<TIN extends unknown[], TON, TTA extends unknown[]>(
        transformation: MethodTransformer<TI, TO, TIN, TON, TTA>,
        extensionTransformation: MethodTransformer<TI, TE, TIN, TE, TTA>,
        ...args: TTA
    ): StatusExecutionBuilder<TIN, TON, TE, TF> {
        const newConfig: StatusTransformerConfig<TON, TF> = {

        }
        return new StatusExecutionBuilder<TIN, TON, TE, TF>(transformation(this.method, ...args), this.extensionBuilder.with(extensionTransformation, ...args), newConfig);
    }

    build() {
        return this.reference().build();
    }
}
