import con from "./connection.js";

export async function createContato(contato) {
  let { nome, cpf, whatsapp, principal_servico } = contato;

  let query = `
    INSERT INTO contatos (nome, cpf, whatsapp, principal_servico) 
    VALUES (?, ?, ?, ?)
  `;

  let response = await con.query(query, [
    nome, cpf, whatsapp, principal_servico
  ]);
  let info = response[0];

  contato.id = info.insertId;
  return contato;
}

export async function listContatos() {
  let comando = `
    SELECT * FROM contatos
  `;

  const resposta = await con.query(comando);
  return resposta[0];
}