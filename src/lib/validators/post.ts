import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, { message: "Title should be at least 3 characters long" })
    .max(128, { message: "Title should be less or equal 128 characters long" }),
  subjectgroupName: z.any(),
  content: z.any()
});

export type PostCreationRequest = z.infer<typeof PostValidator>
