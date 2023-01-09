var db = require("../config/connection");
var collection = require("../config/collections");
var objectjId = require("mongodb").ObjectId;
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
    return new Promise((resolve, reject) => {
      console.log(proId);
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .deleteOne({ _id: objectjId(proId) })
        .then((response) => {
          resolve(response);
        });
    });
  },
  getProductDetails: (proId) => {
    return new Promise((reslove, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .findOne({ _id: objectjId(proId) })
        .then((product) => {
          reslove(product);
        });
    });
  },
  updateProduct: (proId, proData) => {
    return new Promise((reslove, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .updateOne(
          { _id: objectjId(proId) },
          {
            $set: {
              Name: proData.Name,
              Category: proData.Category,
              Price: proData.Price,
              Description: proData.Description,
            },
          }
        )
        .then((response) => {
          reslove();
        });
    });
  },
};
