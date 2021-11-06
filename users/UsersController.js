const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");

router.get("/admin/users", (req, res) => {
  User.findAll().then((users) => {
    res.render("admin/users/index", { users: users });
  });
});

router.get("/admin/users/create", (req, res) => {
  res.render("admin/users/create");
});

router.post("/users/create", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  //lógica para impedir duplicaçao de emails
  User.findOne({ where: { email: email } }).then((user) => {
    if (user == undefined) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);

      User.create({
        email: email,
        password: hash,
      })
        .then(() => {
          res.redirect("/");
        })
        .catch((err) => {
          res.redirect("/");
        });
    } else {
      res.redirect("admin/users/create");
    }
  });
});

//DELETANDO USUARIO
router.post("/users/delete", (req, res) => {
  var id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      User.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        res.redirect("/admin/users");
      });
    } else {
      // NÃO FOR NUMERO
      res.redirect("/admin/users");
    }
  } else {
    //NULL
    res.redirect("/admin/users");
  }
});

//----------------->LOGIN<------------------//

router.get("/admin/login", (req, res) => {
  res.render("admin/users/login");
});

//--------------------->AUTENTICAÇÃO<---------------//

router.post("/authenticate", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ where: { email: email } }).then((user) => {
    if (user != undefined) {
      var correct = bcrypt.compareSync(password, user.password);

      if (correct) {
        req.session.user = {
          id: user.id,
          email: user.email,
        };
        res.redirect("/admin/articles");
      } else {
        res.redirect("/admin/login");
      }
    } else {
      res.redirect("/admin/login");
    }
  });
});

module.exports = router;
