import { prisma } from "../../config/prisma";
import { CreateUserInput } from "../schemas/user.schema";

export function getUsers() {
  return prisma.user.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
  });
}

export function createUsers(data: CreateUserInput) {
  return prisma.user.create({ data });
}

export function deleteUsers(id: string) {
  return prisma.user.delete({
    where: {
      id: id,
    },
  });
}

export function findLoginByUser(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email
    }
  })
}