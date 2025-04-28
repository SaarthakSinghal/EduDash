import { z } from "zod";

//SUBJECT SCHEMA
export const subjectSchema = z.object({
  name: z.string().min(1, { message: "Name must be at least 1 characters long" }),
});
export type subjectInputs = z.infer<typeof subjectSchema>;
