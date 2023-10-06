import { FastifyInstance } from "fastify";
import {
  createSubCategoryHandler,
  deleteSubCategoryHandler,
  getSubCategoryHandler,
} from "../controllers/subCategory.controller";

async function subCategoryRoutes(app: FastifyInstance) {
  app.get("/api/subCategory", getSubCategoryHandler);
  app.post("/api/subCategory", createSubCategoryHandler);
  app.delete("/api/subCategory/:id", deleteSubCategoryHandler);
}

export default subCategoryRoutes;
