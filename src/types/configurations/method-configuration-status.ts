import { MethodConfiguration } from "./method-configuration";
import { GetError, GetResult, GetStatus } from "../callbacks";
import { OnFailure } from "../callbacks/on-failure";
import { ExecutionStatus } from "../execution-status";

export type MethodConfigurationStatus<TResult, TResponse, TArgs extends any[], TError extends Error = Error> = MethodConfiguration<TResponse,TArgs> & {
    initialResult?: TResult;
    getResult?: GetResult<TResult, TResponse>;
    getStatus?: GetStatus<ExecutionStatus, TResponse>;
    getError?: GetError<TError, TResponse>;
    onFailure?: OnFailure<TResponse, TArgs>;
}