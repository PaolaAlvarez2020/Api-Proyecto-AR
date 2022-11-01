const express = require("express");
const controller = require("../../controllers/test/arUnity.test.controller");

const api = express.Router();

api.get("/", controller.getMessage);

module.exports = api;
