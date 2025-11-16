import express, { request, response } from "express";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename));


import mongoose from "mongoose";
import VendaMensal from "./VendaMensal.js";

dotenv.config();

const app = express();
const PORT = 3000;

//Middleware uma função que trata as informações recebidas
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


const connetDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado ao mongoDB");
  } catch (error) {
    console.log("Deu erro ao conectar ao MongoDB", error);
  }
};

connetDB();

//create
app.post("/vendas", async (request, response) => {
  try {
    const novaVendaMensal = await VendaMensal.create(request.body);
    response.json(novaVendaMensal);
  } catch (error) {
    response.json({ error: error });
  }
});

//Buscar vendas
app.get("/vendas", async (request, response) => {
  try {
    const vendasMensais = await VendaMensal.find();
    response.json(vendasMensais);
  } catch (error) {
    response.json({ error: error });
  }
});

//update
app.put("/vendas/:id", async (request, response) => {
  // request.params.id
  try {
    const novaVendaMensal = await VendaMensal.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    response.json(novaVendaMensal);
  } catch (error) {
    response.json({ error: error });
  }
});

//Delete
app.delete("/vendas/:id", async (request, response) => {
  // request.params.id
  try {
    const vendaMensalExcluida = await VendaMensal.findByIdAndDelete(
      request.params.id
    );

    response.json(vendaMensalExcluida);
  } catch (error) {
    response.json({ error: error });
  }
});

app.listen(PORT, () => console.log(`o servidor está rodando na porta ${PORT}`));
