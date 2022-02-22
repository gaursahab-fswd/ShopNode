module.exports = (sequelize, DataTypes) => {
  const OrderModel = sequelize.define("order", {
    userid: DataTypes.STRING,
    orderno: DataTypes.STRING,
    date: DataTypes.STRING,
    quatity: DataTypes.INTEGER,
    totalprice: DataTypes.TEXT,
    products: DataTypes.TEXT,
  });
  return OrderModel;
};
