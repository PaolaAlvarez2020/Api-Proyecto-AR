const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger-output.json");

//#region RUTAS
//#region Rutas de Testeo para API
const testRoute = require("./test/arUnity.test.route");
//#endregion

//#region RUTAS DE PACIENTE
const patientRoute = require("./paciente.route");
//#endregion

//#region RUTAS DE CONSULTA
const consultationRoute = require("./consulta.route");
//#endregion

//#region RUTAS DE USUARIO
const userRoute = require("./usuario.route");
//#endregion

//#region RUTAS DE PERSONAS
const personRoute = require("./persona.route");
//#endregion

//#region RUTAS DE PERSONAS
const diseaseRoute = require("./enfermedad.route");
//#endregion

//#endregion

function routerApi(app) {
  const router = express.Router();
  app.use("/", router);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

  router.use("/test", testRoute);
  router.use("/pacientes", patientRoute);
  router.use("/consultas", consultationRoute);
  router.use("/usuarios", userRoute);
  router.use("/personas", personRoute);
  router.use("/enfermedades", diseaseRoute);
}

module.exports = routerApi;
