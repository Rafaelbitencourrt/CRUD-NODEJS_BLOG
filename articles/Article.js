const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define("articles", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Category.hasMany(Article); //Uma Categoria para muitos artigos
Article.belongsTo(Category); //Um artigo pertence a uma categoria

//ATUALIZANDO O BANCO DE DADOS
//Article.sync({ force: true });

module.exports = Article;
