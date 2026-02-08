const mongoose = require("mongoose");

function connectTODb() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connect TO Dsatabase");
  });
}
connectTODb();
// yaha pr connectTODb function create krke , export kro then server.js me
module.exports = connectTODb;
