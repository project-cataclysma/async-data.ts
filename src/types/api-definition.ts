export type ApiDeinition<TC extends unknown[], TE extends unknown[], TO, TR> = {
    async: (...args: [...tc: TC, ...te: TE]) => Promise<TO>,
    composable: (...args: TC) => (...eargs: TE) => Promise<TO>,
    reference: (...cargs: TC) => TR,
}