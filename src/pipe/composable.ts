import { Execution } from "./execution";

export class Composable<
    TC extends unknown[],
    TE extends unknown[],
    TO,
> {
    constructor(
        protected execution: Execution<[...tc: TC, ...te: TE], TO>,
    ) {

    }

    apply<TCN extends unknown[], TEN extends unknown[]>(
        transformation: (execution: Execution<[...tc: TC, ...te: TE], TO>) => (Execution<[...tcn: TCN, ...ten: TEN], TO>),
    ): Composable<TCN, TEN, TO> {
        return new Composable(transformation(this.execution));
    }

    with<TCN extends unknown[], TEN extends unknown[]>(
        transformation: (execute: (...args: [...tc: TC, ...te: TE]) => TO) => ((...args: TEN) => TO),
    ): Composable<TCN, TEN, TO> {
        return this.apply((execution) => execution.with(transformation));
    }

    with2<TCN extends unknown[], TEN extends unknown[]>(
        transformation: (
            execute: (...args: [...tc: TC, ...te: TE]) => TO
        ) => ((...args: [...cargs: TCN, ...targs: TEN]) => TO),
    ): Composable<TCN, TEN, TO> {
        return this.apply((execution) => execution.with(transformation));
    }

    reference(): (...args: TC) => Execution<TE, TO> {
        return (...cargs: TC) => this.execution.with(exec => {
            return (...eargs: TE) => exec(...cargs, ...eargs)
        });
    }
}