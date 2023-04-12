var UMD = require("../models/user.model");

const getHome = async (req, res) => {
  res.render("home/home", { adminName: req.session.userid });
};

const getWeblogin = async (req, res) => {
  // req.session.destroy();
  let announce = "";

  if (req.method == "POST") {
    try {
      let objU = await UMD.userModel.findOne({ username: req.body.username });
      console.log(objU);
      if (objU != null) {
        if (objU.password == req.body.password) {
          req.session.userid = req.body.username;
          console.log(req.session);
          return res.render("home/home", { adminName: req.session.userid });
        } else {
          announce = "Sai mật khẩu !!!";
        }
      } else {
        announce = "Tài khoản không tồn tại !!!";
      }
    } catch (error) {
      announce = "Lỗi " + error.message;
    }
  }
  res.render("home/webLogin", { announce: announce });
};

const getLogout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

const getProfile = (req, res) => {
  res.render("home/detailAdmin", { adminName: req.session.userid });
};

module.exports = {
  getHome,
  getWeblogin,
  getLogout,
  getProfile,
};
