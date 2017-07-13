const express = require("express");
const router = express.Router();
const Client = require("../models/client.js");

router.get("/clients", function(req, res, next) {
  Client.find({}).then(function(clients) {
    res.send(clients);
  });
});

router.post("/clients", function(req, res) {
  var client = new Client({
    clientName: req.body.clientName,
    clientAddress: req.body.clientAddress,
    clientCity: req.body.clientCity
  });
  client.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Yay" });
  });
});

router.put("/clients/:id", function(req, res, next) {
  Client.findById(req.params.id, function(err, client) {
    if (err) {
      throw err;
    }
    client.clientName = req.body.clientName || client.clientName;
    client.clientAddress = req.body.clientAddress || client.clientAddress;
    client.clientCity = req.body.clientCity || client.clientCity;

    client.save(function(err, client) {
      if (err) {
        throw err;
      }
      res.json(client);
    });
  });
});

router.delete("/clients/:id", function(req, res, next) {
  Client.findByIdAndRemove(req.params.id, function(err, client) {
    if (err) {
      throw err;
    }

    res.json(client);
  });
});

module.exports = router;
