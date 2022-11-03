const express = require("express");
const controller = require("../controllers/usuario.controller");

const api = express.Router();

api.post("/login", controller.login);
api.get("/:id", controller.getMe);
api.post("/", controller.addUser);
api.delete("/:id", controller.deleteUser);

module.exports = api;
