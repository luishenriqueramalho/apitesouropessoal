import { FastifyInstance } from "fastify";
import {
  createMesesHandler,
  deleteMesesHandler,
  getMesesHandler,
} from "../controllers/meses.controller";

async function mesesRoutes(app: FastifyInstance) {
  app.get("/api/meses", getMesesHandler);
  app.post("/api/mes", createMesesHandler);
  app.delete("/api/mes/:id", deleteMesesHandler);
}

export default mesesRoutes;
