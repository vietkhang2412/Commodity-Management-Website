var UMD = require("../models/user.model");

const detailUser = async (req, res, next) => {
  let idUser = req.params.id;
  console.log(">>>>>>>>Check", idUser);
  var detail = await UMD.userModel.find({ _id: idUser });
  res.render("user/detailUser", {
    adminName: req.session.userid,
    detail: detail,
  });
};

const listUser = async (req, res) => {
  let condition = null;

  if (typeof req.query.username != "undefined") {
    condition = { username: req.query.username };
  }
  if (typeof req.query.fullname != "undefined") {
    condition = { fullname: req.query.fullname };
  }
  if (typeof req.query.email != "undefined") {
    condition = { email: req.query.email };
  }

  let dataU;

  if (req.method == "POST") {
    let findUsername = req.body.inputsort;

    if (req.body.sortUser == "fn") {
      console.log(">>>>>>>>>>>Check fullname");
      dataU = await UMD.userModel.find().sort({ fullname: 1 });
    } else if (req.body.sortUser == "un") {
      console.log(">>>>>>>>>>>Check Username");
      dataU = await UMD.userModel.find().sort({ username: 1 });
    } else if (req.body.sortUser == "em") {
      console.log(">>>>>>>>>>>Check email");
      dataU = await UMD.userModel.find().sort({ email: 1 });
    } else if (findUsername == "") {
      console.log(">>>>>>>>>>>>>>>Check find all");
      dataU = await UMD.userModel.find();
    } else {
      console.log(">>>>>>>>>>>>>>>Check find single");
      dataU = await UMD.userModel.find({ username: findUsername });
    }
  } else {
    dataU = await UMD.userModel.find(condition);
  }

  res.render("user/users", {
    dataUser: dataU,
    adminName: req.session.userid,
  });
};

const addUser = async (req, res) => {
  let msg = "";
  let objUser = new UMD.userModel();

  objUser.fullname = req.body.fullname;
  objUser.username = req.body.username;
  objUser.password = req.body.password;
  objUser.email = req.body.email;
  objUser.role = req.body.role;

  try {
    let new_user = await objUser.save();
    msg = "Đã thêm thành công!!";
    console.log(new_user);
  } catch (error) {
    console.log(">>>>>>>>error");
    msg = "Thêm thất bại!!!";
    console.log(msg);
  }
  res.redirect("/users");
};

const register = async (req, res) => {
  let announce = "";
  let objUser = new UMD.userModel();

  objUser.fullname = req.body.fullname;
  objUser.username = req.body.username;
  objUser.password = req.body.password;
  objUser.email = req.body.email;
  objUser.role = req.body.role;

  try {
    await objUser.save();
    announce = "Đăng kí thành công!!!";
  } catch (error) {
    console.log(error.message);
    announce = "Đăng kí thất bại!!!";
  }
  res.redirect("/");
};

const deleteUser = async (req, res) => {
  var id = req.body.id;
  await UMD.userModel.findByIdAndDelete(id);
  res.redirect("/users");
};

const getUpdateUser = async (req, res) => {
  var idUser = req.params.id;
  console.log(">>>>>>>>>Check id user: ", idUser);
  var userUp = await UMD.userModel.findById(idUser);

  res.render("user/updateUser", {
    adminName: req.session.userid,
    userUp: userUp,
  });
};

const updateUser = async (req, res) => {
  let objUser = new UMD.userModel();

  objUser.fullname = req.body.fullname;
  objUser.username = req.body.username;
  objUser.password = req.body.password;
  objUser.email = req.body.email;
  objUser.role = req.body.role;
  objUser._id = req.body.idU;

  try {
    await UMD.userModel.findByIdAndUpdate(objUser._id, objUser);
    console.log("Đã sửa thành công!");
  } catch (error) {
    console.log("Sửa thất bại!");
  }
  res.redirect("/users");
};

module.exports = {
  listUser,
  detailUser,
  addUser,
  deleteUser,
  getUpdateUser,
  updateUser,
  register,
};
