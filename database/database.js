const Sequelize = require("sequelize");

const connection = new Sequelize("blog", "root", "28461973", {
  host: "127.0.0.1",
  dialect: "mysql",
  timezone: "-03:00",
  port: "3306",
  connectionLimit: 10,
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
});

module.exports = connection;
