const db = require("./db");

const User = require("./models/User");
const Comment = require("./models/Comment");
const Object = require("./models/Object");
const UserObject = require("./models/user-object")


User.belongsToMany(Comment, { through: "user-comment" });
Comment.belongsToMany(User, { through: "user-comment" });

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
