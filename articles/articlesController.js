const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("../articles/Article");
const slugify = require("slugify");

//ROTA PRINCIPAL
router.get("/admin/articles", (req, res) => {
  Article.findAll({
    include: [{ model: Category }],
  }).then((articles) => {
    res.render("admin/articles/index", { articles: articles });
  });
});

//CRIANDO ARTIGO
router.get("/admin/articles/new", (req, res) => {
  Category.findAll().then(() => {
    res.render("admin/articles/new", {});
  });
});

//SALVANDO ARTIGO NO DANCO DE DADOS
router.post("/articles/save", (req, res) => {
  var title = req.body.title;
  var body = req.body.body;
  var category = req.body.category;

  Article.create({
    title: title,
    slug: slugify(title),
    body: body,
    categoriaId: category,
  }).then(() => {
    res.redirect("/admin/articles");
  });
});

module.exports = router;
