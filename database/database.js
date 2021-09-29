const Sequelize = require("sequelize");

const connection = new Sequelize("blog", "root", "28461973", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00",
});

module.exports = connection;
