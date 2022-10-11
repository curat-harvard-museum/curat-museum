const Sequelize = require("sequelize");
const db = require("../db");

const userObject = db.define("userObject", {
  objectId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
        notEmpty: true,
    },
  },
  primaryimageurl: {
    type: Sequelize.TEXT,
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

module.exports = userObject;
