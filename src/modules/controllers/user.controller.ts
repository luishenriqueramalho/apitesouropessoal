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

const blacklistedTokens = new Set();

// CONSULTAR TODOS OS USUÁRIOS
export async function getUserHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const users = await getUsers();
    const data = {
      success: true,
      message: null,
      status: 200,
      data: users,
    };
    return reply.code(200).send(data);
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao consultar os usuários",
      error: error,
      status: 500,
      data: null,
    };
    return reply.code(500).send(data);
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
      return reply.code(401).send({
        success: false,
        message: "Credenciais inválidas!",
      });
    } else {
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "sua_chave_secreta",
      {
        expiresIn: "1h",
      }
    );

    const data = {
      success: true,
      message: "Login bem-sucedido",
      status: 200,
      data: token,
    };

    // Configurar o cabeçalho "Authorization" com o token
    reply.header("Authorization", `Bearer ${token}`);
    reply.header("Teste", "Teste-Header");

    return reply
      .code(200)
      .header("Authorization", `Bearer ${token}`)
      .send(data);
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: "Ocorreu um erro ao fazer login",
      error,
    });
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

      return reply.code(200).send({
        success: true,
        message: "Logout bem-sucedido!",
      });
    } else {
      return reply.code(400).send({
        success: false,
        message: "Token de autenticação ausente!",
      });
    }
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: "Ocorreu um erro ao fazer logout!",
      error,
    });
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
  }>
) {
  try {
    const { password, ...userData } = request.body;

    // Gerar um hash seguro para a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUsers({
      ...userData,
      password: hashedPassword,
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
      return reply.code(400).send({
        success: false,
        message: "ID inválido",
      });
    }

    // Deletar itens vinculados ao usuário
    await deleteCreditCardsByUserId(id);

    // Tente excluir o usuário
    const deletedUser = await deleteUsers(id);

    // Verifique se o usuário foi encontrado e excluído
    if (!deletedUser) {
      return reply.code(404).send({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    return reply.code(204).send();
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: "Ocorreu um erro ao deletar o usuário",
      error: error.message, // Capturar a mensagem de erro específica
    });
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
      return reply.code(400).send({
        success: false,
        message: "ID inválido!",
      });
    }

    // Buscar o usuário pelo ID
    const user = await getUserById(id);

    // Verificar se o usuário foi encontrado
    if (!user) {
      return reply.code(404).send({
        success: false,
        message: "Usuário não encontrado!",
      });
    }

    return reply.code(200).send({
      success: true,
      message: "Usuário encontrado com sucesso!",
      data: user,
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: "Ocorreu um erro ao buscar o usuário!",
      error: error.message,
    });
  }
}
