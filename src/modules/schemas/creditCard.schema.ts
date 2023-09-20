import { z } from "zod";

const creditCardInput = {
  userId: z.coerce.string(),
  nomeBanco: z.coerce.string(),
  diaVencimento: z.coerce.number(),
  limiteTotal: z.coerce.string(),
  limiteDisponivel: z.coerce.string(),
};

const creditCardGenerated = {
  id: z.string(),
  createAt: z.string(),
};

const createCreditCardSchema = z.object({
  ...creditCardInput,
});

const deleteCreditCardSchema = z.object({
  ...creditCardInput,
  ...creditCardGenerated,
});

export type CreateCreditCardInput = z.infer<typeof createCreditCardSchema>;
export type DeleteCreditCardInput = z.infer<typeof deleteCreditCardSchema>;
