const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const userRoutes = require('./routes/users');
const Logger = require('./services/logger');

const app = express();

app.use(express.json());

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  Logger.info(`Servidor rodando na porta ${PORT}`);
});

module.exports = app; 