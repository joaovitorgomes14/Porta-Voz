const express = require('express');
const router = express.Router();
const validarEndereco = require('../validations/validarEndereco');
const userService = require('../services/userservice');
const complaintService = require('../services/complaintService');

router.use(express.json());

router.post('/chat', (req, res) => {
  return res.json({ message: 'Olá, qual é o problema ?' });
});

router.post('/users', (req, res) => {
  const { endereco } = req.body;

  const resultado = validarEndereco(endereco);

  if (!resultado.valido) {
    return res.status(400).json({ erros: resultado.erros });
  }

  res.json({ message: 'Endereço válido!' });
});

router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    const user = await userService.authenticate(email, password);
    return res.json({ message: 'Login realizado com sucesso.', user });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
});

router.post('/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.createUser({ name, email, password });
    return res.status(201).json({ message: 'Conta criada com sucesso.', user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post('/auth/forgot-password', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email é obrigatório.' });
  }

  return res.json({ message: 'Link de recuperação enviado para o email informado.' });
});

router.get('/complaints', async (req, res) => {
  try {
    const complaints = await complaintService.getAllComplaints();
    return res.json({ complaints });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar reclamações.' });
  }
});

module.exports = router;