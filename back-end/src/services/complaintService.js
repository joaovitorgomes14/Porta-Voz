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
    [usuarioId, descricao, endereco?.rua || null, endereco?.numero ?? null, endereco?.bairro || null, status, prioridade, setor]
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

async function updateComplaint(id, updates) {
  const allowedFields = ["status", "prioridade", "setor"];
  const entries = Object.entries(updates).filter(([field]) => allowedFields.includes(field));

  if (entries.length === 0) {
    return false;
  }

  const setClause = entries.map(([field], index) => `${field} = $${index + 1}`).join(", ");
  const values = entries.map(([, value]) => value);
  values.push(id);

  const result = await pool.query(
    `UPDATE reclamacoes SET ${setClause} WHERE id = $${values.length} RETURNING id`,
    values
  );

  return result.rowCount > 0;
}

async function deleteComplaint(id) {
  const result = await pool.query("DELETE FROM reclamacoes WHERE id = $1 RETURNING id", [id]);
  return result.rowCount > 0;
}

module.exports = {
  saveComplaint,
  getAllComplaints,
  updateComplaint,
  deleteComplaint,
};
