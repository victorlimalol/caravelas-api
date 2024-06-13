import 'dotenv/config'

import adminController from "./controller/adminController.js";
import agendamentoController from "./controller/agendamentoController.js";
import contatosController from "./controller/contatosController.js";
import estabelecimentosController from "./controller/estabelecimentosController.js";

import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/storage/produto', express.static('storage/produto'));

app.use(adminController);
app.use(agendamentoController);
app.use(contatosController);
app.use(estabelecimentosController);

let port = process.env.PORT;
app.listen(port, () => console.log("API SUBIU!"));
