const pool = require("../database");

const nameTable = "persona";
//person = persona
//getPersons = obtiene todas los registros de la tabla persona
async function getPersons(req, res) {
  const query = `SELECT * FROM ${nameTable};`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      if (result.rowCount > 0) {
        res.status(201).send({
          code: 201,
          message: "Personas obtenidos correctamente",
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

//getPerson = obtiene un registro de la tabla getPerson por ID
async function getPerson(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM ${nameTable} WHERE id_persona = ${id}`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      if (result.rowCount > 0) {
        res.status(201).send({
          code: 201,
          message: "Persona obtenidos correctamente",
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

//addPerson = Agrega un persona
async function addPerson(req, res) {
  const {
    nombre,
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
  (nombre,
    apellido_paterno,
    apellido_materno,
    telefono,
    direccion,
    genero,
    fecha_nacimiento,
    ciudad,
    id_foto,
    ci) 
  VALUES ('${nombre}', 
  '${apellido_paterno}', 
  '${apellido_materno}', 
  '${telefono}', 
  '${direccion}', 
  ${genero}
  '${fecha_nacimiento}', 
  '${ciudad}',
  '${id_foto}',
  '${ci}')`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      res.status(200).send({
        code: 201,
        message: "Persona registrado correctamente",
        data: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error del servidor: " + err.message,
        error: err,
      });
    });
}

//updatePerson = Modifica un persona por ID
async function updatePerson(req, res) {
  const {
    nombre,
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
  const { id_persona } = req.params;

  const query = `UPDATE ${nameTable} 
  SET 
  nombre = '${nombre}', 
  apellido_paterno = '${apellido_paterno}', 
  apellido_materno = '${apellido_materno}', 
  telefono = '${telefono}', 
  direccion = '${direccion}', 
  genero = ${genero}
  fecha_nacimiento = '${fecha_nacimiento}', 
  ciudad = '${ciudad}', 
  id_foto = '${id_foto}', 
  ci = '${ci}', 
  WHERE id_persona = ${id_persona}`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      res.status(200).send({
        code: 201,
        message: "Persona actualizado correctamente",
        data: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error del servidor: " + err.message,
        error: err,
      });
    });
}

//deletePerson = Elimina un persona por ID
async function deletePerson(req, res) {
  const { id_persona } = req.params;

  const query = `DELETE FROM ${nameTable} 
  WHERE id_persona = ${id_persona}`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      res.status(200).send({
        code: 201,
        message: "Persona eliminado correctamente",
        data: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error del servidor: " + err.message,
        error: err,
      });
    });
}

module.exports = {
  getPersons,
  getPerson,
  addPerson,
  updatePerson,
  deletePerson,
};
