const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger-output.json");

//#region RUTAS
//#region Rutas de Testeo para API
const testRoute = require("./test/arUnity.test.route");
//#endregion

//#endregion

function routerApi(app) {
  const router = express.Router();
  app.use("/", router);
  app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

  router.use("/test", testRoute);
}

module.exports = routerApi;
