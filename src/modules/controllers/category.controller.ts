import { FastifyReply, FastifyRequest } from "fastify";
import {
  createCategory,
  deleteCategory,
  getCategorys,
} from "../services/category.service";
import { CreateCategoryInput } from "../schemas/category.schema";

export async function getCategoryHandler() {
  try {
    const category = await getCategorys();
    const data = {
      success: true,
      message: null,
      status: 200,
      data: category,
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao consultar as categorias!",
      error: error,
      status: 500,
      data: null,
    };
    return data;
  }
}

export async function createCategoryHandler(
  request: FastifyRequest<{
    Body: CreateCategoryInput;
  }>
) {
  try {
    const category = await createCategory({
      ...request.body,
    });
    const data = {
      success: true,
      message: "A categoria foi registrada com sucesso!",
      status: 201,
      data: category,
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao cadastrar a categoria!",
      error: error,
      status: 500,
      data: null,
    };
    return data;
  }
}

export async function deleteCategoryHandler(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request?.params;
    await deleteCategory(id);
    const data = {
      success: true,
      message: "Categoria deletada com sucesso!",
      status: 204,
      data: null,
    };
    return reply.code(204).send(data);
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao deletar a categoria!",
      error: error,
      status: 500,
      data: null,
    };
    return reply.code(500).send(data);
  }
}
