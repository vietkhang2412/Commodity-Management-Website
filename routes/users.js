var express = require("express");
var router = express.Router();
var nd = require("../controller/user.controller");
var check = require("../middlewares/checkLogin");

router.get("/", check.checkSignin, nd.listUser);

router.post("/add", nd.addUser);

router.post("/register", nd.register);

router.get("/detail/user/:id", check.checkSignin, nd.detailUser);

router.post("/delete-user", nd.deleteUser);

router.get("/get-edit-user/:id", check.checkSignin, nd.getUpdateUser);

router.post("/update-user", nd.updateUser);

router.post("/", nd.listUser);

// router.get("/sort-fullname", nd.sortFullname);

module.exports = router;
