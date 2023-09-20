import { FastifyReply, FastifyRequest } from "fastify";
import { createUsers, deleteUsers, getUsers } from "../services/use.service";
import { CreateUserInput } from "../schemas/user.schema";

export async function getUserHandler() {
  try {
    const users = await getUsers();
    const data = {
      success: true,
      message: null,
      status: 200,
      data: users,
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao consultar os usuários",
      error: error,
      status: 500,
      data: null,
    };
    return data;
  }
}

export async function createUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>
) {
  try {
    const user = await createUsers({
      ...request.body,
    });
    const data = {
      success: true,
      message: "Usuário adicionado com sucesso!",
      status: 201,
      data: user,
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao criar o usuário",
      error: error,
      status: 500,
      data: null,
    };
    return data;
  }
}

export async function deleteUserHandler(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request?.params;

    await deleteUsers(id);
    return reply.code(204).send();
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao deletar o usuário",
      error: error,
      status: 500,
      data: null,
    };
    return reply.code(500).send(data);
  }
}
