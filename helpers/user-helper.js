const bcrypt = require("bcrypt");
var db = require("../config/connection");
var collection = require("../config/collections");

module.exports = {
  doSingup: (userData) => {
    return new Promise(async (resolve, reject) => {
      userData.password = await bcrypt.hash(userData.password, 10);
      db.get()
        .collection(collection.USER_COLLECTION)
        .insertOne(userData)
        .then((data) => {
          console.log(data);
          resolve(data);
        });
    });
  },
};
