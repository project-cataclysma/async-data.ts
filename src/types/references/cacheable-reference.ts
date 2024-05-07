import { ExecutionReference } from "./execution-reference"

export type CacheableReference<TI extends unknown[], TO, TE, TR extends ExecutionReference<TI, TO, TE>> = TR & {
    forceExecute: (...args: TI) => Promise<TO>;
}
