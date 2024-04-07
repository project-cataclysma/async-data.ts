import { ComputedRef } from "vue"

export type ExecutionReference<TI extends unknown[], TO> = {
    executed: ComputedRef<boolean>;
    executing: ComputedRef<boolean>;
    execute: (...args: TI) => Promise<TO>;
    output: ComputedRef<TO>;
}