import { ComputedRef } from 'vue';
import type { ExecutionReference } from './execution-reference';

export type StatusReference<TI extends unknown[], TO, TE, TR extends ExecutionReference<TI, TO, TE>, TF> = TR & {
    result: ComputedRef<TF | undefined>,
}
