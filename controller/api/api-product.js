var proMd = require("../../models/product.model");

var objProReturn = {
  status: 1,
  msg: "",
};

const listProduct = async (req, res) => {
  let listPro;
  try {
    listPro = await proMd.proModel.find().populate("theloai");
    if (listPro.length > 0) {
      objProReturn.data = 0;
    } else {
      objProReturn.status = 0;
      objProReturn.msg = "Không có dữ liệu phù hợp";
    }
    objProReturn.data = listPro;
  } catch (error) {
    objProReturn.status = 0;
    objProReturn.msg = error.message;
  }

  res.json(objProReturn);
};

const addProduct = async (req, res, next) => {
  let objP = new proMd.proModel();
  objP.tensanpham = req.body.tensanpham;
  objP.anhsanpham = req.body.anhsanpham;
  objP.theloai = req.body.theloai;
  objP.dongia = req.body.dongia;
  objP.mota = req.body.mota;

  try {
    await objP.save();
    objProReturn.msg = "Thêm thành công!!!";
  } catch (error) {
    objProReturn.msg = "Thêm thất bại!!!";
  }

  res.json(objProReturn);
};

const updateProduct = async (req, res) => {
  let objP = await proMd.proModel.findById(req.params.idp);
  objP.tensanpham = req.body.tensanpham;
  objP.anhsanpham = req.body.anhsanpham;
  objP.theloai = req.body.theloai;
  objP.dongia = req.body.dongia;
  objP.mota = req.body.mota;
  // console.log(">>>>>Check id: ", req.params.idp);

  try {
    await proMd.proModel.findByIdAndUpdate(req.params.idp, objP);
    objProReturn.msg = "Sua thành công!!!";
  } catch (error) {
    objProReturn.msg = "Update fail!!!";
  }
  res.json(objProReturn);
};

const deleteProduct = async (req, res) => {
  try {
    await proMd.proModel.findByIdAndDelete(req.params.idp);
    objProReturn.msg = "Xoa thành công!!!";
  } catch (error) {
    objProReturn.msg = "Delete Fail!!!";
  }
  res.json(objProReturn);
};

module.exports = {
  listProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
