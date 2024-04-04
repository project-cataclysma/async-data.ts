import { ExecutionState } from "../execution-state";
import type { ComputedRef } from 'vue';

export type ExecutionReference<TI extends unknown[], TO> = {
    execute: (...args: TI) => Promise<TO>;
    executing: ComputedRef<boolean>;
    executed: ComputedRef<boolean>;
    state: ComputedRef<ExecutionState>;
    output: ComputedRef<TO | undefined>;
}