const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect("mongodb://localhost:27017/form").then((data) => {
    console.log(`Mongodb connected with server : ${data.connection.host}`);
  });
};
module.exports = connectDatabase;
