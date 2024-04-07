import { ExecutionBuilder } from "./execution-builder";

export function usePipe<TI extends unknown[], TO>(method: (...args: TI) => Promise<TO> | TO) {
    return new ExecutionBuilder(method);
}