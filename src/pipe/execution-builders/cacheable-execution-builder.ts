import { ExecutionBuilder } from "./execution-builder";
import { Method } from "../../types/methods";
import { MethodTransformer } from "../../types/methods/method-transformer";
import { ExecutionReference } from "../../types";
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
        // type CacheTransform = (cacheMethod: Method<TI, TO>) => Method<TIN, TO>;
        /**
         * Step 1, we need to create a function that injects the method seperate from parameters.
         * Step 2, we flatten injection.
         */
        // const cacheTransform: CacheTransform = (method: AsyncMethod<TI, TO>) => transformation((...args: TI) => this.cacheMethod(method, ...args), ...args);
        // const cacheMethod = (method: Method<TIN, TO>, ...iargs: TIN) => cacheTransform(transformation(method, ...args))(...iargs)
        return new CacheableExecutionBuilder<TIN, TO>(transformation(this.method, ...args), transformation(this.cacheMethod, ...args));
    }

    reference(): CacheableReferenceBuilder<TI, TO, ExecutionReference<TI, TO>> {
        return new CacheableReferenceBuilder(this, (r) => r);
    }
}