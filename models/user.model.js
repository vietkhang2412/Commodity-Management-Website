const { model } = require("mongoose");
var db = require("./db");

const userSchema = new db.mongoose.Schema(
  {
    fullname: { type: String, require: false },
    username: { type: String, require: true },
    email: { type: String, require: false },
    password: { type: String, require: true },
    role: { type: String, require: true },
  },
  { collection: "users" }
);

let userModel = db.mongoose.model("userModel", userSchema);

module.exports = {
  userModel,
};
