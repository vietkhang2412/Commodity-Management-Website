var express = require("express");
var router = express.Router();
var api_p = require("../controller/api/api-product");
var api_u = require("../controller/api/api-user");
var api_c = require("../controller/api/api-category");
var api_l = require("../controller/api/api-login");

// Làm việc với product
router.get("/products", api_p.listProduct); // get: /api/products
router.post("/products", api_p.addProduct); // post: /api/products
router.put("/update-product/:idp", api_p.updateProduct); // put: /api/update-product/38472839
router.delete("/delete-product/:idp", api_p.deleteProduct); // delete: /api/delete-product/76986876

//làm việc với user
router.get("/users", api_u.listUser); // get: /api/users
router.post("/users", api_u.addUser); // post: /api/users
router.put("/update-user/:idu", api_u.updateUser); // put: /api/update-user/38472839
router.delete("/delete-user/:idu", api_u.deleteUser); // delete: /api/delete-user/76986876

//làm việc với Category
router.get("/category", api_c.listCategory); // get: /api/category
router.post("/category", api_c.addCategory); // post: /api/category

//Làm việc với login
router.post("/login", api_l.login); // get: /api/users
router.post("/reg", api_l.reg); // post: /api/users

module.exports = router;
