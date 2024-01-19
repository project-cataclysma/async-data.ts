import { MethodWithParameters } from "./method-with-parameters";
import { MethodWithoutParameters } from "./method-without-parameters";

export type Method<TResponse, TArgs extends any[]>
    = TArgs extends [p1: any, ...pn: any[]]
    ? MethodWithParameters<TResponse, TArgs>
    : MethodWithoutParameters<TResponse>