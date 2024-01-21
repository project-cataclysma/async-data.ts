import { Method } from "../method";
import { MethodStage } from "../method";
import { ComputedRef } from "vue";

export type ExecutionReference<TResponse, TArgs extends unknown[]> = {
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
  response: ComputedRef<TResponse | null>;
  /**
   * Combines the execution and executed variables into an enum.
   */
  stage: ComputedRef<MethodStage>;
};
