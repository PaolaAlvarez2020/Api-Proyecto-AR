const express = require("express");
const controller = require("../controllers/paciente.controller");

const api = express.Router();

api.get("/", controller.getPatients);
api.get("/informacion-personas", controller.getPatientsWithPersonUserInfo);
api.get(
  "/informacion-personas-buscar",
  controller.getPatientsWithPersonUserInfoSearch
);
api.get("/informacion-persona/:id", controller.getPatientWithPersonUserInfo);
api.get("/:id", controller.getPatient);
api.post("/", controller.addPatient);
api.delete("/:id", controller.deletePatient);

module.exports = api;
