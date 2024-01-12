import { ExecutionConfig } from "./execution-config";
import { GetError, GetResult, GetStatus } from "../callbacks";
import { OnFailure } from "../callbacks/on-failure";
import { ExecutionStatus } from "../status";

export type StatusConfig<TResult, TResponse, TArgs extends any[], TError extends Error = Error> = ExecutionConfig<TResponse,TArgs> & {
    initialResult?: TResult;
    getResult?: GetResult<TResult, TResponse>;
    getStatus?: GetStatus<ExecutionStatus, TResponse>;
    getError?: GetError<TError, TResponse>;
    onFailure?: OnFailure<TResponse, TArgs>;
}