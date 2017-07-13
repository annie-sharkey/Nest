const express = require("express");
const router = express.Router();
const Client = require("../models/client.js");

router.get("/clients", function(req, res, next) {
  Client.find({}).then(function(clients) {
    res.send(clients);
  });
});

router.post("/clients", function(req, res) {
  var client = new Client();
  client.clientName = req.body.clientName;
  client.clientCity = req.body.clientCity;
  client.clientAddress = req.body.clientAddress;
  client.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Yay" });
  });
});

module.exports = router;
