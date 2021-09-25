const express = require("express");
const router = express.Router();
const Category = require("./Categories");
const slugify = require("slugify");

router.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new");
});

router.post("/categories/save", (req, res) => {
  var title = req.body.title;
  if (title != undefined) {
    Category.create({
      title: title,
      slug: slugify(title),
    }).then(() => {
      res.redirect("/");
    });
  } else {
    res.redirect("/admin/categories/new");
  }
});

router.get("/admin/categories", (req, res) => {
  //listando todas categorias
  Category.findAll().then((categories) => {
    res.render("admin/categories/index", { categories: categories });
  });
});

//deletando categoria
router.post("/categories/delete", (req, res) => {
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

router.post;

module.exports = router;
