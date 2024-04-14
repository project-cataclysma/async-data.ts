import { ExecutionBuilder } from "./execution-builder";
import { Method } from "../../types/methods";
import { MethodTransformer } from "../../types/methods/method-transformer";
import { CacheableReference, ExecutionReference } from "../../types";
import { CacheableReferenceBuilder } from "../reference-builders/cacheable-reference-builder";
import { computed } from "vue";

export class CacheableExecutionBuilder<TI extends unknown[], TO> extends ExecutionBuilder<TI, TO> {
    /**
     * @param method The method to reference
     * @param cacheMethod The method to use when executing the cache
     */
    constructor(
        public method: Method<TI, TO>,
        public cacheMethod: Method<TI, TO | undefined>,
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
        return new CacheableReferenceBuilder(this, (r) => {
            let outputCached = undefined;
            return {
                ...r,
                execute: async (...args: TI) => {
                    const cachedValue = await Promise.resolve(this.cacheMethod(...args))
                    if (cachedValue) {
                        outputCached = cachedValue;
                    }
                    return (cachedValue) ?? await r.execute(...args)
                },
                forceExecute: (...args: TI) => r.execute(...args).then(r => {
                    outputCached = r;
                    return r;
                }),
                output: computed(() => outputCached ?? r.output.value),
                executed: computed(() => outputCached ?? r.executed.value),
            }
        });
    }
    
    build() {
        return this.reference().build();
    }
}