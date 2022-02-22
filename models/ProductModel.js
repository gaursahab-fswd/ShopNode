module.exports = (sequelize, DataTypes) => {
  const ProductModel = sequelize.define("product", {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    sellingprice: DataTypes.FLOAT,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
  });
  return ProductModel;
};
