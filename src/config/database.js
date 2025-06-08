const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('p2db', 'admin', 'admin', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: console.log, // Vamos habilitar os logs para debug
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Função para testar a conexão
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
}

// Testa a conexão quando o arquivo é executado
testConnection();

module.exports = sequelize; 