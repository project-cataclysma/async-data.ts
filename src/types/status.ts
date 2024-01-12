import type { ExecutionStatusType } from "./status-type";

export type ExecutionStatus<E = unknown> = {
    type: ExecutionStatusType;
    code: number;
    message: string;
    data?: E
}