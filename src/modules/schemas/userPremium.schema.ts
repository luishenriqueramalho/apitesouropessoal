import { z } from "zod";

const userPremiumInput = {
  userId: z.coerce.string(),
  tipoPlano: z.coerce.string(),
  valorPagamento: z.coerce.string(),
  situacao: z.coerce.boolean(),
};

const userPremiumGenerated = {
  id: z.string(),
  createdAt: z.string(),
};

const createUserPremiumSchema = z.object({
  ...userPremiumInput,
});

const deleteUserPremiumSchema = z.object({
  ...userPremiumInput,
  ...userPremiumGenerated,
});

const userPremiumResponseSchema = z.object({
  ...userPremiumInput,
  ...userPremiumGenerated,
});

export type CreateUserPremiumInput = z.infer<typeof createUserPremiumSchema>;
export type DeleteUserPremiumInput = z.infer<typeof deleteUserPremiumSchema>;
