import { MethodWithParameters } from "./method-with-parameters";
import { MethodWithoutParameters } from "./method-without-parameters";

export type Method<TResponse, TArgs extends unknown[]> = TArgs extends [
  p1: unknown,
  ...pn: unknown[],
]
  ? MethodWithParameters<TResponse, TArgs>
  : MethodWithoutParameters<TResponse>;
