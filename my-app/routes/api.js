const express = require("express");
const router = express.Router();
const Client = require("../models/client.js");

router.get("/clients", function(req, res, next) {
  Client.find({}).then(function(clients) {
    res.send(clients);
  });
});

module.exports = router;
