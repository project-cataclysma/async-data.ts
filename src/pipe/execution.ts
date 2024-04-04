import { Composable } from "./composable";
import { Reference } from "./reference";

export class Execution<TI extends unknown[], TO> {
    constructor(
        protected execute: (...args: TI) => TO,
    ) {

    }

    with<TIN extends unknown[]>(
        transformation: (execute: (...args: TI) => TO) => ((...args: TIN) => TO),
    ): Execution<TIN, TO> {
        return new Execution(transformation(this.execute));
    }

    compose(): Composable<[], TI, TO> {
        return new Composable(this);
    }

    reference(): Reference<TI, TO> {
        return new Reference(this);
    }
}