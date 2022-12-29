var express = require("express");
var router = express.Router();
var productHelpers = require("../helpers/product-helpers");
/* GET users listing. */
router.get("/", function (req, res, next) {
  productHelpers.getAllProducts().then((product) => {
    console.log(product);
    res.render("admin/view-products", { admin: true, product });
  });
});

router.get("/add-products", function (req, res) {
  res.render("admin/add-products");
});
router.post("/add-products", (req, res) => {
  productHelpers.addproducts(req.body, (id) => {
    let image = req.files.image;
    console.log(id);
    image.mv("./public/product-images/" + id + ".jpg", (err) => {
      if (!err) {
        res.render("admin/add-products");
      } else {
        console.log(err);
      }
    });
  });
});

module.exports = router;
