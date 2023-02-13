const bcrypt = require("bcrypt");
var db = require("../config/connection");
var collection = require("../config/collections");
const { resolve } = require("express-hbs/lib/resolver");
var objectjId = require("mongodb").ObjectId;

module.exports = {
  doSingup: (userData) => {
    return new Promise(async (resolve, reject) => {
      userData.password = await bcrypt.hash(userData.password, 10);
      db.get()
        .collection(collection.USER_COLLECTION)
        .insertOne(userData)
        .then((data) => {
          resolve(data.insertedId);
        });
    });
  },
  doLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      let loginStatus = false;
      let response = {};
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: userData.email });
      console.log(user);
      if (user) {
        bcrypt.compare(userData.password, user.password).then((status) => {
          if (status) {
            console.log("login sucess");
            response.user = user;
            response.status = true;
            resolve(response);
          } else {
            console.log("login failed");
            resolve({ status: false });
          }
        });
      } else {
        console.log("loging falied");
        resolve({ status: false });
      }
    });
  },
  addToCart: (proId, userId) => {
    let proObj = {
      item: objectjId(proId),
      quantity: 1,
    };
    return new Promise(async (resolve, reject) => {
      let userCart = await db
        .get()
        .collection(collection.CART_COLLECTION)
        .findOne({ user: objectjId(userId) });
      if (userCart) {
        let proExist = userCart.products.findIndex(
          (product) => product.item == proId
        );
        console.log(proExist);
        if (proExist != -1) {
          db.get()
            .collection(collection.CART_COLLECTION)
            .updateOne(
              {
                user: objectjId(userId),
                "products.item": objectjId(proId),
              },
              {
                $inc: { "products.$.quantity": 1 },
              }
            )
            .then(() => {
              resolve();
            });
        } else {
          db.get()
            .collection(collection.CART_COLLECTION)
            .updateOne(
              { user: objectjId(userId) },
              {
                $push: {
                  products: proObj,
                },
              }
            );
        }
      } else {
        let cartObj = {
          user: objectjId(userId),
          products: [proObj],
        };
        db.get()
          .collection(collection.CART_COLLECTION)
          .insertOne(cartObj)
          .then((response) => {
            resolve(response);
          });
      }
    });
  },
  getCartProduct: (userId) => {
    return new Promise(async (resolve, reject) => {
      let cartItems = await db
        .get()
        .collection(collection.CART_COLLECTION)
        .aggregate([
          {
            $match: { user: objectjId(userId) },
          },
          {
            $unwind: "$products",
          },
          {
            $project: {
              item: "$products.item",
              quantity: "$products.quantity",
            },
          },
          {
            $lookup: {
              from: collection.PRODUCT_COLLECTION,
              localField: "item",
              foreignField: "_id",
              as: "product",
            },
          },
          {
            $project: {
              item: 1,
              quantity: 1,
              product: { $arrayElemAt: ["$product", 0] },
            },
          },
        ])
        .toArray();
      resolve(cartItems);
    });
  },
  getCartCount: (userId) => {
    return new Promise(async (resolve, reject) => {
      let cart = await db
        .get()
        .collection(collection.CART_COLLECTION)
        .findOne({ user: objectjId(userId) });
      if (cart) {
        count = cart.products.length;
      } else {
        count = 0;
      }
      resolve(count);
    });
  },
  changeProductQuntity: (data) => {
    data.count = parseInt(data.count);
    data.quantity = parseInt(data.quantity);
    if (data.count == -1 && data.quantity == 1) {
      return new Promise((resolve, reject) => {
        count = parseInt(data.count);
        db.get()
          .collection(collection.CART_COLLECTION)
          .updateOne(
            {
              _id: objectjId(data.cart),
            },
            {
              $pull: { products: { item: objectjId(data.product) } },
            }
          )
          .then((response) => {
            resolve({ removeProduct: true });
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        count = parseInt(data.count);
        db.get()
          .collection(collection.CART_COLLECTION)
          .updateOne(
            {
              _id: objectjId(data.cart),
              "products.item": objectjId(data.product),
            },
            {
              $inc: { "products.$.quantity": count },
            }
          )
          .then((response) => {
            resolve(true);
          });
      });
    }
  },
};
