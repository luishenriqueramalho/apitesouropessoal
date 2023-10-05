import { FastifyInstance } from "fastify";
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  loginHandler,
} from "../controllers/user.controller";
import { authRoutes } from "../middleware/auth.middleware";

/* const authRoutes = {
  preHandler: (request, reply, done) => {
    const token = request.headers.authorization?.replace(/^Bearer /, "");
    if (!token) reply.code(401).send({ message: "Token não autorizado!" });

    const user = verifyToken(token);
    if (!user) reply.code(404).send({ message: "Token inválido!" });
    request.user = user;
    done();
  },
}; */

async function userRoutes(app: FastifyInstance) {
  app.post("/api/login", loginHandler);
  app.get("/api/user", authRoutes, getUserHandler);
  //app.get("/api/user", getUserHandler);
  app.post("/api/user", createUserHandler);
  app.delete("/api/user/:id", deleteUserHandler);
}

export default userRoutes;
