const express = require("express");
const app = express();
const connection = require("./database/database");
const PORT = 3000;

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
    console.log("Conexão feita com o banco de dados!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log("servidor rodando");
});
