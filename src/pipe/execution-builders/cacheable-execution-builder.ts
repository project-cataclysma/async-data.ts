import { ExecutionBuilder } from "./execution-builder";
import { Method } from "../../types/methods";
import { MethodTransformer } from "../../types/methods/method-transformer";
import { CacheableReference, ExecutionReference } from "../../types";
import { ReferenceBuilder } from "../reference-builders/reference-builder";
import { cacheReferenceTransformer } from "../../references/cache-reference-transformer";

export class CacheableExecutionBuilder<TI extends unknown[], TO> extends ExecutionBuilder<TI, TO> {
    /**
     * @param method The method to reference
     * @param cacheMethod The method to use when executing the cache
     */
    constructor(
        public method: Method<TI, TO>,
        public cacheMethod: Method<TI, TO | undefined>,
        protected transform: <TR extends ExecutionReference<TI, TO>>(
            executionReference: TR,
        ) => CacheableReference<TI, TO, TR> = (r) => cacheReferenceTransformer(r, this.cacheMethod),
    ) {
        super(method, transform);
    }

    with<TIN extends unknown[], TTA extends unknown[]>(
        transformation: MethodTransformer<TI, TO, TIN, TO, TTA>,
        ...args: TTA
    ): CacheableExecutionBuilder<TIN, TO> {
        return new CacheableExecutionBuilder<TIN, TO>(
            transformation(this.method, ...args),
            transformation(this.cacheMethod, ...args)
        );
    }

    reference(): ReferenceBuilder<TI, TO, CacheableReference<TI, TO, ExecutionReference<TI, TO>>> {
        return new ReferenceBuilder(this, this.transform)
    }
    
    build() {
        return this.reference().build();
    }
}