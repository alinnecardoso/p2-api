const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/User');

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

// Rota de exemplo para criar usuário
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota de exemplo para listar usuários
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Inicialização do servidor e conexão com o banco
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Sincroniza os modelos com o banco de dados
    await sequelize.sync();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  }
}

startServer();

module.exports = app; 