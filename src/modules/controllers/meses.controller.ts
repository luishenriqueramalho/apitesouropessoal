import { FastifyReply, FastifyRequest } from "fastify";
import { createMeses, deleteMeses, getMeses } from "../services/meses.service";
import { CreateMesesInput } from "../schemas/meses.schema";

export async function getMesesHandler() {
  try {
    const meses = await getMeses();
    const data = {
      success: true,
      message: null,
      status: 200,
      data: meses,
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao consultar os meses!",
      error: error,
      status: 500,
      data: null,
    };
    return data;
  }
}

export async function createMesesHandler(
  request: FastifyRequest<{
    Body: CreateMesesInput;
  }>
) {
  try {
    const meses = await createMeses({ ...request.body });
    const data = {
      success: true,
      message: "O cartão de crédito foi registrado com sucesso!",
      status: 201,
      data: meses,
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao cadastrar o mês!",
      error: error,
      status: 500,
      data: null,
    };
    return data;
  }
}

export async function deleteMesesHandler(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request?.params;
    await deleteMeses(id);
    const data = {
      success: true,
      message: "Mês deletado com sucesso!",
      status: 204,
      data: null,
    };
    return reply.code(204).send(data);
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao deletar o mês!",
      error: error,
      status: 500,
      data: null,
    };
    return reply.code(500).send(data);
  }
}
