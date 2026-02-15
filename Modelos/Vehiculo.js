const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Vehiculo = sequelize.define(
  "vehiculo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "vehiculo",
    timestamps: false,
  },
);

module.exports = Vehiculo;
