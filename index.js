const express = require("express");
const app = express();
const PORT = 3000;

//VIEW ENGINE
app.set("view engine", "ejs");

//BODYPARSER

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//STATIC

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log("servidor rodando");
});
