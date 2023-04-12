var userMD = require("../../models/user.model");
const bcrypt = require("bcrypt");
var objReturn = {
  status: 1,
  msg: "OK",
};
exports.login = async (req, res, next) => {
  try {
    const user = await userMD.userModel.findByCredentials(
      req.body.username,
      req.body.password
    );
    if (!user) {
      return res.status(401).json({ error: "Sai thông tin đăng nhập" });
    }
    const token = await user.generateAuthToken();

    return res.status(200).send({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }

  // console.log(">>>>>>>>>Check: ", req.query.username);
  // try {
  //   objReturn.data = await userMD.userModel.find({
  //     username: req.query.username,
  //   });
  // } catch (error) {
  //   objReturn.status = 0;
  //   objReturn.msg = error.message;
  // }
  // res.json(objReturn);
};

exports.reg = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);

    const user = new userMD.userModel(req.body);

    user.password = await bcrypt.hash(req.body.password, salt);
    const token = await user.generateAuthToken();

    let new_u = await user.save();

    return res.status(201).json({ user: new_u, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }

  // let objU = new userMD.userModel();
  // objU.username = req.body.username;
  // objU.password = req.body.password;
  // objU.fullname = req.body.fullname;
  // objU.email = req.body.email;
  // objU.role = "User";

  // try {
  //   await objU.save();
  //   objReturn.msg = "Thêm thành công";
  // } catch (error) {
  //   objReturn.msg = "Thêm thất bại";
  // }
  // res.json(objReturn);
};
