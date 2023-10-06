import { FastifyInstance } from "fastify";
import {
  createUserHandler,
  deleteUserHandler,
  getUserByIdHandler,
  getUserHandler,
  loginHandler,
  logoutHandler,
} from "../controllers/user.controller";
import { authRoutes } from "../middleware/auth.middleware";

async function userRoutes(app: FastifyInstance) {
  app.get("/api/user", authRoutes, getUserHandler);
  app.get("/api/findUser/:id", getUserByIdHandler);

  app.post("/api/login", loginHandler);
  app.post("/api/logout", logoutHandler);
  app.post("/api/user", createUserHandler);

  app.delete("/api/user/:id", deleteUserHandler);
}

export default userRoutes;
