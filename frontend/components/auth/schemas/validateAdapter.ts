import { ZodSchema } from 'zod';

export function makeZodValidator<T extends Record<string, any>>(schema: ZodSchema<T>) {
  return (values: T): Partial<Record<keyof T & string, string>> => {
    const res = schema.safeParse(values);
    if (res.success) return {};
    const errors: Partial<Record<keyof T & string, string>> = {};
    for (const issue of res.error.issues) {
      const path = (issue.path[0] ?? '') as keyof T & string;
      if (path && !errors[path]) errors[path] = issue.message;
    }
    return errors;
  };
}


