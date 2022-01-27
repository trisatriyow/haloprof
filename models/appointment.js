"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Appointment.belongsTo(models.User, { foreignKey: "UserId" });
      Appointment.belongsTo(models.Docter, { foreignKey: "DoctorId" });
    }
  }
  Appointment.init(
    {
      appointmentDate: DataTypes.DATE,
      UserId: DataTypes.INTEGER,
      DoctorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );
  return Appointment;
};
