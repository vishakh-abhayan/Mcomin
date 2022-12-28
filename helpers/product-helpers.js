var db = require("../config/connection");
module.exports = {
  addproducts: (product, callback) => {
    // console.log(product);

    db.get()
      .collection("product")
      .insertOne(product)
      .then((data) => {
        callback(data.insertedId);
      });
  },
};
