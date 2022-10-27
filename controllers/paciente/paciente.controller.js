const pool = require("../../database");

//patient = paciente
//getPatients = obtiene todas los registros de la tabla paciente
async function getPatients(req, res) {
  const query = `SELECT * FROM public.paciente WHERE estado = true;`;

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
        message: "Error del servidor" + err.message,
        error: err,
      });
    });
}

//getPatient = obtiene un registro de la tabla getPatient por ID
async function getPatient(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM public.paciente WHERE id_consulta = ${id} estado = true;`;
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
        message: "Error del servidor" + err.message,
        error: err,
      });
    });
}

module.exports = {
  getPatients,
  getPatient,
};
