import { FastifyReply, FastifyRequest } from "fastify";
import {
  createUserPremium,
  deleteUserPremium,
  getUserPremiums,
} from "../services/userPremium.service";
import { CreateUserPremiumInput } from "../schemas/userPremium.schema";

export async function getUserPremiumHandler() {
  try {
    const userPremium = await getUserPremiums();
    const data = {
      success: true,
      message: null,
      status: 200,
      data: userPremium,
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao consultar os registros de usuários premium!",
      error: error,
      status: 500,
      data: null,
    };
    return data;
  }
}

export async function createUserPremiumHandler(
  request: FastifyRequest<{
    Body: CreateUserPremiumInput;
  }>
) {
  try {
    const userPremium = await createUserPremium({
      ...request.body,
    });
    const data = {
      success: true,
      message: "O usuário foi registrado como premium!",
      status: 201,
      data: userPremium,
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao registrar o usuário como premium!",
      error: error,
      status: 500,
      data: null,
    };
    return data;
  }
}

export async function deleteUserPremiumHandler(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request?.params;
    await deleteUserPremium(id);
    const data = {
      success: true,
      message: "Registro Premium deletado com sucesso!",
      status: 204,
      data: null,
    };
    return reply.code(204).send(data);
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao deletar o registro Premium!",
      error: error,
      status: 500,
      data: null,
    };
    return reply.code(500).send(data);
  }
}
