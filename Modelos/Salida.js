const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Salida = sequelize.define(
  "salida",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_salida: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hora_salida: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    vehiculo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    placa_vehiculo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    motorista: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "salida",
    timestamps: false,
  },
);

module.exports = Salida;
