import { MethodReference } from './method-reference';
import { ExecutionStatus } from '../execution-status';
import { Ref } from 'vue';

export type MethodReferenceStatus<TResult, TReference extends MethodReference<TResponse, TArgs>, TResponse, TArgs extends any[], TError extends Error = Error> = TReference & {
    error: Ref<TError | null>;
    result: Ref<TResult | null>;
    status: Ref<ExecutionStatus | null>;
}