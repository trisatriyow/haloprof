"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Docter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Docter.hasMany(models.Appointment, { foreignKey: "DoctorId" });
    }
  }
  Docter.init(
    {
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      spesialisasi: DataTypes.STRING,
      count: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Docter",
    }
  );
  return Docter;
};
