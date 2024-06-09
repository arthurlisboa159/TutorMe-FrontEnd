import { z } from 'zod'

export const SubjectgroupValidator = z.object({
    name: z.string().min(3).max(21)
})


export const SubjectgroupSubscriptionValidator = z.object({
    subjectgroupId: z.string()
})

export type CreateSubjectgroupPayload = z.infer<typeof SubjectgroupValidator>
export type SubscribeToSubjectgroupPayload = z.infer<typeof SubjectgroupSubscriptionValidator>