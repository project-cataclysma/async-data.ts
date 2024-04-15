export type StatusTransformerConfig<TO, TF> = {
    getResult?: (ouput: TO) => TF;
}