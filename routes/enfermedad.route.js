const express = require("express");
const controller = require("../controllers/enfermedades.controller");

const api = express.Router();

api.get("/", controller.getDiseases);
api.get("/:id", controller.getDisease);
api.post("/", controller.addDisease);
api.put("/:id", controller.updateDisease);
api.delete("/:id", controller.deleteDisease);

module.exports = api;
