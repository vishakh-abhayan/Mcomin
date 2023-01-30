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
    return new Promise(async (resolve, reject) => {
      let userCart = await db
        .get()
        .collection(collection.CART_COLLECTION)
        .findOne({ user: objectjId(userId) });
      if (userCart) {
        db.get()
          .collection(collection.CART_COLLECTION)
          .updateOne(
            { user: objectjId(userId) },
            {
              $push: {
                products: objectjId(proId),
              },
            }
          );
      } else {
        let cartObj = {
          user: objectjId(userId),
          products: [objectjId(proId)],
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
            $lookup: {
              from: collection.PRODUCT_COLLECTION,
              let: { prodList: "$products" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$_id", "$$prodList"],
                    },
                  },
                },
              ],
              as: "cartItems",
            },
          },
        ])
        .toArray();
      resolve(cartItems[0].cartItems);
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
};
