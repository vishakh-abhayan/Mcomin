var express = require("express");
var router = express.Router();
var productHelpers = require("../helpers/product-helpers");
var userHelpers = require("../helpers/user-helper");
const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};

/* GET home page. */
router.get("/", async function (req, res, next) {
  let user = req.session.user;
  let cartCount = null;
  if (req.session.user) {
    cartCount = await userHelpers.getCartCount(req.session.user._id);
  }
  productHelpers.getAllProducts().then((product) => {
    res.render("user/view-products", { product, user, cartCount });
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

router.get("/singup", (req, res) => {
  res.render("user/singup");
});
router.post("/singup", (req, res) => {
  userHelpers.doSingup(req.body).then((response) => {
    req.session.loggedIn = true;
    req.session.user = response.user;
    res.redirect("/");
  });
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

router.get("/cart", verifyLogin, async (req, res) => {
  let product = await userHelpers.getCartProduct(req.session.user._id);
  res.render("user/cart", { product, user: req.session.user });
});

router.get("/add-to-cart/:id", (req, res) => {
  console.log("api call.......");
  userHelpers.addToCart(req.params.id, req.session.user._id);
  res.json({ status: true });
});

router.post("/change-product-quantity", (req, res, next) => {
  userHelpers.changeProductQuntity(req.body).then((response) => {
    res.json(response);
  });
});

module.exports = router;
