import { Method } from '../method';
import { MethodStage } from '../method-stage';
import { ComputedRef } from "vue"

export type ExecuitonReference<TResponse, TArgs extends any[]> = {
    /**
     * The time the last execution completed at
     */
    lastExecuted: ComputedRef<Date>;
    /** 
     * A method to trigger the execution
     */
    execute: Method<TResponse, TArgs>;
    /** 
     * Is the method currently executing?
     */
    executing: ComputedRef<boolean>;
    /** 
     * Has this method already completed an execution?
     */
    executed: ComputedRef<boolean>;
    /**
     * The result from the completed execution. Null if not yet executed
     */
    response: ComputedRef<TResponse|null>;
    /**
     * Combines the execution and executed variables into an enum.
     */
    stage: ComputedRef<MethodStage>;
}