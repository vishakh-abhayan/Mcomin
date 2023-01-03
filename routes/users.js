var express = require("express");
var router = express.Router();
var productHelpers = require("../helpers/product-helpers");
var userHelpers = require("../helpers/user-helper");
const { response } = require("express");

/* GET home page. */
router.get("/", function (req, res, next) {
  productHelpers.getAllProducts().then((product) => {
    res.render("user/view-products", { product });
  });
});

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.get("/singup", (req, res) => {
  res.render("user/singup");
});
router.post("/singup", (req, res) => {
  userHelpers.doSingup(req.body).then((response) => {
    console.log(response);
  });
});
router.post("/login", (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = router;
