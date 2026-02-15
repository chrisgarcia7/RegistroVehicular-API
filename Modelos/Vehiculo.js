const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Vehiculo = sequelize.define(
  "Vehiculos",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Placa: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "Vehiculos",
    timestamps: false,
  },
);

module.exports = Vehiculo;
