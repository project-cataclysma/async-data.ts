import { Extension } from "../../types/extensions/extension";
import { ExtensionProperties } from "../../types/extensions/extension-properties";
import { MethodTransformer } from "../../types/methods/method-transformer";

export class ExtensionBuilder<TI extends unknown[], TE> {
    constructor(
        public extension: Extension<TI, TE>
    ) {

    }

    with<TIN extends unknown[], TTA extends unknown[]>(
        transformer: MethodTransformer<TI, TE, TIN, TE, TTA>,
        ...args: TTA
    ): ExtensionBuilder<TIN, TE> {
        const protoUpdater = (tp: ExtensionProperties<TE>) => transformer((...ti) => this.extension.updater(tp, ...ti), ...args)
        const updater = (tp: ExtensionProperties<TE>, ...ti: TIN) => (protoUpdater(tp))(...ti);
        return new ExtensionBuilder({
            ...this.extension,
            updater,
        });
    }

    then<TEN>(
        newExtesnsion: Extension<TI, TEN>
    ): ExtensionBuilder<TI, TE & TEN> {
        const builder = (): ExtensionProperties<TE & TEN> => {
            const myExtension = this.extension.builder();
            const otherExtension = newExtesnsion.builder();
            // @todo resolve need for casting. Perhaps we can design this so that it isn't needed.
            return {
                ...myExtension,
                ...otherExtension,
            } as ExtensionProperties<TE & TEN>
        }
        const updater = async (tp: ExtensionProperties<TE & TEN>, ...ti: TI): Promise<TE & TEN> => {
            const myUpdater = Promise.resolve(this.extension.updater(tp, ...ti));
            const otherUpdater = Promise.resolve(newExtesnsion.updater(tp, ...ti));
            const myValues = await myUpdater;
            const otherValues = await otherUpdater;
            return {
                ...myValues,
                ...otherValues,
            }
        }
        return new ExtensionBuilder({
            builder,
            updater,
        })
    }
}
