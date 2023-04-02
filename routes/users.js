var express = require("express");
var router = express.Router();
var nd = require("../controller/user.controller");

router.get("/", nd.listUser);

router.post("/add", nd.addUser);

router.get("/detail/user/:id", nd.detailUser);

router.post("/delete-user", nd.deleteUser);

router.get("/get-edit-user/:id", nd.getUpdateUser);
router.post("/update-user", nd.updateUser);

module.exports = router;
