var PMD = require("../models/product.model");
var fs = require("fs");

const listProduct = async (req, res, next) => {
  let condition = null;
  var dataPro;
  var sortPro;
  var dataCats;
  var isSort = false;
  var sortTL = null;

  dataPro = await PMD.proModel.find(sortTL).sort().populate("theloai");
  if (req.method == "POST") {
    sortTL = req.body.sortTL;

    // if (req.body.sortNamePro) {
    //   sortPro = { tensanpham: 1 };
    //   isSort = false;
    //   console.log(">>>>> is = False");
    // } else {
    //   sortPro = { tensanpham: -1 };
    //   isSort = true;
    // }

    if (req.body.sortNamePro == "1") {
      dataPro = await PMD.proModel
        .find()
        .sort({ tensanpham: 1 })
        .populate("theloai");
      sortPro = -1;
    } else if (req.body.sortCatPro == "1") {
      dataPro = await PMD.proModel
        .find()
        .sort({ theloai: 1 })
        .populate("theloai");
      sortPro = -1;
    } else if (req.body.sortPricePro == "1") {
      dataPro = await PMD.proModel
        .find()
        .sort({ dongia: 1 })
        .populate("theloai");
      sortPro = -1;
    } else if (sortTL == "all") {
      console.log(">>>>>>>sort tất cả thể loại");
      dataPro = await PMD.proModel.find().populate("theloai");
    } else if (sortTL != null) {
      dataPro = await PMD.proModel
        .find({ theloai: sortTL })
        .populate("theloai");
    } else {
      dataPro = await PMD.proModel.find().populate("theloai");
      sortPro = 1;
    }
  }
  // dataPro = await PMD.proModel.find(sortTL).sort(sortPro).populate("theloai");
  dataCats = await PMD.catsModel.find();
  console.log(isSort);
  res.render("product/products", {
    dataProduct: dataPro,
    adminName: req.session.userid,
    dataCats: dataCats,
    sortPro: sortPro,
    isSort: isSort,
  });
};

const detailProduct = async (req, res, next) => {
  let idPro = req.params.id;
  // console.log(">>>>>>>>>Check id: ", idPro);
  console.log(">>>>>>check req.query", req.query);
  var detailPro = await PMD.proModel.find({ _id: idPro }).populate("theloai");
  res.render("product/detailProduct", {
    adminName: req.session.userid,
    detailPro: detailPro,
  });
};

const addProduct = async (req, res) => {
  // let img = req.file.originalname;
  let msg = "";
  let objPro = new PMD.proModel();

  (objPro.tensanpham = req.body.tensanpham),
    (objPro.theloai = req.body.theloai),
    (objPro.mota = req.body.mota),
    (objPro.dongia = req.body.dongia);

  try {
    fs.rename(
      req.file.path,
      "./public/uploads/" + req.file.originalname,
      async (err) => {
        if (err) {
          console.log(err);
        } else {
          objPro.anhsanpham =
            "http://localhost:3000/uploads/" + req.file.originalname;
          try {
            let new_pro = await objPro.save();
            console.log(new_pro);
            msg = "Đã thêm thành công!";
          } catch (error) {
            msg = "Lỗi " + error.message;
            console.log(msg);
          }
        }
      }
    );
  } catch (error) {
    try {
      let new_pro = await objPro.save();
      console.log(new_pro);
      msg = "Đã thêm thành công!";
    } catch (error) {
      msg = "Lỗi " + error.message;
      console.log(msg);
    }
  }

  res.redirect("/products");
};

const getUpdateProduct = async (req, res, next) => {
  var idPro = req.params.id;
  // console.log(">>>>>>>>>Check id: ", idPro);
  var detailPro = await PMD.proModel.find({ _id: idPro }).populate("theloai");
  var dataCats = await PMD.catsModel.find();
  res.render("product/updateProduct", {
    adminName: req.session.userid,
    dataCats,
    detailPro,
  });
};

const updateProduct = async (req, res) => {
  let objPro = new PMD.proModel();

  objPro.tensanpham = req.body.tensanpham;
  objPro.theloai = req.body.theloai;
  objPro.mota = req.body.mota;
  objPro.dongia = req.body.dongia;
  objPro._id = req.body.id;

  try {
    console.log(">>>>>>>>>>Check try 1");
    fs.rename(
      req.file.path,
      "./public/uploads/" + req.file.originalname,
      async (err) => {
        console.log(">>>>>>>>Check hàm async err");
        if (err) {
          console.log(err);
        } else {
          objPro.anhsanpham =
            "http://localhost:3000/uploads/" + req.file.originalname;
          try {
            await PMD.proModel.findByIdAndUpdate(objPro._id, objPro);
            console.log("Đã sửa thành công 1!");
          } catch (error) {
            msg = "Lỗi " + error.message;
            console.log(msg);
          }
        }
      }
    );
  } catch (error) {
    // console.log(">>>>>>>>>Check log 2");
    try {
      await PMD.proModel.findByIdAndUpdate(objPro._id, objPro);
      console.log("Đã sửa thành công 2!");
    } catch (error) {
      msg = "Lỗi " + error.message;
      console.log(msg);
    }
  }

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
