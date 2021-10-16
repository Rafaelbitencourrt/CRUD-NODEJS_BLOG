const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define("users", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  passoword: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

//ATUALIZANDO O BANCO DE DADOS
//Category.sync({ force: true });
module.exports = User;
