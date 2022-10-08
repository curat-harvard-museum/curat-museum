const Sequelize = require("sequelize");
const db = require("../db");

const Object = db.define("object", {
  objectid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  primaryimageurl: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING
  },
  description: {
      type: Sequelize.TEXT
  },
  artist: {
      type: Sequelize.STRING
  }
});

module.exports = Object;
