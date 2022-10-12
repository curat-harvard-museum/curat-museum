const db = require("./db");

const User = require("./models/User");
const Comment = require("./models/Comment");
const Object = require("./models/Object");
const UserObject = require("./models/UserObject")

User.belongsToMany(Comment, { through: "userComment" });
Comment.belongsToMany(User, { through: "userComment" });

User.belongsToMany(Object, { through: UserObject });
Object.belongsToMany(User, { through: UserObject });

module.exports = {
  db,
  models: {
    User,
    Comment,
    Object,
    UserObject
  },
};
