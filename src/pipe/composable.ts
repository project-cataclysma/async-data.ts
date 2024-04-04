import { Execution } from "./execution";

export class Composable<
    TI extends [...tc: TC, ...te: TE],
    TO,
    TC extends unknown[],
    TE extends unknown[]
> {
    constructor(
        protected execution: Execution<TE, TO>,
    ) {

    }

    apply<TCN extends unknown[], TEN extends unknown[]>(
        transformation: (execution: Execution<TE, TO>) => (Execution<TEN, TO>),
    ): Composable<[...tc: TCN, ...tn: TEN], TO, TCN, TEN> {
        const newExecution = transformation(this.execution);
        return new Composable(newExecution);
    }

    with<TCN extends unknown[], TEN extends unknown[]>(
        transformation: (execute: (...args: TE) => TO) => ((...args: TEN) => TO),
    ): Composable<[...tc: TCN, ...tn: TEN], TO, TCN, TEN> {
        return this.apply((execution) => {
            return execution.with(transformation)
        });
    }

    reference() {
        return (...args: TC) => this.execution.reference();
    }
}