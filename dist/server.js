"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_fastify = __toESM(require("fastify"));

// src/config/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/modules/services/use.service.ts
function getUsers() {
  return prisma.user.findMany({
    orderBy: [
      {
        id: "asc"
      }
    ]
  });
}
function createUsers(data) {
  return prisma.user.create({ data });
}
function deleteUsers(id) {
  return prisma.user.delete({
    where: {
      id
    }
  });
}
function findLoginByUser(email, id) {
  return prisma.user.findUnique({
    where: {
      id,
      email
    }
  });
}
function getUserById(id) {
  return prisma.user.findUnique({
    where: {
      id
    }
  });
}

// src/modules/controllers/user.controller.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

// src/modules/services/creditCard.service.ts
function getCreditCards() {
  return prisma.creditCard.findMany({
    orderBy: [
      {
        id: "asc"
      }
    ]
  });
}
function createCreditCard(data) {
  return prisma.creditCard.create({ data });
}
function deleteCreditCard(id) {
  return prisma.creditCard.delete({
    where: {
      id
    }
  });
}
function deleteCreditCardsByUserId(userId) {
  return prisma.creditCard.deleteMany({
    where: {
      userId
    }
  });
}

// src/modules/controllers/user.controller.ts
var blacklistedTokens = /* @__PURE__ */ new Set();
async function getUserHandler(request, reply) {
  try {
    const users = await getUsers();
    const data = {
      success: true,
      message: null,
      status: 200,
      data: users
    };
    return reply.code(200).send(data);
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao consultar os usu\xE1rios",
      error,
      status: 500,
      data: null
    };
    return reply.code(500).send(data);
  }
}
async function loginHandler(request, reply) {
  try {
    const { email, password, id } = request.body;
    const user = await findLoginByUser(email, id);
    if (!user || !await import_bcrypt.default.compare(password, user.password)) {
      return reply.code(401).send({
        success: false,
        message: "Credenciais inv\xE1lidas!"
      });
    } else {
    }
    const token = import_jsonwebtoken.default.sign(
      { userId: user.id, email: user.email },
      "sua_chave_secreta",
      {
        expiresIn: "1h"
      }
    );
    const data = {
      success: true,
      message: "Login bem-sucedido",
      status: 200,
      data: token
    };
    reply.header("Authorization", `Bearer ${token}`);
    reply.header("Teste", "Teste-Header");
    return reply.code(200).header("Authorization", `Bearer ${token}`).send(data);
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: "Ocorreu um erro ao fazer login",
      error
    });
  }
}
async function logoutHandler(request, reply) {
  try {
    const token = extractTokenFromHeader(request);
    if (token) {
      blacklistedTokens.add(token);
      return reply.code(200).send({
        success: true,
        message: "Logout bem-sucedido!"
      });
    } else {
      return reply.code(400).send({
        success: false,
        message: "Token de autentica\xE7\xE3o ausente!"
      });
    }
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: "Ocorreu um erro ao fazer logout!",
      error
    });
  }
}
function extractTokenFromHeader(request) {
  const authHeader = request.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  return null;
}
async function createUserHandler(request) {
  try {
    const { password, ...userData } = request.body;
    const hashedPassword = await import_bcrypt.default.hash(password, 10);
    const user = await createUsers({
      ...userData,
      password: hashedPassword
    });
    const data = {
      success: true,
      message: "Usu\xE1rio adicionado com sucesso!",
      status: 201,
      data: user
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao criar o usu\xE1rio",
      error,
      status: 500,
      data: null
    };
    return data;
  }
}
async function deleteUserHandler(request, reply) {
  try {
    const { id } = request.params;
    if (!id) {
      return reply.code(400).send({
        success: false,
        message: "ID inv\xE1lido"
      });
    }
    await deleteCreditCardsByUserId(id);
    const deletedUser = await deleteUsers(id);
    if (!deletedUser) {
      return reply.code(404).send({
        success: false,
        message: "Usu\xE1rio n\xE3o encontrado"
      });
    }
    return reply.code(204).send();
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: "Ocorreu um erro ao deletar o usu\xE1rio",
      error: error.message
      // Capturar a mensagem de erro específica
    });
  }
}
async function getUserByIdHandler(request, reply) {
  try {
    const { id } = request.params;
    if (!id) {
      return reply.code(400).send({
        success: false,
        message: "ID inv\xE1lido!"
      });
    }
    const user = await getUserById(id);
    if (!user) {
      return reply.code(404).send({
        success: false,
        message: "Usu\xE1rio n\xE3o encontrado!"
      });
    }
    return reply.code(200).send({
      success: true,
      message: "Usu\xE1rio encontrado com sucesso!",
      data: user
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: "Ocorreu um erro ao buscar o usu\xE1rio!",
      error: error.message
    });
  }
}

