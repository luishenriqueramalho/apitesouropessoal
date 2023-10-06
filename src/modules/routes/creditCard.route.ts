import { FastifyInstance } from "fastify";
import {
  createCreditCardHandler,
  deleteCreditCardHandler,
  getCreditCardHandler,
} from "../controllers/creditCard.controller";
import { authRoutes } from "../middleware/auth.middleware";

async function creditCardRoutes(app: FastifyInstance) {
  app.get("/api/creditCard", authRoutes, getCreditCardHandler);
  app.post("/api/creditCard", authRoutes, createCreditCardHandler);
  app.delete("/api/creditCard/:id", authRoutes, deleteCreditCardHandler);
}

export default creditCardRoutes;
