var userMD = require("../../models/user.model");
var objReturn = {
  status: 1,
  msg: "OK",
};
exports.listUser = async (req, res, next) => {
  let list;
  try {
    list = await userMD.userModel.find();
    if (list.length > 0) {
      objReturn.data = 0;
    } else {
      objReturn.status = 0;
      objReturn.msg = "Không có dữ liệu phù hợp";
    }
    objReturn.data = list;
  } catch (error) {
    objReturn.status = 0;
    objReturn.msg = error.message;
  }
  res.json(objReturn);
};

exports.addUser = async (req, res, next) => {
  let objU = new userMD.userModel();
  objU.username = req.body.username;
  objU.password = req.body.password;
  objU.fullname = req.body.fullname;
  objU.email = req.body.email;
  objU.role = req.body.role;

  try {
    await objU.save();
    objReturn.msg = "Thêm thành công";
  } catch (error) {
    objReturn.msg = "Thêm thất bại";
  }
  res.json(objReturn);
};

exports.updateUser = async (req, res, next) => {
  let objU = await userMD.userModel.findById(req.params.idu);
  objU.username = req.body.username;
  objU.password = req.body.password;
  objU.fullname = req.body.fullname;
  objU.email = req.body.email;
  objU.role = req.body.role;

  try {
    await userMD.userModel.findByIdAndUpdate(req.params.idu, objU);
    objReturn.msg = "Sửa thành công";
  } catch (error) {
    objReturn.msg = "Sửa Thất bại";
  }

  res.json(objReturn);
};

exports.deleteUser = async (req, res, next) => {
  try {
    await userMD.userModel.findByIdAndDelete(req.params.idu);
    objReturn.msg = "Xóa thành công!!";
  } catch (error) {
    objReturn.msg = "Xóa Thất bại!!!";
  }

  res.json(objReturn);
};
