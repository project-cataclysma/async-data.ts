import { Execution } from "./execution";

export class Reference<TI extends unknown[], TO> {
    constructor(
        protected execution: Execution<TI, TO>
    ) {

    }

    then<TR extends Reference<TI, TO>>(
        transform: (reference: this) => TR
    ): TR {
        return transform(this);
    }

    build() {
        return {}
    }
}