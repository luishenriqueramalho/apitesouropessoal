import jwt from 'jsonwebtoken';
import { FastifyReply, FastifyRequest } from 'fastify';

export const verifyToken = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const token = request.headers['authorization'];
    console.log('TOKEN AQUI >>>', token)

    if (!token) {
      throw new Error('Token não fornecido');
    }

    // Verificar e decodificar o token JWT
    const decodedToken = jwt.verify(token, 'sua_chave_secreta');

    // Adicionar o token decodificado à solicitação para uso posterior
    request['decodedToken'] = decodedToken;

    return decodedToken;

  } catch (error) {
    reply.code(401).send({
      success: false,
      message: 'Token inválido ou expirado',
    });
  }
};