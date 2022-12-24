var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let product = [
    {
      item: "Iphobe 13 ",
      cat: "Mobile",
      discibe: "This is the best samrt phone ever made",
      image:
        "https://s3bo.cashify.in/gpro/uploads/2020/11/29054414/apple-iphone-13-front-3.png?p=gp4sq&s=gp",
    },
    {
      item: "Google Pixel 7 Pro",
      cat: "Mobile",
      discibe: "This is the best samrt phone ever made",
      image:
        "https://s3bo.cashify.in/gpro/uploads/2022/01/07104052/google-pixel-7-pro-front.jpg?p=gp4sq&s=gp",
    },
    {
      item: "Samsung Galaxy Z Fold3 5G",
      cat: "Mobile",
      discibe: "This is the best samrt phone ever made",
      image:
        "https://s3bo.cashify.in/gpro/uploads/2021/02/12050100/samsung-galaxy-z-fold3-front-3.png?p=gp4sq&s=gp",
    },
    {
      item: "iQOO 9T 5G",
      cat: "Mobile",
      discibe: "This is the best samrt phone ever made",
      image:
        "https://s3bo.cashify.in/gpro/uploads/2022/06/02165516/iqoo-9t-5g-front-2.jpg?p=gp4sq&s=gp",
    },
    {
      item: "Xiaomi 13",
      cat: "Mobile",
      discibe: "This is the best samrt phone ever made",
      image:
        "https://s3bo.cashify.in/gpro/uploads/2022/07/13175845/xiaomi-13-front-2.jpg?p=gp4sq&s=gp",
    },
    {
      item: "Iphobe 14 pro",
      cat: "Mobile",
      discibe: "This is the best samrt phone ever made",
      image:
        "https://s3bo.cashify.in/gpro/uploads/2021/09/12145745/apple-iphone-14-pro-max-front-2.jpg?p=gp4sq&s=gp",
    },
    {
      item: "Samsung Galaxy S22 Ultra 5G",
      cat: "Mobile",
      discibe: "This is the best samrt phone ever made",
      image:
        "https://s3bo.cashify.in/gpro/uploads/2020/03/08161318/samsung-galaxy-s20-plus-front.jpg?p=gp4sq&s=gp",
    },
    {
      item: "Nothing Phone (1)",
      cat: "Mobile",
      discibe: "This is the best samrt phone ever made",
      image:
        "https://s3bo.cashify.in/gpro/uploads/2022/07/13102200/nothing-phone-1-front.jpg?p=gp4sq&s=gp",
    },
  ];

  res.render("index", { product, admin: false });
});

module.exports = router;
