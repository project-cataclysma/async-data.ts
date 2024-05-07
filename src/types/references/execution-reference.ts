import { ComputedRef } from "vue"
import { ExtensionProperties } from "../extensions/extension-properties";

export type ExecutionReference<TI extends unknown[], TO, TE> = {
    executed: ComputedRef<boolean>;
    executing: ComputedRef<boolean>;
    execute: (...args: TI) => Promise<TO>;
    output: ComputedRef<TO>;
} & ExtensionProperties<TE>
