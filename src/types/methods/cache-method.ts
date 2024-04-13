import { AsyncMethod } from "./async-method";
import { Method } from "./method";

export type CacheMethod<TI extends unknown[], TO> =  Method<[method: AsyncMethod<TI, TO>, ...ti: TI], TO>;
