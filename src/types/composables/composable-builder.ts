import { ExecutionConfig } from "../configs";
import { Method } from "../method";

/**
 * This is a helper type for pipeline composables.
 */
export type ComposableBuilder<
  TComposable,
  TResponse,
  TArgs extends unknown[],
> = (
  method: Method<TResponse, TArgs>,
  configuration: ExecutionConfig<TResponse, TArgs>,
) => TComposable;
