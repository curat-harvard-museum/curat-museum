const db = require("./db");

const User = require("./models/User");
const Comment = require("./models/Comment");
const Object = require("./models/Object");
const userObject = require("./models/userObject")

User.belongsToMany(Comment, { through: "userComment" });
Comment.belongsToMany(User, { through: "userComment" });

User.belongsToMany(Object, { through: "userObject" });
Object.belongsToMany(User, { through: "userObject" });

module.exports = {
  db,
  models: {
    User,
    Comment,
    Object,
    userObject
  },
};
