export type InferElement<T> = T extends readonly (infer ET)[] ? ET : never
