import jwt from "jsonwebtoken";
import { findLoginByUser } from "../services/use.service";

export const verifyToken = (token: string) => {
  const decodedToken = jwt.verify(token, "sua_chave_secreta");

  const user = findLoginByUser(decodedToken.email, decodedToken.id);
  return user;
};
