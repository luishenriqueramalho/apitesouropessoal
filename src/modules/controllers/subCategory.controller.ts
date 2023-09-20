import { FastifyReply, FastifyRequest } from "fastify";
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategorys,
} from "../services/subCategory.service";
import { CreateSubCategoryInput } from "../schemas/subCategory.schema";

export async function getSubCategoryHandler() {
  try {
    const subCategory = await getSubCategorys();
    const data = {
      success: true,
      message: null,
      status: 200,
      data: subCategory,
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao consultar as sub-categorias!",
      error: error,
      status: 500,
      data: null,
    };
    return data;
  }
}

export async function createSubCategoryHandler(
  request: FastifyRequest<{
    Body: CreateSubCategoryInput;
  }>
) {
  try {
    const subCategory = await createSubCategory({
      ...request.body,
    });
    const data = {
      success: true,
      message: "A sub-categoria foi registrada com sucesso!",
      status: 201,
      data: subCategory,
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao cadastrar a sub-categoria!",
      error: error,
      status: 500,
      data: null,
    };
    return data;
  }
}

export async function deleteSubCategoryHandler(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request?.params;
    await deleteSubCategory(id);
    const data = {
      success: true,
      message: "Sub-categoria deletada com sucesso!",
      status: 204,
      data: null,
    };
    return reply.code(204).send(data);
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao deletar a sub-categoria!",
      error: error,
      status: 500,
      data: null,
    };
    return reply.code(500).send(data);
  }
}
