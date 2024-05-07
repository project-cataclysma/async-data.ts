import { Ref } from "vue";

export type ExtensionProperties<TP> = {
    [TK in keyof TP]: TP[TK] extends (...args: unknown[]) => unknown ? TP[TK] : Ref<TP[TK]>
}
