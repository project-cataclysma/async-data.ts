import { ExecutionStatus } from "../../status";

export type OnFailure<TResponse, TArgs extends unknown[]> = (
  status: ExecutionStatus,
  response: TResponse,
  ...args: TArgs
) => void;
