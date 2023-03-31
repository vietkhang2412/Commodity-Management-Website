var express = require("express");
var router = express.Router();
var sp = require("../controller/user.controller");

router.get("/", sp.listUser);

router.get("/detail/user/:id", sp.detailUser);

module.exports = router;
