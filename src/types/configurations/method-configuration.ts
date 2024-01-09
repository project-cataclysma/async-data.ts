import { Method } from "../method";
import { OnError, OnFinally, OnSuccess } from "../callbacks";

export type MethodConfiguration<TResponse, TArgs extends any[], TError extends Error = Error> = {
    afterExecute?: Method<TResponse, TArgs>;
    beforeExecute?: Method<TResponse, TArgs>;
    onExecute?: Method<TResponse, TArgs>;
    onError?: OnError<TError, TArgs>;
    onFinally?: OnFinally<TArgs>;
    onSuccess?: OnSuccess<TResponse, TArgs>;
}