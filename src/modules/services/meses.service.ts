import { prisma } from "../../config/prisma";
import { CreateMesesInput } from "../schemas/meses.schema";

export function getMeses() {
  return prisma.meses.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
  });
}

export function createMeses(data: CreateMesesInput) {
  return prisma.meses.create({ data });
}

export function deleteMeses(id: string) {
  return prisma.meses.delete({
    where: {
      id: id,
    },
  });
}
