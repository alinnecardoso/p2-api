const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Rota de criação de usuário
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ 
      error: 'Nome e email são obrigatórios' 
    });
  }

  // Aqui você pode adicionar a lógica para salvar no banco
  res.status(201).json({
    message: 'Usuário criado com sucesso',
    user: { name, email }
  });
});

module.exports = app; 