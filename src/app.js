const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/User');
const Logger = require('./services/logger');

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
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    Logger.warn('Tentativa de criar usuário com dados inválidos', { body: req.body });
    return res.status(400).json({ 
      error: 'Nome e email são obrigatórios' 
    });
  }
  try {
    const user = await User.create(req.body);
    Logger.info('Usuário criado com sucesso', { name, email });
    res.status(201).json(user);
  } catch (error) {
    Logger.error('Erro ao criar usuário', { 
      error: error.message,
      stack: error.stack
    });
    res.status(400).json({ error: error.message });
  }
});

// Rota de listagem de usuários
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    Logger.error('Erro ao listar usuários', { 
      error: error.message,
      stack: error.stack
    });
    res.status(500).json({ error: error.message });
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

// Inicialização do servidor e conexão com o banco
const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    // Sincroniza os modelos com o banco de dados
    await sequelize.sync();
    Logger.info('Conexão com o banco de dados estabelecida com sucesso.');

    app.listen(PORT, () => {
      Logger.info(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    Logger.error('Erro ao conectar com o banco de dados:', error);
  }
}

startServer();

module.exports = app; 