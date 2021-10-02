const express = require("express");
const app = express();
const connection = require("./database/database");
const PORT = 3000;
const articlesController = require("./articles/ArticlesController");
const categoriesController = require("./categories/CategoriesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

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
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  Article.findAll({
    order: ["id", "DESC"],
  }).then((articles) => {
    res.render("index", { articles: articles });
  });
});

app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug,
    },
  })
    .then((article) => {
      if (article != undefined) {
        res.render("article", { article: article });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

////ROUTER

app.use("/", articlesController);
app.use("/", categoriesController);

app.listen(PORT, () => {
  console.log("servidor rodando");
});
