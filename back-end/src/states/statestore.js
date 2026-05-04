const pool = require("../database/db");

// 🔍 Buscar estado atual do usuário
async function getState(userId) {
  const result = await pool.query(
    `SELECT estado_atual FROM sessoes WHERE usuario_id = $1`,
    [userId]
  );

  if (result.rows.length === 0) {
    return "INICIO"; // padrão
  }

  return result.rows[0].estado_atual;
}

// 💾 Salvar estado
async function setState(userId, state) {
  await pool.query(
    `
    INSERT INTO sessoes (usuario_id, estado_atual)
    VALUES ($1, $2)
    ON CONFLICT (usuario_id)
    DO UPDATE SET estado_atual = EXCLUDED.estado_atual,
                  atualizado_em = CURRENT_TIMESTAMP
    `,
    [userId, state]
  );
}

module.exports = {
  getState,
  setState
};