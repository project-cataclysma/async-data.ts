import { Method, SyncMethod } from "../methods"
import { ExtensionProperties } from "./extension-properties";

export type Extension<TI extends unknown[], TE> = {
    builder: SyncMethod<[], ExtensionProperties<TE>>;
    updater: Method<[tp: ExtensionProperties<TE>, ...args: TI], TE>;
}
