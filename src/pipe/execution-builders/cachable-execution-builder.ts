import { ExecutionBuilder } from "./execution-builder";
import { CacheMethod, Method } from "../../types/methods";

export class CachableExecutionBuilder<TI extends unknown[], TO> extends ExecutionBuilder<TI, TO> {
    /**
     * @param method The method to reference
     * @param cacheMethod The method to use when executing the cache
     */
    constructor(
        public method: Method<TI, TO>,
        public cacheMethod: CacheMethod<TI, TO>,
    ) {
        super(method);
    }
    
    with<TIN extends unknown[]>(
        transformation: (execute: Method<TI, TO>) => Method<TIN, TO>,
    ): ExecutionBuilder<TIN, TO> {
        type CacheTransform = (cacheMethod: Method<TI, TO>) => Method<TIN, TO>;
        /**
         * Step 1, we need to create a function that injects the method seperate from parameters.
         * Step 2, we flatten injection.
         */
        const cacheTransform: CacheTransform =  (method: Method<TI, TO>) => transformation((...args: TI) => this.cacheMethod(method, ...args));
        const cacheMethod = (method: Method<TI, TO>, ...args: TIN) => cacheTransform(method)(...args)
        return new CachableExecutionBuilder(transformation(this.method), cacheMethod);
    }
}