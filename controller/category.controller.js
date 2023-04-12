var CMD = require("../models/product.model");
var PMD = require("../models/product.model");

const getList = async (req, res) => {
  var dataCats;
  var chk = "";
  if (req.method == "POST") {
    let objCat = new CMD.catsModel();
    objCat.name = req.body.name;
    // console.log(">>>>>Check name", objCat.name);
    try {
      await objCat.save();
      console.log("Thêm thành công!");
      return res.redirect("/products/categories");
    } catch (error) {
      console.log("Thêm thất bại");
    }
  }
  dataCats = await CMD.catsModel.find();
  res.render("category/categories", {
    dataCats: dataCats,
    adminName: req.session.userid,
    chk: chk,
  });
};

const deleteCat = async (req, res) => {
  let id = req.body.id;
  let chk = "";
  let [objP] = await PMD.proModel.find({ theloai: id });
  console.log(">>>>>>>>>>>>>>Check objP: ", objP);

  if (objP == null) {
    console.log(">>>>>>>>>check log");
    await CMD.catsModel.findByIdAndDelete(id);
    chk = "Xóa thành công!!!";
    dataCats = await CMD.catsModel.find();
  } else {
    chk = "Thể loại này đang được sử dụng!!!";
    console.log(chk);
    dataCats = await CMD.catsModel.find();
  }
  res.render("category/categories", {
    chk: chk,
    dataCats: dataCats,
    adminName: req.session.userid,
  });
};
module.exports = {
  getList,
  deleteCat,
};
