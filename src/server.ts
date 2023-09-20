import fastify from "fastify";
import userRoutes from "./modules/routes/user.route";
import userPremiumRoutes from "./modules/routes/userPremium.route";
import creditCardRoutes from "./modules/routes/creditCard.route";
import mesesRoutes from "./modules/routes/meses.route";
import categoryRoutes from "./modules/routes/category.route";
import subCategoryRoutes from "./modules/routes/subCategory.route";

const app = fastify();

app.register(userRoutes);
app.register(userPremiumRoutes);
app.register(creditCardRoutes);
app.register(mesesRoutes);
app.register(categoryRoutes);
app.register(subCategoryRoutes);

app.get("/", async (req, res) => {
  return {
    status: "Online",
    server: "http://localhost:3333",
    message: "Bem-vindo",
  };
});

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => {
    console.log("Servidor online!");
  });
