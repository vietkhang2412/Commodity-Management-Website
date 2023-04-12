var express = require("express");
var router = express.Router();
var pro = require("../controller/product.controller");
const multer = require("multer");
const upoad = multer({ dest: "./tmp" });
var check = require("../middlewares/checkLogin");

/* GET product listing. */
router.get("/", check.checkSignin, pro.listProduct);

router.post("/", pro.listProduct);

router.post("/delete-product", pro.deleteProduct);

router.get("/detail/sanpham/:id", check.checkSignin, pro.detailProduct);

router.post("/addProduct", upoad.single("anhsanpham"), pro.addProduct);

router.get("/edit-product/:id", check.checkSignin, pro.getUpdateProduct);

router.post("/update-product", upoad.single("anhsanpham"), pro.updateProduct);

// router.get("/sort-docongnghe", pro.sortTL)

module.exports = router;
