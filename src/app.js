const express = require('express');
const Logger = require('./services/logger');
const app = express();

app.use(express.json());

// Middleware para logging de requisições
app.use((req, res, next) => {
  Logger.info('Requisição recebida', {
    method: req.method,
    path: req.path,
    ip: req.ip
  });
  next();
});

// Rota de health check
app.get('/health', (req, res) => {
  Logger.debug('Health check realizado');
  res.status(200).json({ status: 'OK' });
});

// Rota de criação de usuário
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    Logger.warn('Tentativa de criar usuário com dados inválidos', { body: req.body });
    return res.status(400).json({ 
      error: 'Nome e email são obrigatórios' 
    });
  }

  try {
    // Aqui você pode adicionar a lógica para salvar no banco
    Logger.info('Usuário criado com sucesso', { name, email });
    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: { name, email }
    });
  } catch (error) {
    Logger.error('Erro ao criar usuário', { 
      error: error.message,
      stack: error.stack
    });
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Tratamento de erros
app.use((err, req, res, next) => {
  Logger.error('Erro não tratado', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });
  
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  Logger.info(`Servidor rodando na porta ${PORT}`);
});

module.exports = app; 