const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('candy_shop', 'root', '3008', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
