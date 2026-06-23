const crypto = require("crypto");
const pool = require("../database/db");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derivedKey}`;
}

function verifyPassword(password, storedHash) {
  if (!storedHash) {
    return false;
  }

  const [salt, key] = storedHash.split(":");
  if (!salt || !key) {
    return false;
  }

  const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(key, "hex"), Buffer.from(derivedKey, "hex"));
}

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