// src/modules/middleware/authVerify.middleware.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var verifyToken = (token) => {
  const decodedToken = import_jsonwebtoken2.default.verify(token, "sua_chave_secreta");
  const user = findLoginByUser(decodedToken.email, decodedToken.id);
  return user;
};

// src/modules/middleware/auth.middleware.ts
var authRoutes = {
  preHandler: (request, reply, done) => {
    const token = request.headers.authorization?.replace(/^Bearer /, "");
    if (!token)
      reply.code(401).send({ message: "Token n\xE3o autorizado!" });
    const user = verifyToken(token);
    if (!user)
      reply.code(404).send({ message: "Token inv\xE1lido!" });
    request.user = user;
    done();
  }
};

// src/modules/routes/user.route.ts
async function userRoutes(app2) {
  app2.get("/api/user", authRoutes, getUserHandler);
  app2.get("/api/findUser/:id", getUserByIdHandler);
  app2.post("/api/login", loginHandler);
  app2.post("/api/logout", logoutHandler);
  app2.post("/api/user", createUserHandler);
  app2.delete("/api/user/:id", deleteUserHandler);
}
var user_route_default = userRoutes;

// src/modules/services/userPremium.service.ts
function getUserPremiums() {
  return prisma.userPremium.findMany({
    orderBy: [
      {
        id: "asc"
      }
    ]
  });
}
function createUserPremium(data) {
  return prisma.userPremium.create({ data });
}

// src/modules/controllers/userPremium.controller.ts
async function getUserPremiumHandler(request, reply) {
  try {
    const userPremium = await getUserPremiums();
    const data = {
      success: true,
      message: null,
      status: 200,
      data: userPremium
    };
    return reply.code(200).send(data);
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao consultar os registros de usu\xE1rios premium!",
      error,
      status: 500,
      data: null
    };
    return reply.code(500).send(data);
  }
}
async function createUserPremiumHandler(request) {
  try {
    const userPremium = await createUserPremium({
      ...request.body
    });
    const data = {
      success: true,
      message: "O usu\xE1rio foi registrado como premium!",
      status: 201,
      data: userPremium
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao registrar o usu\xE1rio como premium!",
      error,
      status: 500,
      data: null
    };
    return data;
  }
}

// src/modules/routes/userPremium.route.ts
async function userPremiumRoutes(app2) {
  app2.get("/api/userPremium", getUserPremiumHandler);
  app2.post("/api/userPremium", createUserPremiumHandler);
}
var userPremium_route_default = userPremiumRoutes;

// src/modules/controllers/creditCard.controller.ts
async function getCreditCardHandler() {
  try {
    const creditCard = await getCreditCards();
    const data = {
      success: true,
      message: null,
      status: 200,
      data: creditCard
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao consultar os cart\xF5es de cr\xE9dito!",
      error,
      status: 500,
      data: null
    };
    return data;
  }
}
async function createCreditCardHandler(request) {
  try {
    const creditCard = await createCreditCard({
      ...request.body
    });
    const data = {
      success: true,
      message: "O cart\xE3o de cr\xE9dito foi registrado com sucesso!",
      status: 201,
      data: creditCard
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao cadastrar o cart\xE3o de cr\xE9dito!",
      error,
      status: 500,
      data: null
    };
    return data;
  }
}
async function deleteCreditCardHandler(request, reply) {
  try {
    const { id } = request?.params;
    await deleteCreditCard(id);
    const data = {
      success: true,
      message: "Cart\xE3o de cr\xE9dito deletado com sucesso!",
      status: 204,
      data: null
    };
    return reply.code(204).send(data);
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao deletar o cart\xE3o de cr\xE9dito!",
      error,
      status: 500,
      data: null
    };
    return reply.code(500).send(data);
  }
}

// src/modules/routes/creditCard.route.ts
async function creditCardRoutes(app2) {
  app2.get("/api/creditCard", authRoutes, getCreditCardHandler);
  app2.post("/api/creditCard", authRoutes, createCreditCardHandler);
  app2.delete("/api/creditCard/:id", authRoutes, deleteCreditCardHandler);
}
var creditCard_route_default = creditCardRoutes;

// src/modules/services/meses.service.ts
function getMeses() {
  return prisma.meses.findMany({
    orderBy: [
      {
        id: "asc"
      }
    ]
  });
}
function createMeses(data) {
  return prisma.meses.create({ data });
}
function deleteMeses(id) {
  return prisma.meses.delete({
    where: {
      id
    }
  });
}

// src/modules/controllers/meses.controller.ts
async function getMesesHandler() {
  try {
    const meses = await getMeses();
    const data = {
      success: true,
      message: null,
      status: 200,
      data: meses
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao consultar os meses!",
      error,
      status: 500,
      data: null
    };
    return data;
  }
}
async function createMesesHandler(request) {
  try {
    const meses = await createMeses({ ...request.body });
    const data = {
      success: true,
      message: "O cart\xE3o de cr\xE9dito foi registrado com sucesso!",
      status: 201,
      data: meses
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao cadastrar o m\xEAs!",
      error,
      status: 500,
      data: null
    };
    return data;
  }
}
async function deleteMesesHandler(request, reply) {
  try {
    const { id } = request?.params;
    await deleteMeses(id);
    const data = {
      success: true,
      message: "M\xEAs deletado com sucesso!",
      status: 204,
      data: null
    };
    return reply.code(204).send(data);
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao deletar o m\xEAs!",
      error,
      status: 500,
      data: null
    };
    return reply.code(500).send(data);
  }
}

