import { Ref } from "vue"
import { ExecutionReference } from "./execution-reference"

export type FormReference<TI extends unknown[], TO, TE, TR extends ExecutionReference<TI, TO, TE>, TF> = TR & {
    form: Ref<TF | undefined>,
}
