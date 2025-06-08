const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/User');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const userRoutes = require('./routes/users');
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

// Middleware de logging
app.use((req, res, next) => {
  Logger.info(`${req.method} ${req.path}`, { ip: req.ip });
  next();
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rotas
app.use(userRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  Logger.debug('Health check realizado');
  res.json({ status: 'ok' });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  Logger.error('Erro não tratado', { error: err.message });
  res.status(500).json({ message: 'Erro interno do servidor' });
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