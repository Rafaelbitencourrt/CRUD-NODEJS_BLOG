const express = require("express");
const { Sequelize } = require("sequelize/types");
const app = express();
const PORT = 3000;
const connection = require("./database/database");

//VIEW ENGINE
app.set("view engine", "ejs");

//BODYPARSER

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//STATIC

app.use(express.static("public"));

//DATABASE

connection
  .authenticate()
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");
  })
  .catch((error) => {
    console.log("não conectado", error);
  });

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log("servidor rodando");
});
