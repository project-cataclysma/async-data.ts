import { ExecutionBuilder } from "./execution-builder";
import { Method } from "../../types/methods";
import { MethodTransformer } from "../../types/methods/method-transformer";
import { CacheableReference, ExecutionReference } from "../../types";
import { CacheableReferenceBuilder } from "../reference-builders/cacheable-reference-builder";

export class CacheableExecutionBuilder<TI extends unknown[], TO> extends ExecutionBuilder<TI, TO> {
    /**
     * @param method The method to reference
     * @param cacheMethod The method to use when executing the cache
     */
    constructor(
        public method: Method<TI, TO>,
        public cacheMethod: Method<TI, TO>,
    ) {
        super(method);
    }

    with<TIN extends unknown[], TTA extends unknown[]>(
        transformation: MethodTransformer<TI, TO, TIN, TO, TTA>,
        ...args: TTA
    ): CacheableExecutionBuilder<TIN, TO> {
        return new CacheableExecutionBuilder<TIN, TO>(transformation(this.method, ...args), transformation(this.cacheMethod, ...args));
    }

    reference(): CacheableReferenceBuilder<TI, TO, CacheableReference<TI, TO, ExecutionReference<TI, TO>>> {
        // TODO, we need cacheMethod to have execute as a parameter
        return new CacheableReferenceBuilder(this, (r) => ({
            ...r,
            forceExecute: r.execute,
            execute: r.execute,
        }));
    }
    
    build() {
        return this.reference().build();
    }
}