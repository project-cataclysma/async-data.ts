import { Method } from "../method";
import { OnError, OnFinally, OnSuccess } from "../callbacks";

export type ExecutionConfig<
  TResponse,
  TArgs extends unknown[],
  TError extends Error = Error,
> = {
  afterExecute?: Method<TResponse, TArgs>;
  beforeExecute?: Method<TResponse, TArgs>;
  onExecute?: Method<TResponse, TArgs>;
  onError?: OnError<TError, TArgs>;
  onFinally?: OnFinally<TArgs>;
  onSuccess?: OnSuccess<TResponse, TArgs>;
};
