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
      item: "Iphobe 14 pro",
      cat: "Mobile",
      discibe: "This is the best samrt phone ever made",
      image:
        "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1662703416/Croma%20Assets/Communication/Mobiles/Images/261991_hhfa33.png/mxw_640,f_auto",
    },
    {
      item: "Iphobe 12 pro",
      cat: "Mobile",
      discibe: "This is the best samrt phone ever made",
      image:
        "https://www.refurbished.store/cache/images/iphone-12-pro-max_600x600_BGresize_16777215-tj.png",
    },
    {
      item: "Iphobe 11 pro",
      cat: "Mobile",
      discibe: "This is the best samrt phone ever made",
      image:
        "https://cellbuddy.in/buddy/wp-content/uploads/2022/09/11-Pro-Max-green.png",
    },
    {
      item: "Iphobe 13 pro",
      cat: "Mobile",
      discibe: "This is the best samrt phone ever made",
      image: "https://m.media-amazon.com/images/I/61i8Vjb17SL._SL1500_.jpg",
    },
    {
      item: "Iphobe 14 pro",
      cat: "Mobile",
      discibe: "This is the best samrt phone ever made",
      image:
        "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1662703416/Croma%20Assets/Communication/Mobiles/Images/261991_hhfa33.png/mxw_640,f_auto",
    },
    {
      item: "Iphobe 12 pro",
      cat: "Mobile",
      discibe: "This is the best samrt phone ever made",
      image:
        "https://www.refurbished.store/cache/images/iphone-12-pro-max_600x600_BGresize_16777215-tj.png",
    },
    {
      item: "Iphobe 11 pro",
      cat: "Mobile",
      discibe: "This is the best samrt phone ever made",
      image:
        "https://cellbuddy.in/buddy/wp-content/uploads/2022/09/11-Pro-Max-green.png",
    },
  ];

  res.render("index", { product, admin: false });
});

module.exports = router;
