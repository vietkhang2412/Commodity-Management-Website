var express = require("express");
var router = express.Router();
var house = require("../controller/home.controller");

/* GET home page. */
router.get("/", house.getWeblogo);

router.get("/home", house.getHome);

router.post("/", house.postHome);

router.get("/logout", house.getLogout);

router.get("/admin", house.getProfile);

module.exports = router;
