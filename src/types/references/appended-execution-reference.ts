import { ExecutionReference } from "./execution-reference";

export type AppendedExecutionReference<TI extends unknown[], TO, TEP> = ExecutionReference<TI, TO> & TEP;