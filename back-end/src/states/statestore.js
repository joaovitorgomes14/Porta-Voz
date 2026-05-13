const pool = require("../database/db");


//Buscar estado atual
async function getState(userId) {

  const result = await pool.query(
    `SELECT estado_atual FROM sessoes WHERE usuario_id = $1`,
    [userId]
  );

  if (result.rows.length === 0) {
    return "INICIO";
  }

  return result.rows[0].estado_atual;
}


//Salvar estado
async function setState(userId, state) {

  await pool.query(
    `
    INSERT INTO sessoes (usuario_id, estado_atual)
    VALUES ($1, $2)

    ON CONFLICT (usuario_id)

    DO UPDATE SET
      estado_atual = EXCLUDED.estado_atual,
      atualizado_em = CURRENT_TIMESTAMP
    `,
    [userId, state]
  );
}


//Buscar dados do usuário
async function getUserData(userId) {

  const result = await pool.query(
    `
    SELECT dados_usuario
    FROM sessoes
    WHERE usuario_id = $1
    `,
    [userId]
  );

  if (result.rows.length === 0) {
    return {};
  }

  return result.rows[0].dados_usuario || {};
}


//Salvar dados do usuário
async function setUserData(userId, userData) {

  await pool.query(
    `
    UPDATE sessoes
    SET dados_usuario = $1,
        atualizado_em = CURRENT_TIMESTAMP
    WHERE usuario_id = $2
    `,
    [userData, userId]
  );
}


module.exports = {
  getState,
  setState,
  getUserData,
  setUserData
};