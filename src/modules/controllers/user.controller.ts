import { FastifyReply, FastifyRequest } from "fastify";
import {
  createUsers,
  deleteUsers,
  findLoginByUser,
  getUserById,
  getUsers,
} from "../services/use.service";
import { CreateUserInput } from "../schemas/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { deleteCreditCardsByUserId } from "../services/creditCard.service";
import { sendSuccess } from "../../config/objSendSuccess";
import { sendError } from "../../config/objSendError";

const blacklistedTokens = new Set();

// CONSULTAR TODOS OS USUÁRIOS
export async function getUserHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const users = await getUsers();

    return reply.code(200).send(sendSuccess(null, 200, users));
  } catch (error) {
    return reply
      .code(500)
      .send(sendError("Ocorreu um erro ao consultar o usuário", 500, null));
  }
}

// REALIZAR LOGIN
export async function loginHandler(
  request: FastifyRequest<{
    Body: {
      email: string;
      password: string;
      id: string;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const { email, password, id } = request.body;

    const user = await findLoginByUser(email, id);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return reply.code(401).send(sendError("Crenciais inválidas!", 401, null));
    } else {
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "sua_chave_secreta",
      {
        expiresIn: "1h",
      }
    );

    // Configurar o cabeçalho "Authorization" com o token
    reply.header("Authorization", `Bearer ${token}`);
    reply.header("Teste", "Teste-Header");

    return reply
      .code(200)
      .header("Authorization", `Bearer ${token}`)
      .send(sendSuccess("Login bem-sucedido!", 200, token));
  } catch (error) {
    return reply
      .code(500)
      .send(sendError("Ocorreu um erro ao fazer login", 500, null));
  }
}

// REALIZAR LOGOUT
export async function logoutHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const token = extractTokenFromHeader(request);

    if (token) {
      blacklistedTokens.add(token);

      return reply
        .code(200)
        .send(sendSuccess("Logout bem-sucedido!", 200, null));
    } else {
      return reply
        .code(400)
        .send(sendError("Token de autenticação ausente!", 400, null));
    }
  } catch (error) {
    return reply
      .code(500)
      .send(sendError("Ocorreu um erro ao fazer logout!", 500, null));
  }
}

// FUNÇÃO AUXILIAR PARA EXTRAIR O TOKEN DO HEADERS "AUTHORIZATION"
function extractTokenFromHeader(request: FastifyRequest) {
  const authHeader = request.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7); // Remove o prefixo "Bearer "
  }
  return null;
}

// CRIAR UM NOVO USUÁRIO
export async function createUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  try {
    const { password, ...userData } = request.body;

    // Gerar um hash seguro para a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUsers({
      ...userData,
      password: hashedPassword,
    });

    reply
      .code(200)
      .send(sendSuccess("Usuário adicionado com sucesso!", 200, user));
  } catch (error) {
    reply
      .code(500)
      .send(sendError("Ocorreu um erro ao criar o usuário!", 500, null));
  }
}

// DELETAR UM USUÁRIO
export async function deleteUserHandler(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;

    // Valide se o ID é uma string não vazia
    if (!id) {
      return reply.code(400).send(sendError("ID inválido!", 400, null));
    }

    // Deletar itens vinculados ao usuário
    await deleteCreditCardsByUserId(id);

    // Tente excluir o usuário
    const deletedUser = await deleteUsers(id);

    // Verifique se o usuário foi encontrado e excluído
    if (!deletedUser) {
      return reply
        .code(404)
        .send(sendError("Usuário não encontrado!", 404, null));
    }

    return reply
      .code(204)
      .send(sendSuccess("Usuário deletado com sucesso!", 204, null));
  } catch (error) {
    return reply
      .code(500)
      .send(sendError("Ocorreu um erro ao deletar o usuário", 500, null));
  }
}

// CONSULTAR APENAS 1 USUÁRIO ESPECIFICO
export async function getUserByIdHandler(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;

    // Validação se o ID é uma string não vazia
    if (!id) {
      return reply.code(400).send(sendError("ID inválido!", 400, null));
    }

    // Buscar o usuário pelo ID
    const user = await getUserById(id);

    // Verificar se o usuário foi encontrado
    if (!user) {
      return reply
        .code(404)
        .send(sendError("Usuário não encontrado", 404, null));
    }

    return reply
      .code(200)
      .send(sendSuccess("Usuário encontrado com sucesso!", 200, user));
  } catch (error) {
    return reply
      .code(500)
      .send(sendError("Ocorreu um erro ao buscar o usuário!", 500, null));
  }
}
