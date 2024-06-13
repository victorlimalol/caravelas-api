import con from "./connection.js";

export async function criarAgendamento(agendamento) {
  const {
    nome,
    cpf,
    telefone,
    dataMarcada,
    estabelecimento_id
  } = agendamento;

  const comando = `
    INSERT INTO agendamentos (nome,cpf,telefone,dataMarcada,estabelecimento_id) 
    VALUES (?, ?, ?, ?, ?)
  `;

  const resp = await con.query(comando, [
    nome,
    cpf,
    telefone,
    dataMarcada,
    estabelecimento_id
  ]);
  const info = resp[0];

  agendamento.id = info.insertId;
  return agendamento;
}

export async function listarAgendamentos() {
  let comando = `
      SELECT * FROM agendamentos
    `;

  let resp = await con.query(comando);
  return resp[0];
}

export async function listarAgendamentosPorEstabelecimento(categoryId) {
  const comando = `
    SELECT * FROM agendamentos
    WHERE estabelecimento_id = ?
  `;

  const resp = await con.query(comando, [categoryId]);
  return resp[0];
}

export async function deletarAgendamento(agendamentoId) {
  const comando = `
    DELETE FROM agendamentos
    WHERE id = ?
  `;

  const resp = await con.query(comando, [agendamentoId]);
  return resp[0].affectedRows > 0;
}

export async function atualizarAgendamento(
  agendamentoId,
  dadosProdutoAtualizados
) {
  const {
    nome,
    cpf,
    telefone,
    dataMarcada,
    estabelecimento_id
  } = dadosProdutoAtualizados;

  const comando = `
    UPDATE agendamentos
    SET nome = ?, cpf = ?, telefone = ?, dataMarcada = ?, estabelecimento_id = ?
    WHERE id = ?
  `;

  const resp = await con.query(comando, [
    nome,
    cpf,
    telefone,
    dataMarcada,
    estabelecimento_id,
    agendamentoId
  ]);
  return resp[0].affectedRows > 0;
}
