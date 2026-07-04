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

async function authenticate(email, password) {
  if (!email || !password) {
    throw new Error("Email e senha são obrigatórios.");
  }

  const result = await pool.query(
    `SELECT id, nome, email, password_hash FROM usuarios WHERE email = $1`,
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error("Credenciais inválidas.");
  }

  const user = result.rows[0];

  if (!verifyPassword(password, user.password_hash)) {
    throw new Error("Credenciais inválidas.");
  }

  return {
    id: user.id,
    name: user.nome,
    email: user.email,
  };
}

async function createUser({ name, email, password }) {
  if (!name || !email || !password) {
    throw new Error("Nome, email e senha são obrigatórios.");
  }

  const existingUser = await pool.query(
    `SELECT id FROM usuarios WHERE email = $1`,
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("Este e-mail já está cadastrado.");
  }

  const passwordHash = hashPassword(password);

  const result = await pool.query(
    `
    INSERT INTO usuarios (nome, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, nome, email
    `,
    [name, email, passwordHash]
  );

  const createdUser = result.rows[0];

  return {
    id: createdUser.id,
    name: createdUser.nome,
    email: createdUser.email,
  };
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
  authenticate,
  createUser,
  getOrCreateUser,
};