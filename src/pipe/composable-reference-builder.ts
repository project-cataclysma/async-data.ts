import { ExecutionReference } from "../types";
import { ComposableBuilder } from "./composable-builder";
import { ReferenceBuilder } from "./reference-builder";

export class ComposableReferenceBuilder<TC extends unknown[], TE extends unknown[], TO, TRI extends ReferenceBuilder<TE, TO, ExecutionReference<TE, TO>>, TRF extends ReferenceBuilder<TE, TO, ExecutionReference<TE, TO>>> {
    constructor(
        protected composableBuilder: ComposableBuilder<TC, TE, TO>,
        protected transformer: (r: TRI) => TRF
    ) {
    }

    build() {
        return this.composableBuilder.build();
    }
}