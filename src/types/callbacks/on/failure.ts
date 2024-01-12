import { ExecutionStatus } from "../../status";

export type OnFailure<TResponse, TArgs extends any[]> = (
    status: ExecutionStatus,
    response: TResponse,
    ...args: TArgs
) => void;