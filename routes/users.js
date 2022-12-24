var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let product = [
    {
      item: "Iphobe 13 pro",
      cat: "Mobile",
      discibe: "This is the best samrt phone ever made",
      image: "https://m.media-amazon.com/images/I/61i8Vjb17SL._SL1500_.jpg",
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
        "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1662703416/Croma%20Assets/Communication/Mobiles/Images/261991_hhfa33.png/mxw_640,f_auto",
    },
    {
      item: "Samsung Galaxy S22 Ultra 5G",
      cat: "Mobile",
      discibe: "This is the best samrt phone ever made",
      image:
        "https://s3bo.cashify.in/gpro/uploads/2021/06/10114014/samsung-galaxy-s22-ultra-front-1.jpg?p=gp4sq&s=gp",
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
