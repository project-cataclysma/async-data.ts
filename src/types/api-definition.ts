import { AsyncMethod } from "./methods";

export type ApiDeinition<TC extends unknown[], TE extends unknown[], TO, TR> = {
    async: AsyncMethod<[...tc: TC, ...te: TE], TO>;
    composable: (...args: TC) => AsyncMethod<TE, TO>;
    reference: (...cargs: TC) => TR;
}