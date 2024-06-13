import {
  createContato,
  listContatos,
} from "../repository/contatosRepository.js";
import { Router } from "express";

let router = Router();

router.post("/contatos/create", async (req, resp) => {
  let { nome, cpf, whatsapp, principal_servico } = req.body;

  if (
    !nome ||
    !cpf ||
    !whatsapp ||
    !principal_servico
  ) {
    return resp
      .status(400)
      .send("Invalid request. Check the data sent and try again.");
  }

  let contato = await createContato({
    nome, cpf, whatsapp, principal_servico
  });

  return resp.status(201).send(contato);
});

router.get("/contatos/list", async (req, resp) => {
  let teachers = await listContatos();
  return resp.status(200).send(teachers);
});

export default router
