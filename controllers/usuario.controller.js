const pool = require("../database");

const nameTable = "usuario";
//user = Usuario
//login = Es el inicio de sesion
async function login(req, res) {
  const { ci, password } = req.body;
  const query = `SELECT 
  usuario.id_usuario, persona.ci, usuario.password 
  FROM usuario 
  INNER JOIN persona 
  ON persona.id_persona = usuario.id_persona 
  WHERE persona.ci = '${ci}' 
  AND usuario.password = '${password}' 
  AND usuario.estado = true;`;

  console.log(query);

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
      console.log(err);
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
  WHERE usuario.id_usuario = '${id}' AND usuario.estado = true;`;

  console.log(query);

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

async function addUser(req, res) {
  const {
    id_persona,
    password,
    fecha_registro,
    fecha_ingreso,
    estado_usuario,
  } = req.body;

  const query = `INSERT INTO ${nameTable} 
  (id_persona, 
    password, 
    fecha_registro, 
    fecha_ingreso, 
    estado_usuario) 
  VALUES 
  (${id_persona}, 
  '${password}', 
  '${fecha_registro}', 
  '${fecha_ingreso}', 
  ${estado_usuario}) 
  RETURNING id_usuario`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      res.status(200).send({
        code: 201,
        message: "Usuario registrado correctamente",
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

//deleteUser = Elimina un usuario por ID
async function deleteUser(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM ${nameTable} 
  WHERE id_usuario = ${id}`;

  console.log(query);

  pool
    .query(query)
    .then((result) => {
      res.status(200).send({
        code: 201,
        message: "Usuario eliminado correctamente",
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
  login,
  getMe,
  addUser,
  deleteUser,
};
