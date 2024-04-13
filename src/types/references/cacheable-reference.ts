import { ExecutionReference } from "./execution-reference"

export type CacheableReference<TI extends unknown[], TO, TR extends ExecutionReference<TI, TO>> = TR & {
    forceExecute: (...args: TI) => Promise<TO>;
}