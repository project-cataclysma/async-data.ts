import { Method } from "../types";
import { ExecutionBuilder } from "./execution-builders/execution-builder";

export function usePipe<TI extends unknown[], TO>(method: Method<TI, TO>) {
    return new ExecutionBuilder(method);
}