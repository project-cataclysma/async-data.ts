import { ExecutionReference } from "../references/execution-reference";

export type ExecutionComposable<
    TReference extends ExecutionReference<TEI, TO>,
    TCI extends unknown[],
    TEI extends unknown[],
    TO
> = (...tci: TCI) => TReference