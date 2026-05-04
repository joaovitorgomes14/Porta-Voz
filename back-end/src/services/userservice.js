const pool = require("../database/db");

// pega ou cria usuário
async function getOrCreateUser(externalId, plataforma = "telegram") {
  let result = await pool.query(
    `SELECT id FROM usuarios WHERE external_id = $1`,
    [externalId]
  );

  if (result.rows.length > 0) {
    return result.rows[0].id;
  }

  result = await pool.query(
    `
    INSERT INTO usuarios (external_id, plataforma)
    VALUES ($1, $2)
    RETURNING id
    `,
    [externalId, plataforma]
  );

  return result.rows[0].id;
}

module.exports = {
  getOrCreateUser
};