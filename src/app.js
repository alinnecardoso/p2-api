const express = require('express');
const app = express();

// Middleware para parsing de JSON
app.use(express.json());

// Middleware para parsing de URL-encoded
app.use(express.urlencoded({ extended: true }));

// Configuração básica de CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
});

// Rota básica de health check
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

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app; 