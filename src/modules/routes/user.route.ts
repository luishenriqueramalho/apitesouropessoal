import { FastifyInstance } from "fastify";
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  loginHandler,
} from "../controllers/user.controller";

async function userRoutes(app: FastifyInstance) {
  app.post("/api/login", loginHandler);
  app.addHook('preHandler', (req, rep, done) => {
    rep.header('Teste', 'key-teste')
    rep.header('Authorization', 'token_aqui')
    done()
  })
  app.get("/api/user", getUserHandler);
  app.post("/api/user", createUserHandler);
  app.delete("/api/user/:id", deleteUserHandler);
}

export default userRoutes;