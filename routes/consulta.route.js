const express = require("express");
const controller = require("../controllers/consulta.controller");

const api = express.Router();

api.get("/", controller.getConsultations);
api.get("/:id", controller.getConsultation);

module.exports = api;
