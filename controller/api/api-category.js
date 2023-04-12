var catMD = require("../../models/product.model");
var objCatReturn = {
  status: 1,
  msg: "OK",
};
exports.listCategory = async (req, res, next) => {
  let list;
  try {
    list = await catMD.catsModel.find();
    if (list.length > 0) {
      objCatReturn.data = 0;
    } else {
      objCatReturn.status = 0;
      objCatReturn.msg = "Không có dữ liệu phù hợp";
    }
    objCatReturn.data = list;
  } catch (error) {
    objCatReturn.status = 0;
    objCatReturn.msg = error.message;
  }
  res.json(objCatReturn);
};

exports.addCategory = async (req, res, next) => {
  let objC = new catMD.catsModel();
  objC.name = req.body.name;

  try {
    await objC.save();
    objCatReturn.msg = "Thêm thành công";
  } catch (error) {
    objCatReturn.msg = "Thêm thất bại";
  }
  res.json(objCatReturn);
};

// exports.updateCat = async (req, res, next) => {
//   let objC = await catMD.catsModel.findById(req.params.idu);
//   objC.name = req.body.name;

//   try {
//     await catMD.catsModel.findByIdAndUpdate(req.params.idu, objC);
//     objCatReturn.msg = "Sửa thành công";
//   } catch (error) {
//     objCatReturn.msg = "Sửa Thất bại";
//   }

//   res.json(objCatReturn);
// };

// exports.deleteCat = async (req, res, next) => {
//   try {
//     await catMD.catsModel.findByIdAndDelete(req.params.idu);
//     objCatReturn.msg = "Xóa thành công!!";
//   } catch (error) {
//     objCatReturn.msg = "Xóa Thất bại!!!";
//   }

//   res.json(objCatReturn);
// };
