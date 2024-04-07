import { ComputedRef } from 'vue';
import type { ExecutionReference } from './execution-reference';

export type StatusReference<TI extends unknown[], TO, TR extends ExecutionReference<TI, TO>, TF> = TR & {
    result: ComputedRef<TF>,
}