import { z } from 'zod';

export const gitlabUpdateValidator = z.object({
    active: z.boolean(),
    issue_event: z.boolean(),
    merge_event: z.boolean(),
});
