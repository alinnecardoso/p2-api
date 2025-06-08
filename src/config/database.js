const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('p2db', 'admin', 'admin', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false, // Desativa os logs SQL no console
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize; 