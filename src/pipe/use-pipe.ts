import { Execution } from "./execution";

export function usePipe<TI extends unknown[], TO>(method: (...args: TI) => TO) {
    return new Execution(method);
}