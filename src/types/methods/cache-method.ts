import { Method } from "./method";

export type CacheMethod<TI extends unknown[], TO> =  Method<[method: Method<TI, TO>, ...ti: TI], TO>;
