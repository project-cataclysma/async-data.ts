import { ExecutionBuilder } from "./execution-builder";

export function usePipe<TI extends unknown[], TO>(method: (...args: TI) => TO) {
    return new ExecutionBuilder(method);
}