const pool = require("../../database");

//consultation = consulta
//getConsultations = obtiene todas los registros de la tabla consulta
async function getConsultations(req, res) {
  const query = `SELECT * FROM public.consulta WHERE estado = true;`;

  pool
    .query(query)
    .then((result) => {
      if (result.rowCount > 0) {
        res.status(201).send({
          code: 201,
          message: "Consultas obtenidas correctamente",
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

//getConsultation = obtiene un registro de la tabla consulta por ID
async function getConsultation(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM public.consulta WHERE id_consulta = ${id} estado = true;`;
  pool
    .query(query)
    .then((result) => {
      if (result.rowCount > 0) {
        res.status(201).send({
          code: 201,
          message: "Consultas obtenidas correctamente",
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
  getConsultations,
  getConsultation,
};
