import { FastifyInstance } from "fastify";
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  loginHandler,
} from "../controllers/user.controller";
import { authRoutes } from "../middleware/auth.middleware";

async function userRoutes(app: FastifyInstance) {
  app.post("/api/login", loginHandler);
  app.get("/api/user", authRoutes, getUserHandler);
  app.post("/api/user", createUserHandler);
  app.delete("/api/user/:id", deleteUserHandler);
}

export default userRoutes;
