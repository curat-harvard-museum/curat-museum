const db = require("./db");

const User = require("./models/User");
const Comment = require("./models/Comment");
const Object = require("./models/Object");


User.belongsToMany(Comment, { through: "user-comment" });
Comment.belongsToMany(User, { through: "user-comment" });

User.belongsToMany(Object, { through: "user-object" });
Object.belongsToMany(User, { through: "user-object" });



module.exports = {
  db,
  models: {
    User,
    Comment,
    Object,
  },
};
