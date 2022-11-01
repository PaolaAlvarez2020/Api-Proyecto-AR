const pool = require("../../database");

//user = Usuario
//login = Es el inicio de sesion
async function login(req, res) {
  const { user, password } = req.body;
  const query = `SELECT 
  persona.ci, usuario.password 
  FROM usuario 
  INNER JOIN persona 
  ON persona.id_persona = usuario.id_persona 
  WHERE persona.ci = ${user} 
  AND usuario.password = ${password} 
  AND usuario.estado = true;`;

  pool
    .query(query)
    .then((result) => {
      if (result.rowCount > 0) {
        res.status(201).send({
          code: 201,
          message: "Inicio de sesión correcto",
          data: result.rows,
        });
      } else {
        res.status(404).send({
          code: 404,
          message: "Carnet o contraseña incorrectos",
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

//getMe = Obtiene la información del usuario por ID
async function getMe(req, res) {
  const { id } = req.params;
  const query = `SELECT * 
  FROM usuario 
  INNER JOIN persona 
  ON persona.id_persona = usuario.id_persona 
  WHERE usuario.id=${id} AND usuario.estado = true;`;

  pool
    .query(query)
    .then((result) => {
      if (result.rowCount > 0) {
        res.status(201).send({
          code: 201,
          message: "Usuario obtenido correctamente",
          data: result.rows,
        });
      } else {
        res.status(404).send({
          code: 404,
          message: "Usuario inexistente",
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
  login,
  getMe,
};
