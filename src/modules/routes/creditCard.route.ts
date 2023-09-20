import { FastifyInstance } from "fastify";
import {
  createCreditCardHandler,
  deleteCreditCardHandler,
  getCreditCardHandler,
} from "../controllers/creditCard.controller";

async function creditCardRoutes(app: FastifyInstance) {
  app.get("/api/creditCard", getCreditCardHandler);
  app.post("/api/creditCard", createCreditCardHandler);
  app.delete("/api/creditCard/:id", deleteCreditCardHandler);
}

export default creditCardRoutes;
