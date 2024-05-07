import { ExecutionBuilder } from "./execution-builder";
import { Method } from "../../types/methods";
import { MethodTransformer } from "../../types/methods/method-transformer";
import { CacheableReference, ExecutionReference } from "../../types";
import { ReferenceBuilder } from "../reference-builders/reference-builder";
import { cacheReferenceTransformer } from "../../references/cache-reference-transformer";
import { ExtensionBuilder } from "../extension-builders/extensions-builder";

export class CacheableExecutionBuilder<TI extends unknown[], TO, TE> extends ExecutionBuilder<TI, TO, TE> {
    /**
     * @param method The method to reference
     * @param cacheMethod The method to use when executing the cache
     */
    constructor(
        public method: Method<TI, TO>,
        public extensionBuilder: ExtensionBuilder<TI, TE>,
        public cacheMethod: Method<TI, TO | undefined>,
        protected transform: <TR extends ExecutionReference<TI, TO, TE>>(
            executionReference: TR,
        ) => CacheableReference<TI, TO, TE, TR> = (r) => cacheReferenceTransformer(r, this.cacheMethod),
    ) {
        super(method, extensionBuilder, transform);
    }

    with<TIN extends unknown[], TON, TTA extends unknown[]>(
        transformation: MethodTransformer<TI, TO, TIN, TON, TTA>,
        extensionTransformation: MethodTransformer<TI, TE, TIN, TE, TTA>,
        ...args: TTA
    ): CacheableExecutionBuilder<TIN, TON, TE> {
        return new CacheableExecutionBuilder<TIN, TON, TE>(
            transformation(this.method, ...args),
            this.extensionBuilder.with(extensionTransformation, ...args),
            transformation(this.cacheMethod, ...args)
        );
    }

    reference(): ReferenceBuilder<TI, TO, TE, CacheableReference<TI, TO, TE, ExecutionReference<TI, TO, TE>>> {
        return new ReferenceBuilder<TI, TO, TE, CacheableReference<TI, TO, TE, ExecutionReference<TI, TO, TE>>>(this, this.transform)
    }

    build() {
        return this.reference().build();
    }
}
