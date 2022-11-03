const pool = require("../database");

const nameTable = "paciente";
//patient = paciente
//getPatients = obtiene todas los registros de la tabla paciente
async function getPatients(req, res) {
  const query = `SELECT * FROM ${nameTable} WHERE estado = true;`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      if (result.rowCount > 0) {
        res.status(201).send({
          code: 201,
          message: "Pacientes obtenidos correctamente",
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

//getPatientsWithPersonUserInfo = obtiene todos los registros de lso pacientes incluyendo la informacion de usuario y persona
async function getPatientsWithPersonUserInfo(req, res) {
  const query = `SELECT * FROM ${nameTable} 
  INNER JOIN usuario ON usuario.id_usuario = paciente.id_usuario
  INNER JOIN persona ON persona.id_persona = usuario.id_persona 
  WHERE usuario.estado_usuario = true AND paciente.estado_paciente = true;`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      // console.log(result.rows);
      if (result.rowCount > 0) {
        res.status(201).send({
          code: 201,
          message: "Pacientes obtenidos correctamente",
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
      console.log(err);
      res.status(500).send({
        code: 500,
        message: "Error del servidor: " + err.message,
        error: err,
      });
    });
}

//getPatient = obtiene un registro de la tabla getPatient por ID
async function getPatient(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM ${nameTable} WHERE id_paciente = ${id} estado = true;`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      if (result.rowCount > 0) {
        res.status(201).send({
          code: 201,
          message: "Paciente obtenidos correctamente",
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

async function getPatientWithPersonUserInfo(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM ${nameTable} 
  INNER JOIN usuario ON usuario.id_usuario = paciente.id_usuario
  INNER JOIN persona ON persona.id_persona = usuario.id_persona 
  WHERE paciente.id_paciente = ${id} AND paciente.estado_paciente = true;`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      if (result.rowCount > 0) {
        res.status(201).send({
          code: 201,
          message: "Paciente obtenidos correctamente",
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
      console.log(err);
      res.status(500).send({
        code: 500,
        message: "Error del servidor: " + err.message,
        error: err,
      });
    });
}

async function getPatientsWithPersonUserInfoSearch(req, res) {
  const { ci } = req.query;
  const query = `SELECT * FROM ${nameTable} 
  INNER JOIN usuario ON usuario.id_usuario = paciente.id_usuario
  INNER JOIN persona ON persona.id_persona = usuario.id_persona 
  WHERE usuario.estado_usuario = true 
  AND paciente.estado_paciente = true 
  AND persona.ci LIKE '%${ci}%'`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      if (result.rowCount > 0) {
        res.status(201).send({
          code: 201,
          message: "Paciente obtenidos correctamente",
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
      console.log(err);
      res.status(500).send({
        code: 500,
        message: "Error del servidor: " + err.message,
        error: err,
      });
    });
}

//addPatient = Agrega un paciente
async function addPatient(req, res) {
  const { id_usuario, favorito, estado_paciente } = req.body;

  const query = `INSERT INTO ${nameTable} 
  (id_usuario, favorito, estado_paciente) 
  VALUES ('${id_usuario}', ${favorito}, ${estado_paciente}) 
  RETURNING id_paciente`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      res.status(200).send({
        code: 201,
        message: "Paciente registrado correctamente",
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

//updatePatient = Modifica un paciente por ID
async function updatePatient(req, res) {
  const { id_usuario, favorito, estado } = req.body;
  const { id_paciente } = req.params;

  const query = `UPDATE ${nameTable} 
  SET id_usuario = '${id_usuario}', 
  favorito = ${favorito}, 
  estado = ${estado} 
  WHERE id_paciente = ${id_paciente}`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      res.status(200).send({
        code: 201,
        message: "Paciente actualizado correctamente",
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

//deletePatient = Elimina un paciente por ID
async function deletePatient(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM ${nameTable} 
  WHERE id_paciente = ${id}`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      res.status(200).send({
        code: 201,
        message: "Paciente eliminado correctamente",
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
  getPatients,
  getPatient,
  getPatientsWithPersonUserInfo,
  getPatientWithPersonUserInfo,
  addPatient,
  updatePatient,
  deletePatient,
  getPatientsWithPersonUserInfoSearch,
};