// src/modules/routes/meses.route.ts
async function mesesRoutes(app2) {
  app2.get("/api/meses", getMesesHandler);
  app2.post("/api/mes", createMesesHandler);
  app2.delete("/api/mes/:id", deleteMesesHandler);
}
var meses_route_default = mesesRoutes;

// src/modules/services/category.service.ts
function getCategorys() {
  return prisma.category.findMany({
    orderBy: [
      {
        id: "asc"
      }
    ]
  });
}
function createCategory(data) {
  return prisma.category.create({ data });
}
function deleteCategory(id) {
  return prisma.category.delete({
    where: {
      id
    }
  });
}

// src/modules/controllers/category.controller.ts
async function getCategoryHandler() {
  try {
    const category = await getCategorys();
    const data = {
      success: true,
      message: null,
      status: 200,
      data: category
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao consultar as categorias!",
      error,
      status: 500,
      data: null
    };
    return data;
  }
}
async function createCategoryHandler(request) {
  try {
    const category = await createCategory({
      ...request.body
    });
    const data = {
      success: true,
      message: "A categoria foi registrada com sucesso!",
      status: 201,
      data: category
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao cadastrar a categoria!",
      error,
      status: 500,
      data: null
    };
    return data;
  }
}
async function deleteCategoryHandler(request, reply) {
  try {
    const { id } = request?.params;
    await deleteCategory(id);
    const data = {
      success: true,
      message: "Categoria deletada com sucesso!",
      status: 204,
      data: null
    };
    return reply.code(204).send(data);
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao deletar a categoria!",
      error,
      status: 500,
      data: null
    };
    return reply.code(500).send(data);
  }
}

// src/modules/routes/category.route.ts
async function categoryRoutes(app2) {
  app2.get("/api/category", authRoutes, getCategoryHandler);
  app2.post("/api/category", createCategoryHandler);
  app2.delete("/api/category/:id", deleteCategoryHandler);
}
var category_route_default = categoryRoutes;

// src/modules/services/subCategory.service.ts
function getSubCategorys() {
  return prisma.subCategory.findMany({
    orderBy: [
      {
        id: "asc"
      }
    ]
  });
}
function createSubCategory(data) {
  return prisma.subCategory.create({ data });
}
function deleteSubCategory(id) {
  return prisma.subCategory.delete({
    where: {
      id
    }
  });
}

// src/modules/controllers/subCategory.controller.ts
async function getSubCategoryHandler() {
  try {
    const subCategory = await getSubCategorys();
    const data = {
      success: true,
      message: null,
      status: 200,
      data: subCategory
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao consultar as sub-categorias!",
      error,
      status: 500,
      data: null
    };
    return data;
  }
}
async function createSubCategoryHandler(request) {
  try {
    const subCategory = await createSubCategory({
      ...request.body
    });
    const data = {
      success: true,
      message: "A sub-categoria foi registrada com sucesso!",
      status: 201,
      data: subCategory
    };
    return data;
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao cadastrar a sub-categoria!",
      error,
      status: 500,
      data: null
    };
    return data;
  }
}
async function deleteSubCategoryHandler(request, reply) {
  try {
    const { id } = request?.params;
    await deleteSubCategory(id);
    const data = {
      success: true,
      message: "Sub-categoria deletada com sucesso!",
      status: 204,
      data: null
    };
    return reply.code(204).send(data);
  } catch (error) {
    const data = {
      success: false,
      message: "Ocorreu um erro ao deletar a sub-categoria!",
      error,
      status: 500,
      data: null
    };
    return reply.code(500).send(data);
  }
}

// src/modules/routes/subCategory.route.ts
async function subCategoryRoutes(app2) {
  app2.get("/api/subCategory", getSubCategoryHandler);
  app2.post("/api/subCategory", createSubCategoryHandler);
  app2.delete("/api/subCategory/:id", deleteSubCategoryHandler);
}
var subCategory_route_default = subCategoryRoutes;

// src/server.ts
var app = (0, import_fastify.default)();
app.register(user_route_default);
app.register(userPremium_route_default);
app.register(creditCard_route_default);
app.register(meses_route_default);
app.register(category_route_default);
app.register(subCategory_route_default);
app.get("/", async (req, res) => {
  return {
    status: "Online",
    server: "http://localhost:4444",
    message: "Bem-vindo"
  };
});
app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 4444
}).then(() => {
  console.log("Servidor online!");
});
