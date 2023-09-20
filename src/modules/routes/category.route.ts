import { FastifyInstance } from "fastify";
import {
  createCategoryHandler,
  deleteCategoryHandler,
  getCategoryHandler,
} from "../controllers/category.controller";

async function categoryRoutes(app: FastifyInstance) {
  app.get("/api/category", getCategoryHandler);
  app.post("/api/category", createCategoryHandler);
  app.delete("/api/category/:id", deleteCategoryHandler);
}

export default categoryRoutes;
