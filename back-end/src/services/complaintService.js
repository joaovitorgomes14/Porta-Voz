const pool = require("../database/db");

async function saveComplaint(usuarioId, complaint) {
  const { descricao, endereco, status = "Pendente", prioridade = "Média", setor = "Não definido" } = complaint;

  const result = await pool.query(
    `
      INSERT INTO reclamacoes
        (usuario_id, descricao, rua, numero, bairro, status, prioridade, setor)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `,
    [usuarioId, descricao, endereco.rua, endereco.numero, endereco.bairro, status, prioridade, setor]
  );

  return result.rows[0].id;
}

async function getAllComplaints() {
  const result = await pool.query(
    `
      SELECT
        r.id,
        r.descricao,
        r.rua,
        r.numero,
        r.bairro,
        r.status,
        r.prioridade,
        r.setor,
        r.criado_em,
        u.nome,
        u.email
      FROM reclamacoes r
      LEFT JOIN usuarios u ON u.id = r.usuario_id
      ORDER BY r.criado_em DESC
    `
  );

  return result.rows;
}

module.exports = {
  saveComplaint,
  getAllComplaints,
};
