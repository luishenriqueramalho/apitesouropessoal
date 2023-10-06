import { prisma } from "../../config/prisma";
import { CreateUserPremiumInput } from "../schemas/userPremium.schema";

export function getUserPremiums() {
  return prisma.userPremium.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
  });
}

export function createUserPremium(data: CreateUserPremiumInput) {
  return prisma.userPremium.create({ data });
}

export function deleteUserPremium(id: string) {
  return prisma.userPremium.delete({
    where: {
      id: id,
    },
  });
}
