const express = require("express");
const app = express();
const connection = require("./database/database");
const PORT = process.env.PORT || 21032;
const session = require("express-session");

const articlesController = require("./artigo/ArticlesController");
const categoriesController = require("./categories/CategoriesController");
const userController = require("./users/UsersController");

const Article = require("./artigo/Article");
const Category = require("./categories/Category");
const User = require("./users/User");

//VIEW ENGINE
app.set("view engine", "ejs");

//SESSION

app.use(
  session({
    secret: "umapalavraqualquer",
    cookie: { maxAge: 300000 },
  })
);

//BODYPARSER

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//STATIC
app.use(express.static("public"));

////ROTA SESSION
app.get("/session", (req, res) => {
  req.session.treinamento = "Formação Node";
  req.session.ano = 2019;
  req.session.user = {
    usename: "RAFAEL",
    email: "rafaelbitencourtn12@gmail.com",
    id: 2,
  };
  res.send("sessao gerada!");
});

app.get("/leitura", (req, res) => {
  res.json({
    treinamento: req.session.treinamento,
    ano: req.session.ano,
    user: req.session.user,
  });
});

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
    order: [["id", "DESC"]],
    limit: 4,
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index", { articles: articles, categories: categories });
    });
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
        Category.findAll().then((categories) => {
          res.render("article", { article: article, categories: categories });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
  var slug = req.params.slug;
  Category.findOne({
    where: {
      slug: slug,
    },
    include: [{ model: Article }],
  })
    .then((category) => {
      if (category != undefined) {
        Category.findAll().then((categories) => {
          res.render("index", {
            articles: category.articles,
            categories: categories,
          });
        });
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
app.use("/", userController);

app.listen(PORT, () => {
  console.log("servidor rodando");
});
