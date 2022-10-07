const db = require("./db");

const User = require("./models/User");
const Comment = require("./models/Comment");

User.belongsToMany(Comment, { through: "userComment" });
Comment.belongsToMany(User, { through: "userComment" });

module.exports = {
  db,
  models: {
    User,
    Comment,
  },
};
