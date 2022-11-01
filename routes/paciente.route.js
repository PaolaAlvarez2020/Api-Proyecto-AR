const express = require("express");
const controller = require("../controllers/paciente.controller");

const api = express.Router();

api.get("/", controller.getPatients);
api.get("/:id", controller.getPatient);

module.exports = api;
