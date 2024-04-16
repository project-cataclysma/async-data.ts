import { computed, ref } from "vue";
import { CacheableReference, ExecutionReference, Method } from "../types";

export function cacheReferenceTransformer<TI extends unknown[], TO, TR extends ExecutionReference<TI, TO>>(
    executionReference: TR,
    cacheMethod: Method<TI, TO | undefined>
): CacheableReference<TI, TO, TR> {
    const outputCached = ref<TO | undefined>();
    async function execute(...args: TI): Promise<TO> {
        const cachedValue = await Promise.resolve(cacheMethod(...args));
        if (cachedValue !== undefined) {
            outputCached.value = cachedValue;
            return cachedValue;
        }
        const resultValue = await Promise.resolve(executionReference.execute(...args));
        outputCached.value = resultValue;
        return resultValue;
    }
    async function forceExecute(...args: TI) {
        const resultValue = await Promise.resolve(executionReference.execute(...args));
        outputCached.value = undefined;
        return resultValue;
    }
    const output = computed(() => outputCached.value ?? executionReference.output.value);
    const executed = computed(() => !!(outputCached.value ?? executionReference.executed.value));
        
    return {
        ...executionReference,
        execute,
        forceExecute,
        output,
        executed,
    };
}