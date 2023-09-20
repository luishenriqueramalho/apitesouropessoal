import { prisma } from "../../config/prisma";
import { CreateCategoryInput } from "../schemas/category.schema";

export function getCategorys() {
  return prisma.category.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
  });
}

export function createCategory(data: CreateCategoryInput) {
  return prisma.category.create({ data });
}

export function deleteCategory(id: string) {
  return prisma.category.delete({
    where: {
      id: id,
    },
  });
}
