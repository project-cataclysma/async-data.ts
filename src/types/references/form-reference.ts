import { Ref } from "vue"
import { ExecutionReference } from "./execution-reference"

export type FormReference<TI extends unknown[], TO, TR extends ExecutionReference<TI, TO>, TF> = TR & {
    form: Ref<TF | undefined>,
}