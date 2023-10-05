import { verifyToken } from "./authVerify.middleware";

export const authRoutes = {
  preHandler: (request, reply, done) => {
    const token = request.headers.authorization?.replace(/^Bearer /, "");
    if (!token) reply.code(401).send({ message: "Token não autorizado!" });

    const user = verifyToken(token);
    if (!user) reply.code(404).send({ message: "Token inválido!" });
    request.user = user;
    done();
  },
};
