const express = require("express");
const controller = require("../controllers/persona.controller");

const api = express.Router();

api.get("/", controller.getPersons);
api.get("/:id", controller.getPerson);
api.post("/", controller.addPerson);
api.put("/:id", controller.updatePerson);
api.delete("/:id", controller.deletePerson);

module.exports = api;
