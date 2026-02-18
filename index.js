const express = require("express");
const { where } = require("sequelize");

var cors = require("cors");
const Vehiculo = require("./Modelos/Vehiculo");
const Entrada = require("./Modelos/Entrada");
const Salida = require("./Modelos/Salida");

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

app.get("/entrada", async (req, res) => {
  try {
    const entrada = await Entrada.findAll();

    res.status(200).json(entrada);
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error" });
  }
});

app.post("/entrada", async (req, res) => {
  try {
    console.log(req.body);
    const { vehiculo_id } = req.body;
    const vehiculoAdentro = await Entrada.findOne({
      where: {
        vehiculo_id: vehiculo_id,
        isAdentro: true,
      },
    });

    if (vehiculoAdentro) {
      return res.status(400).json({
        mensaje: "El vehículo ya se encuentra dentro.",
      });
    }

    await Entrada.create({
      ...req.body,
      isAdentro: true,
    });

    res.status(200).json({ mensaje: "Entrada registrada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error" + error });
  }
});

app.get("/salida", async (req, res) => {
  try {
    const salida = await Salida.findAll();

    res.status(200).json(salida);
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error" });
  }
});

app.post("/salida", async (req, res) => {
  try {
    console.log(req.body);

    const { vehiculo_id } = req.body;
    const entradaActiva = await Entrada.findOne({
      where: {
        vehiculo_id,
        isAdentro: true,
      },
    });

    if (!entradaActiva) {
      return res.status(400).json({
        mensaje: "El vehículo no se encuentra dentro.",
      });
    }

    await entradaActiva.update({
      isAdentro: false,
    });

    await Salida.create(req.body);

    res.status(200).json({ mensaje: "Salida registrada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error" + error });
  }
});

app.put("/entrada/:idvehiculo", async (req, res) => {
  try {
    const id = parseInt(req.params.idvehiculo, 10);
    const [updated] = await Entrada.update(req.body, {
      where: { id },
    });

    if (updated > 0) {
      res.status(200).json({ mensaje: "Vehículo actualizado correctamente" });
    } else {
      res.status(200).json({ mensaje: "No hubo cambios, pero no hubo error" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error" + error });
  }
});

app.listen(5001, () => {
  console.log("aplcacion ejecutando en puerto 5001");
});
