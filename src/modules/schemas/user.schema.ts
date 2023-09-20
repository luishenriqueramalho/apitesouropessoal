import { z } from "zod";

const userInput = {
  nomeCompleto: z.string(),
  email: z.string(),
  dataNascimento: z.string(),
  telefone: z.string(),
  password: z.string(),
  status: z.boolean(),
};

const userGenerated = {
  id: z.coerce.string(),
  createdAt: z.coerce.date(),
  //updatedAt: z.string(),
};

const createUserSchema = z.object({
  ...userInput,
});

const userResponseSchema = z.object({
  ...userInput,
  ...userGenerated,
});

const usersResponseSchema = z.array(userResponseSchema);

export type CreateUserInput = z.infer<typeof createUserSchema>;
