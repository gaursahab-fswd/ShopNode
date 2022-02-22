module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define("user", {
    name: DataTypes.STRING,
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: DataTypes.STRING,
  });
  return UserModel;
};
