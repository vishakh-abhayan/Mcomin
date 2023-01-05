var express = require("express");
var router = express.Router();
var productHelpers = require("../helpers/product-helpers");
var userHelpers = require("../helpers/user-helper");

/* GET home page. */
router.get("/", function (req, res, next) {
  let user = req.session.user;
  productHelpers.getAllProducts().then((product) => {
    res.render("user/view-products", { product, user });
  });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  } else {
    res.render("user/login", { loginErr: req.session.loginErr });
    req.session.loginErr = false;
  }
});

router.get("/cart", (req, res) => {
  res.send("hi");
});

router.get("/singup", (req, res) => {
  res.render("user/singup");
});
router.post("/singup", (req, res) => {
  userHelpers.doSingup(req.body).then((response) => {});
});
router.post("/login", (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect("/");
    } else {
      req.session.loginErr = "Invalid username or Password";
      res.redirect("/login");
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
