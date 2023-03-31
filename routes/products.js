var express = require("express");
var router = express.Router();
var pro = require("../controller/product.controller");

/* GET product listing. */
router.get("/", pro.listProduct);

router.post("/delete-product", pro.deleteProduct);

router.get("/detail/sanpham/:id", pro.detailProduct);

router.post("/addProduct", pro.addProduct);

router.get("/edit-product/:id", pro.getUpdateProduct);

router.post("/update-product", pro.updateProduct);

module.exports = router;
