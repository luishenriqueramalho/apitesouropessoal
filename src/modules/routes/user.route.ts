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
  app.get("/api/user", getUserHandler);
  app.get("/api/findUser/:id", authRoutes, getUserByIdHandler);

  app.post("/api/login", loginHandler);
  app.post("/api/logout", logoutHandler); // TODO
  app.post("/api/user", createUserHandler);

  app.delete("/api/user/:id", authRoutes, deleteUserHandler);
}

export default userRoutes;
