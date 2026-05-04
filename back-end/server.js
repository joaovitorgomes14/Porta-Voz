const express = require('express');
const app = express();

const chatroutes = require('./src/routes/chatroutes');

app.use(express.json());

// conecta as rotas
app.use('/api', chatroutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});