const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Entrada = sequelize.define(
  "entrada",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vehiculo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    motorista: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_entrada: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hora_entrada: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    kilometraje: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    tableName: "entrada",
    timestamps: false,
  },
);

module.exports = Entrada;
