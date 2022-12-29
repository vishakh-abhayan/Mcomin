var db = require("../config/connection");
module.exports = {
  addproducts: (product, callback) => {
    db.get()
      .collection("product")
      .insertOne(product)
      .then((data) => {
        callback(data.insertedId);
      });
  },
};
