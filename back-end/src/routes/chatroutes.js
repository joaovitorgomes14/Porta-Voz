const express = require('express');
const router = express.Router();
const validarEndereco = require('../validations/validarEndereco');

router.use(express.json());

router.post('/chat', (req, res) => {
  return res.json({ message: 'Olá, qual é o problema ?' });
});

router.post('/users', (req, res) => {
  const { endereco } = req.body;

  const resultado = validarEndereco(endereco);

  if (!resultado.valido) {
    return res.status(400).json({
      erros: resultado.erros
    });
  }

  res.json({ message: 'Endereço válido!' });
});

module.exports = router;