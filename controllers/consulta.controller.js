const pool = require("../database");

const nameTable = "consulta";
//consultation = consulta
//getConsultations = obtiene todas los registros de la tabla consulta
async function getConsultations(req, res) {
  const query = `SELECT * FROM ${nameTable} WHERE estado = true;`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      if (result.rowCount > 0) {
        res.status(201).send({
          code: 201,
          message: "Consultas obtenidos correctamente",
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

//getConsultation = obtiene un registro de la tabla getConsultation por ID
async function getConsultation(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM ${nameTable} WHERE id_consulta = ${id} estado = true;`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      if (result.rowCount > 0) {
        res.status(201).send({
          code: 201,
          message: "Consulta obtenidos correctamente",
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

//addConsultation = Agrega un consulta
async function addConsultation(req, res) {
  const { id_paciente, id_enfermedad, fecha, descripcion, id_foto, estado } =
    req.body;

  const query = `INSERT INTO ${nameTable} 
  (id_paciente, id_enfermedad, fecha, descripcion, id_foto, estado) 
  VALUES ('${id_paciente}', '${id_enfermedad}', '${fecha}', '${descripcion}', '${id_foto}', ${estado})`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      res.status(200).send({
        code: 201,
        message: "Consulta registrado correctamente",
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

//updateConsultation = Modifica un consulta por ID
async function updateConsultation(req, res) {
  const { id_paciente, id_enfermedad, fecha, descripcion, id_foto, estado } =
    req.body;
  const { id_consulta } = req.params;

  const query = `UPDATE ${nameTable} 
  SET id_usuario = '${id_paciente}', 
  id_enfermedad = '${id_enfermedad}', 
  fecha = '${fecha}', 
  descripcion = '${descripcion}', 
  id_foto = '${id_foto}', 
  estado = ${estado}
  WHERE id_consulta = ${id_consulta}`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      res.status(200).send({
        code: 201,
        message: "Consulta actualizado correctamente",
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

//deleteConsultation = Elimina un consulta por ID
async function deleteConsultation(req, res) {
  const { id_consulta } = req.params;

  const query = `DELETE FROM ${nameTable} 
  WHERE id_consulta = ${id_consulta}`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      res.status(200).send({
        code: 201,
        message: "Consulta eliminado correctamente",
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
  getConsultations,
  getConsultation,
  addConsultation,
  updateConsultation,
  deleteConsultation,
};
