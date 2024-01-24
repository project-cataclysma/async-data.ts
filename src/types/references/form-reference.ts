import { ExecutionReference } from "./execution-reference";
import { Ref } from "vue";

export type FormReference<
  TReference extends ExecutionReference<TResponse, TRemaining>,
  TResponse,
  TArg,
  TRemaining extends unknown[],
> = TReference & {
  form: Ref<TArg>;
};
