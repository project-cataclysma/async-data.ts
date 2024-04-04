import { ComputedRef } from "vue"
import { ExecutionReference } from "../../references/execution-reference";
import { ExecutionStatusType } from "./status-type";

export type StatusReference<
    TReference extends ExecutionReference<TI, TO>,
    TI extends unknown[],
    TO,
    TR,
    TS,
    TE
> = TReference & {
    result: ComputedRef<TR>;
    status: ComputedRef<TS>;
    error: ComputedRef<TE>;
    statusType: ComputedRef<ExecutionStatusType>;
}