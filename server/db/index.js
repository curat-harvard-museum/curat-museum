const db = require("./db");

const User = require("./models/User");
const Comment = require("./models/Comment");
const Object = require("./models/Object");

User.belongsToMany(Comment, { through: "userComment" });
Comment.belongsToMany(User, { through: "userComment" });

User.belongsToMany(Object, { through: "Favorites" });
Object.belongsToMany(User, { through: "Favorites" });

module.exports = {
  db,
  models: {
    User,
    Comment,
    Object
  },
};
