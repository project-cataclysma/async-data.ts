import { Method } from '../method';
import { MethodStage } from '../method-stage';
import { ComputedRef } from "vue"

export type MethodReference<TResponse, TArgs extends any[]> = {
    lastExecuted: ComputedRef<Date>;
    execute: Method<TResponse, TArgs>;
    executing: ComputedRef<boolean>;
    executed: ComputedRef<boolean>;
    response: ComputedRef<TResponse>;
    stage: ComputedRef<MethodStage>;
}