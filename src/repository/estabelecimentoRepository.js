import con from "./connection.js";

export async function createEstabelecimento(course) {
  let { endereco, descricao, predio, metragem, diaria, imagem } = course;

  let query = `
    INSERT INTO estabelecimentos (endereco, descricao, predio, metragem, preco, imagem) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  let response = await con.query(query, [endereco, descricao, predio, metragem, diaria, imagem]);
  let info = response[0];

  course.id = info.insertId;
  return course;
}

export async function updateEstabelecimento(courseId, updatedCourseData) {
  const { endereco, descricao, predio, metragem, diaria, imagem } = updatedCourseData;

  let query = `
    UPDATE estabelecimentos
    SET endereco = ?, descricao = ?, predio = ?, metragem = ?, preco = ?, imagem = ? 
    WHERE id = ?
  `;

  let response = await con.query(query, [
    endereco, descricao, predio, metragem, diaria, imagem,
    courseId,
  ]);
  return response[0].affectedRows > 0;
}

export async function deleteEstabeleciemento(courseId) {
  let query = `
    DELETE FROM estabelecimentos
    WHERE id = ?
  `;

  let response = await con.query(query, [courseId]);
  return response[0].affectedRows > 0;
}

export async function getEstabelecimentoById(courseId) {
  let query = `
    SELECT * FROM estabelecimentos
    WHERE id = ?
  `;

  let response = await con.query(query, [courseId]);
  let courses = response[0];

  if (courses.length > 0) {
    return courses[0];
  } else {
    return null;
  }
}

export async function listEstabelecimentos() {
  let query = `
    SELECT * FROM estabelecimentos
  `;

  let response = await con.query(query);
  return response[0];
}
