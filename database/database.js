const Sequelize = require("sequelize");

const connection = new Sequelize("blog", "root", "28461973", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00",
  port: "3306",
  connectionLimit: 10,
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
});
//connection.sync({ force: true });

module.exports = connection;
