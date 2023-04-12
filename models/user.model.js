const { model } = require("mongoose");
var db = require("./db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const chuoi_ki_tu_bi_mat = process.env.TOKEN_SEC_KEY;
const bcrypt = require("bcrypt");

const userSchema = new db.mongoose.Schema(
  {
    fullname: { type: String, require: false },
    username: { type: String, require: true },
    email: { type: String, require: false },
    password: { type: String, require: true },
    role: { type: String, require: true },
    token: { type: String, require: false },
  },
  { collection: "users" }
);

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  console.log(user);
  const token = jwt.sign(
    { _id: user._id, username: user.username },
    chuoi_ki_tu_bi_mat
  );
  user.token = token;
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (username, passwd) => {
  const user = await userModel.findOne({ username });

  if (!user) {
    throw new Error({ error: "Không tồn tại user" });
  }

  const isPasswordMatch = await bcrypt.compare(passwd, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Sai password" });
  }
  return user;
};

let userModel = db.mongoose.model("userModel", userSchema);

module.exports = {
  userModel,
};
