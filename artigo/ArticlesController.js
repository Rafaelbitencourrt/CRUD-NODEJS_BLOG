const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");
const authenticateUser = require("../middlewares/authenticateUser");
const { Router } = require("express");
const autheticateUser = require("../middlewares/authenticateUser");

//ROTA PRINCIPAL
router.get("/admin/articles", autheticateUser, (req, res) => {
  Article.findAll({
    include: [{ model: Category, required: true }],
  }).then((articles) => {
    res.render("admin/articles/index", { articles: articles });
  });
});

//CRIANDO ARTIGO
router.get("/admin/articles/new", autheticateUser, (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new", { categories: categories });
  });
});

//SALVANDO ARTIGO NO DANCO DE DADOS
router.post("/articles/save", autheticateUser, (req, res) => {
  var title = req.body.title;
  var body = req.body.body;
  var category = req.body.category;

  Article.create({
    title: title,
    slug: slugify(title),
    body: body,
    categoryId: category,
  }).then(() => {
    res.redirect("/admin/articles");
  });
});

//DELETANDO ARTIGO
router.post("/articles/delete", autheticateUser, (req, res) => {
  var id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      Article.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        res.redirect("/admin/articles");
      });
    } else {
      // NÃO FOR NUMERO
      res.redirect("/admin/articles");
    }
  } else {
    //NULL
    res.redirect("/admin/articles");
  }
});

//EDITANDO ARQUIVO
router.get("/admin/articles/edit/:id", autheticateUser, (req, res) => {
  var id = req.params.id;
  Article.findByPk(id) //pesquisa categoria pelo id
    .then((article) => {
      if (article != undefined) {
        Category.findAll().then((categories) => {
          res.render("admin/articles/edit", {
            categories: categories,
            article: article,
          });
        });
      } else {
        res.redirect("/admin/articles");
      }
    })
    .catch((erro) => {
      res.redirect("/admin/articles");
    });
});

///SALVANDO EDIÇÃO DATABASE
router.post("/articles/update", autheticateUser, (req, res) => {
  var id = req.body.id;
  var title = req.body.title;
  var body = req.body.body;
  var category = req.body.category;

  Article.update(
    { title: title, body: body, categoryId: category, slug: slugify(title) },
    {
      where: {
        id: id,
      },
    }
  )
    .then(() => {
      res.redirect("/admin/articles");
    })
    .catch((err) => {
      res.redirect("/");
    });
});

////LÓGICA PAGINAÇÃO
router.get("/articles/page/:num", (req, res) => {
  var page = req.params.num;
  var offset = 0;

  if (isNaN(page) || page == 1) {
    offset = 0;
  } else {
    offset = (parseInt(page) - 1) * 4;
  }
  Article.findAndCountAll({
    limit: 4,
    offset: offset,
    order: [["id", "DESC"]],
  }).then((articles) => {
    var next;
    if (offset + 4 >= articles.count) {
      next = false;
    } else {
      next = true;
    }

    var result = {
      page: parseInt(page),
      next: next,
      articles: articles,
    };

    Category.findAll().then((categories) => {
      res.render("admin/articles/page", {
        result: result,
        categories: categories,
      });
    });
  });
});
module.exports = router;