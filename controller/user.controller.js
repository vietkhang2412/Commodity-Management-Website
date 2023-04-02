var UMD = require("../models/user.model");

const detailUser = async (req, res, next) => {
  if (req.session.userid) {
    let idUser = req.params.id;
    console.log(">>>>>>>>Check", idUser);
    var detail = await UMD.userModel.find({ _id: idUser });
    res.render("user/detailUser", {
      adminName: req.session.userid,
      detail: detail,
    });
  }
  res.status(404).end();
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

  if (req.session.userid) {
    var dataU = await UMD.userModel.find(condition);
    res.render("user/users", {
      dataUser: dataU,
      adminName: req.session.userid,
    });
  }
  res.status(404).end();
};

const addUser = async (req, res) => {
  if (req.session.userid) {
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
  }
  res.status(404).end();
};

const deleteUser = async (req, res) => {
  var id = req.body.id;
  await UMD.userModel.findByIdAndDelete(id);
  res.redirect("/users");
};

const getUpdateUser = async (req, res) => {
  if (req.session.userid) {
    var idUser = req.params.id;
    console.log(">>>>>>>>>Check id user: ", idUser);
    var userUp = await UMD.userModel.findById(idUser);

    res.render("user/updateUser", {
      adminName: req.session.userid,
      userUp: userUp,
    });
  }
  res.status(404).end();
};

const updateUser = async (req, res) => {
  if (req.session.userid) {
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
  }
  res.status(404).end();
};

module.exports = {
  listUser,
  detailUser,
  addUser,
  deleteUser,
  getUpdateUser,
  updateUser,
};
