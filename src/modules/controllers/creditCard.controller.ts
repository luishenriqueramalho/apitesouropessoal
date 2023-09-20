import { FastifyReply, FastifyRequest } from "fastify";
import {
  createCreditCard,
  deleteCreditCard,
  getCreditCards,
} from "../services/creditCard.service";
import { CreateCreditCardInput } from "../schemas/creditCard.schema";

export async function getCreditCardHandler() {
  try {
    const creditCard = await getCreditCards();
    const data = {
      success: true,
      message: null,
      status: 200,
      data: creditCard,
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao consultar os cartões de crédito!",
      error: error,
      status: 500,
      data: null,
    };
    return data;
  }
}

export async function createCreditCardHandler(
  request: FastifyRequest<{
    Body: CreateCreditCardInput;
  }>
) {
  try {
    const creditCard = await createCreditCard({
      ...request.body,
    });
    const data = {
      success: true,
      message: "O cartão de crédito foi registrado com sucesso!",
      status: 201,
      data: creditCard,
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao cadastrar o cartão de crédito!",
      error: error,
      status: 500,
      data: null,
    };
    return data;
  }
}

export async function deleteCreditCardHandler(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request?.params;
    await deleteCreditCard(id);
    const data = {
      success: true,
      message: "Cartão de crédito deletado com sucesso!",
      status: 204,
      data: null,
    };
    return reply.code(204).send(data);
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao deletar o cartão de crédito!",
      error: error,
      status: 500,
      data: null,
    };
    return reply.code(500).send(data);
  }
}
