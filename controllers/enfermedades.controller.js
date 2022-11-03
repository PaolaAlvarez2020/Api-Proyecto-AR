const pool = require("../database");

const nameTable = "enfermedad";
//disease = enfermedad
//getDiseases = obtiene todas los registros de la tabla enfermedad
async function getDiseases(req, res) {
  const query = `SELECT * FROM ${nameTable};`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      if (result.rowCount > 0) {
        res.status(201).send({
          code: 201,
          message: "Enfermedades obtenidos correctamente",
          data: result.rows,
        });
      } else {
        res.status(404).send({
          code: 404,
          message: "No se pudo obtener la información",
          data: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error del servidor: " + err.message,
        error: err,
      });
    });
}

//getDisease = obtiene un registro de la tabla getDisease por ID
async function getDisease(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM ${nameTable} WHERE id_enfermedad = ${id}`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      console.log(result.rows);
      if (result.rowCount > 0) {
        res.status(201).send({
          code: 201,
          message: "Énfermedad obtenidos correctamente",
          data: result.rows,
        });
      } else {
        res.status(404).send({
          code: 404,
          message: "No se pudo obtener la información",
          data: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error del servidor: " + err.message,
        error: err,
      });
    });
}

//addDisease = Agrega un enfermedad
async function addDisease(req, res) {
  const {
    nombre_enfermedad,
    apellido_paterno,
    apellido_materno,
    telefono,
    direccion,
    genero,
    fecha_nacimiento,
    ciudad,
    id_foto,
    ci,
  } = req.body;

  const query = `INSERT INTO ${nameTable} 
  (nombre_enfermedad,
    apellido_paterno,
    apellido_materno,
    telefono,
    direccion,
    genero,
    fecha_nacimiento,
    ciudad,
    id_foto,
    ci) 
  VALUES ('${nombre_enfermedad}', 
  '${apellido_paterno}', 
  '${apellido_materno}', 
  '${telefono}', 
  '${direccion}', 
  ${genero}, 
  '${fecha_nacimiento}', 
  '${ciudad}',
  '${id_foto}',
  '${ci}') 
  RETURNING id_enfermedad`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      console.log(result.rows);
      res.status(200).send({
        code: 201,
        message: "Énfermedad registrado correctamente",
        data: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        code: 500,
        message: "Error del servidor: " + err.message,
        error: err,
      });
    });
}

//updateDisease = Modifica un enfermedad por ID
async function updateDisease(req, res) {
  const {
    nombre_enfermedad,
    apellido_paterno,
    apellido_materno,
    telefono,
    direccion,
    genero,
    fecha_nacimiento,
    ciudad,
    id_foto,
    ci,
  } = req.body;
  const { id } = req.params;

  const query = `UPDATE ${nameTable} 
  SET 
  nombre_enfermedad = '${nombre_enfermedad}', 
  apellido_paterno = '${apellido_paterno}', 
  apellido_materno = '${apellido_materno}', 
  telefono = '${telefono}', 
  direccion = '${direccion}', 
  genero = ${genero},
  fecha_nacimiento = '${fecha_nacimiento}', 
  ciudad = '${ciudad}', 
  id_foto = '${id_foto}', 
  ci = '${ci}' 
  WHERE id_enfermedad = ${id}`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      res.status(200).send({
        code: 201,
        message: "Énfermedad actualizado correctamente",
        data: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        code: 500,
        message: "Error del servidor: " + err.message,
        error: err,
      });
    });
}

//deleteDisease = Elimina un enfermedad por ID
async function deleteDisease(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM ${nameTable} 
  WHERE id_enfermedad = ${id}`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      res.status(200).send({
        code: 201,
        message: "Énfermedad eliminado correctamente",
        data: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        code: 500,
        message: "Error del servidor: " + err.message,
        error: err,
      });
    });
}

module.exports = {
  getDiseases,
  getDisease,
  addDisease,
  updateDisease,
  deleteDisease,
};
