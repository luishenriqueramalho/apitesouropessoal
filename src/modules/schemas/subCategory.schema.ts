import { z } from "zod";

const subCategoryInput = {
  userId: z.coerce.string(),
  categoryId: z.coerce.string(),
  nomeSubCategoria: z.coerce.string(),
  mesInicial: z.coerce.string(),
  valor: z.coerce.string(),
};

const subCategoryGenerated = {
  id: z.coerce.string(),
  createAt: z.coerce.string(),
};

const createSubCategorySchema = z.object({
  ...subCategoryInput,
});

const deleteSubCategorySchema = z.object({
  ...subCategoryInput,
  ...subCategoryGenerated,
});

export type CreateSubCategoryInput = z.infer<typeof createSubCategorySchema>;
export type DeleteSubCategoryInput = z.infer<typeof deleteSubCategorySchema>;
