import { ExecutionBuilder } from "./execution-builder";
import { Method } from "../../types/methods";
import { MethodTransformer } from "../../types/methods/method-transformer";
import { CacheableReference, ExecutionReference } from "../../types";
import { CacheableReferenceBuilder } from "../reference-builders/cacheable-reference-builder";
import { computed, ref } from "vue";

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
            const outputCached = ref<TO | undefined>();
            const cacheMethod = this.cacheMethod;
            async function execute(...args: TI): Promise<TO> {
                const cachedValue = await Promise.resolve(cacheMethod(...args));
                if (cachedValue !== undefined) {
                    outputCached.value = cachedValue;
                    return cachedValue;
                }
                const resultValue = await Promise.resolve(r.execute(...args));
                outputCached.value = resultValue;
                return resultValue;
            }
            async function forceExecute(...args: TI) {
                const resultValue = await Promise.resolve(r.execute(...args));
                outputCached.value = undefined;
                return resultValue;
            }
            const output = computed(() => outputCached.value ?? r.output.value);
            const executed = computed(() => !!(outputCached.value ?? r.executed.value));
            
            return {
                ...r,
                execute,
                forceExecute,
                output,
                executed,
            }
        });
    }
    
    build() {
        return this.reference().build();
    }
}