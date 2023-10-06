import { z } from "zod";

const mesesInput = {
  id: z.coerce.string(),
  nomeMes: z.coerce.string(),
};

const mesesGenerated = {
  id: z.string(),
};

const createMesesSchema = z.object({
  ...mesesInput,
});

const deleteMesesSchema = z.object({
  ...mesesInput,
  ...mesesGenerated,
});

export type CreateMesesInput = z.infer<typeof createMesesSchema>;
export type DeleteMesesInput = z.infer<typeof deleteMesesSchema>;
