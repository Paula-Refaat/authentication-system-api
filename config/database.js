const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((conn) => {
      console.log(`Database Connected on host ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(`Database Connection failed ${err}`);
      process.exit(1);
    });
};
module.exports = dbConnection;
