var express = require("express");
var router = express.Router();
var cat = require("../controller/category.controller");

router.get("/", cat.getList);

router.post("/", cat.getList);

router.post("/delete-cat", cat.deleteCat);

module.exports = router;
