import { AsyncMethod } from "./async-method";
import { Method } from "./method";

export type CacheMethod<TI extends unknown[], TO, TFI extends unknown[], TFO> =  Method<[method: AsyncMethod<TFI, TFO>, ...ti: TI], TO>;
