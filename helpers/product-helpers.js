var db = require("../config/connection");
var collection = require("../config/collections");
var objId = require("mongodb").ObjectId;
module.exports = {
  addproducts: (product, callback) => {
    db.get()
      .collection(collection.PRODUCT_COLLECTION)
      .insertOne(product)
      .then((data) => {
        callback(data.insertedId);
      });
  },
  getAllProducts: () => {
    return new Promise(async (reslove, reject) => {
      let product = await db
        .get()
        .collection(collection.PRODUCT_COLLECTION)
        .find()
        .toArray();
      reslove(product);
    });
  },
  deleteProduct: (proId) => {
    new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .deleteOne({ _id: objId(proId) })
        .then((response) => {
          resolve(response);
        });
    });
  },
};
