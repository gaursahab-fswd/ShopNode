const { Sequelize, DataTypes } = require("sequelize");

// Creating new Object of Sequelize
const sequelize = new Sequelize("shopping", "root", "Admin#mysql", {
  // Explicitly specifying
  // mysql database
  dialect: "mysql",

  // By default host is 'localhost'
  host: "localhost",
  logging: false,
});

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connected!");
    })
    .catch((err) => {
      console.log("err", err);
    });

  const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.OrderModel = require("./OrderModel")(sequelize, DataTypes);
db.ProductModel = require("./ProductModel")(sequelize, DataTypes);
db.UserModel = require("./UserModel")(sequelize, DataTypes);

// Exporting the sequelize object.
// We can use it in another file
// for creating models
module.exports = db;
