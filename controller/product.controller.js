var PMD = require("../models/product.model");

const listProduct = async (req, res, next) => {
  let condition = null;

  if (typeof req.query.dongia != "undefined") {
    condition = { dongia: req.query.dongia };
  }
  if (typeof req.query.tensanpham != "undefined") {
    condition = { tensanpham: req.query.tensanpham };
  }
  if (typeof req.query.theloai != "undefined") {
    condition = { theloai: req.query.theloai };
  }

  if (req.session.userid) {
    var dataPro = await PMD.proModel.find(condition);
    var dataCats = await PMD.catsModel.find();
    res.render("product/products", {
      dataProduct: dataPro,
      adminName: req.session.userid,
      dataCats: dataCats,
    });
  }
  res.status(404).end();
};

const detailProduct = async (req, res, next) => {
  if (req.session.userid) {
    let idPro = req.params.id;
    console.log(">>>>>>>>>Check id: ", idPro);
    var detailPro = await PMD.proModel.find({ _id: idPro });
    res.render("product/detailProduct", {
      adminName: req.session.userid,
      detailPro: detailPro,
    });
  }
  res.status(404).end();
};

const addProduct = async (req, res) => {
  if (req.session.userid) {
    let msg = "";
    let objPro = new PMD.proModel();

    (objPro.tensanpham = req.body.tensanpham),
      (objPro.anhsanpham = req.body.anhsanpham),
      (objPro.theloai = req.body.theloai),
      (objPro.mota = req.body.mota),
      (objPro.dongia = req.body.dongia);

    try {
      let new_pro = await objPro.save();
      console.log(new_pro);
      msg = "Đã thêm thành công!";
    } catch (error) {
      msg = "Lỗi " + error.message();
      console.log(msg);
    }

    res.redirect("/products");
  }
  res.status(404).end();
};

const getUpdateProduct = async (req, res, next) => {
  if (req.session.userid) {
    let idPro = req.params.id;
    console.log(">>>>>>>>>Check id: ", idPro);
    var detailPro = await PMD.proModel.find({ _id: idPro });
    var dataCats = await PMD.catsModel.find();
    res.render("product/updateProduct", {
      adminName: req.session.userid,
      dataCats,
      detailPro,
    });
  }
  res.status(404).end();
};

const updateProduct = (req, res) => {
  res.redirect("/products");
};

const deleteProduct = async (req, res) => {
  var id = req.body.id;
  // console.log(">>>>>>>>>>>>>Check id", id);
  await PMD.proModel.findByIdAndDelete(id);
  res.redirect("/products");
};

module.exports = {
  listProduct,
  detailProduct,
  addProduct,
  getUpdateProduct,
  updateProduct,
  deleteProduct,
};
