export type GetResult<TResult, TResponse> = (
    response: TResponse
) => TResult;