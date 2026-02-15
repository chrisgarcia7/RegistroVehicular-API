const express = require("express");
const { where } = require("sequelize");

var cors = require("cors");
const Vehiculo = require("./Modelos/Vehiculo");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/vehiculo", async (req, res) => {
  try {
    const vehiculos = await Vehiculo.findAll();

    res.status(200).json(vehiculos);
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error" });
  }
});

app.post("/vehiculo", async (req, res) => {
  try {
    console.log(req.body);
    const vehiculo = await Vehiculo.create(req.body);

    res.status(200).json({ mensaje: "vehiculo agregado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error" + error });
  }
});

app.put("/vehiculo/:idvehiculo", async (req, res) => {
  try {
    const [updated] = await Vehiculo.update(req.body, {
      where: { id: req.params.idvehiculo },
    });

    if (updated) {
      res.status(200).json({ mesnaje: "vehiculo actualizado correctamente" });
    } else {
      res.status(400).json({ mesnaje: "No se actualizo" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error" + error });
  }
});

app.delete("/vehiculo/:idvehiculo", async (req, res) => {
  try {
    const deleted = await Vehiculo.destroy({
      where: { id: req.params.idvehiculo },
    });
    if (deleted) {
      res.status(200).send({ mesnaje: "vehiculo eliminado correctamente" });
    } else {
      res.status(404).json({ error: "vehiculo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar vehiculo" + error });
  }
});

app.listen(5001, () => {
  console.log("aplcacion ejecutando en puerto 5000");
});
