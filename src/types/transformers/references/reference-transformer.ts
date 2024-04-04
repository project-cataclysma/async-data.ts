import { ExecutionReference } from "../../../types/references/execution-reference";

export type ReferenceTransfomer<
    TReferenceI extends ExecutionReference<TII, TOI>,
    TReferenceF extends ExecutionReference<TIF, TOF>,
    TII extends unknown[],
    TIF extends unknown[],
    TOI,
    TOF,
    TTA extends unknown[],
> = (reference: TReferenceI, ...args: TTA) => TReferenceF