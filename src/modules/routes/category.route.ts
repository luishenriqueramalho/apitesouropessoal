import { FastifyInstance } from "fastify";
import {
  createCategoryHandler,
  deleteCategoryHandler,
  getCategoryHandler,
} from "../controllers/category.controller";
import { authRoutes } from "../middleware/auth.middleware";

async function categoryRoutes(app: FastifyInstance) {
  app.get("/api/category", authRoutes, getCategoryHandler);
  app.post("/api/category", createCategoryHandler);
  app.delete("/api/category/:id", deleteCategoryHandler);
}

export default categoryRoutes;
