import { Transformer } from "../transformer";
import { Method } from "./method";

export type MethodTransformer<
    TII extends unknown[],
    TOI,
    TIN extends unknown[],
    TON,
    TTA extends unknown[]
> = Transformer<Method<TII, TOI>, Method<TIN, TON>, TTA>