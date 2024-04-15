const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  logging: false,
  storage: 'DB.sqlite'
});

module.exports = sequelize;