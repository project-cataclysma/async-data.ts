import { ExecutionStatusType } from "./status-type";

export type StatusReferenceConfig<TI extends unknown[], TO, TR, TS, TE> = {
    getResult: (output: TO) => TR;
    getStatus: (output: TO) => TS;
    getStatusType: (output: TS) => ExecutionStatusType;
    getError: (output: TO) => TE;
}