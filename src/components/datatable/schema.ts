import { z } from "zod";

export const schema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  business: z.string(),
  credit_limit: z.string(),
  status: z.string(),
});
