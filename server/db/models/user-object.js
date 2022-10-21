const { BOOLEAN } = require("sequelize");
const Sequelize = require("sequelize");
const db = require("../db");

const UserObject = db.define("user-object", {
  isVisited: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
});

module.exports = UserObject;