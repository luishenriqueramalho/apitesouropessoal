import { z } from "zod";

const categoryInput = {
  userId: z.coerce.string(),
  nomeCategoria: z.coerce.string(),
  tipo: z.coerce.string(),
};

const categoryGenerated = {
  id: z.string(),
  createAt: z.string(),
};

const createCategorySchema = z.object({
  ...categoryInput,
});

const deleteCategorySchema = z.object({
  ...categoryInput,
  ...categoryGenerated,
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type DeleteCategoryInput = z.infer<typeof deleteCategorySchema>;
