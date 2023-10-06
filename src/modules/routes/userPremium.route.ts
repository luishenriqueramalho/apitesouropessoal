import { FastifyInstance } from "fastify";
import {
  createUserPremiumHandler,
  getUserPremiumHandler,
} from "../controllers/userPremium.controller";

async function userPremiumRoutes(app: FastifyInstance) {
  app.get("/api/userPremium", getUserPremiumHandler);
  app.post("/api/userPremium", createUserPremiumHandler);
}

export default userPremiumRoutes;
