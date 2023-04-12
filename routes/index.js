var express = require("express");
var router = express.Router();
var house = require("../controller/home.controller");
var check = require("../middlewares/checkLogin");

/* GET home page. */
router.get("/", check.checkNoSignin, house.getWeblogin);

router.get("/home", check.checkSignin, house.getHome);

router.post("/", house.getWeblogin);

router.get("/logout", house.getLogout);

router.get("/admin", house.getProfile);

module.exports = router;
