const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");
const { application } = require("express");
const authenticateUser = require("../middlewares/authenticateUser");

router.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new");
});

//CRIANDO UMA NOVA CATEGORIA E SALVANDO NO BANCO DE DADOS
router.post("/categories/save", authenticateUser, (req, res) => {
  var title = req.body.title;
  if (title != undefined) {
    Category.create({
      title: title,
      slug: slugify(title),
    }).then(() => {
      res.redirect("/admin/categories");
    });
  } else {
    res.redirect("/admin/categories/new");
  }
});

router.get("/admin/categories", authenticateUser, (req, res) => {
  //lISTANDO TODAS CATEGORIAS
  Category.findAll().then((categories) => {
    res.render("admin/categories/index", { categories: categories });
  });
});

//DELETANDO CATEGORIA
router.post("/categories/delete", authenticateUser, (req, res) => {
  var id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      Category.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        res.redirect("/admin/categories");
      });
    } else {
      // NÃO FOR NUMERO
      res.redirect("/admin/categories");
    }
  } else {
    //NULL
    res.redirect("/admin/categories");
  }
});

//EDITANDO ARQUIVO
router.get("/admin/categories/edit/:id", authenticateUser, (req, res) => {
  var id = req.params.id;
  if (isNaN(id)) {
    res.redirect("/admin/categories");
  }
  Category.findByPk(id) //pesquisa categoria pelo id
    .then((category) => {
      if (category != undefined) {
        res.render("admin/categories/edit", { category: category });
      } else {
        res.redirect("/admin/categories");
      }
    })
    .catch((erro) => {
      res.redirect("/admin/categories");
    });
});

///SALVANDO EDIÇÃO DATABASE
router.post("/categories/update", authenticateUser, (req, res) => {
  var id = req.body.id;
  var title = req.body.title;

  Category.update(
    { title: title, slug: slugify(title) },
    {
      where: {
        id: id,
      },
    }
  ).then(() => {
    res.redirect("/admin/categories");
  });
});

module.exports = router;
