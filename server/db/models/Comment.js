const Sequelize = require("sequelize");
const db = require("../db");

const Comment = db.define("comment", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    validate: {
      notEmpty: true,
    },
  },
  objectId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  commentBody: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = Comment;
