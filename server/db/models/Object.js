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

Object.makeFavorite = function(artwork, userId){
  //is object in database?
  //if not create it..
  //const user = await db.models.user.findByPk(userId);
  //await user.addObject(object);
}

module.exports = Object;
