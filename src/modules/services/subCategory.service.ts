import { prisma } from "../../config/prisma";
import { CreateSubCategoryInput } from "../schemas/subCategory.schema";

export function getSubCategorys() {
  return prisma.subCategory.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
  });
}

export function createSubCategory(data: CreateSubCategoryInput) {
  return prisma.subCategory.create({ data });
}

export function deleteSubCategory(id: string) {
  return prisma.subCategory.delete({
    where: {
      id: id,
    },
  });
}
