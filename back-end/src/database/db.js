require('dotenv').config()

const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
})

async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      nome TEXT,
      email TEXT UNIQUE,
      password_hash TEXT,
      external_id TEXT UNIQUE,
      plataforma TEXT,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sessoes (
      usuario_id INTEGER PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
      estado_atual TEXT NOT NULL DEFAULT 'INICIO',
      dados_usuario JSONB,
      atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS reclamacoes (
      id SERIAL PRIMARY KEY,
      usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
      descricao TEXT NOT NULL,
      rua TEXT,
      numero INTEGER,
      bairro TEXT,
      status TEXT DEFAULT 'Pendente',
      prioridade TEXT DEFAULT 'Média',
      setor TEXT DEFAULT 'Não definido',
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `)
}

ensureSchema().catch((err) => {
  console.error('Erro ao inicializar o schema do banco de dados:', err.message)
})

module.exports = pool