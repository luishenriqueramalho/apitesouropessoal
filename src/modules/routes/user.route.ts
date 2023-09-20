import { FastifyInstance } from "fastify";
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
} from "../controllers/user.controller";

async function userRoutes(app: FastifyInstance) {
  app.get("/api/user", getUserHandler);
  app.post("/api/user", createUserHandler);
  app.delete("/api/user/:id", deleteUserHandler);
}

export default userRoutes;
