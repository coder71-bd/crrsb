import { z } from "zod";

type MakeOptional<T> = {
  [K in keyof T]: T[K] extends z.ZodTypeAny ? z.ZodOptional<T[K]> : never;
};

export const makeOptionalSchema = <T extends { [key: string]: z.ZodTypeAny }>(
  schema: T
): MakeOptional<T> => {
  const result: Partial<Record<keyof T, z.ZodOptional<T[keyof T]>>> = {};

  for (const key in schema) {
    if (Object.prototype.hasOwnProperty.call(schema, key)) {
      result[key] = schema[key].optional() as z.ZodOptional<T[keyof T]>;
    }
  }

  return result as MakeOptional<T>;
};
