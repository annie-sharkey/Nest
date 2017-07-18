const express = require("express");
const router = express.Router();
const Client = require("../models/client.js");
const Agent = require("../models/agent.js");

// router.get("/clients", function(req, res, next) {
//   Client.find({}).then(function(clients) {
//     res.send(clients);
//   });
// });

router.get("/clients/:code", function(req, res, next) {
  Client.find({ agentCode: req.params.code }).then(function(clients) {
    res.send(clients);
  });
});

router.post("/clients", function(req, res) {
  var client = new Client({
    clientName: req.body.clientName,
    clientAddress: req.body.clientAddress,
    clientCity: req.body.clientCity,
    clientEmail: req.body.clientEmail,
    clientBirthday: req.body.clientBirthday,
    homeAnniversary: req.body.homeAnniversary,
    agentCode: req.body.agentCode
  });
  client.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.json(client);
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
    client.clientEmail = req.body.clientEmail || client.clientEmail;
    client.clientBirthday = req.body.clientBirthday || client.clientBirthday;
    client.homeAnniversary = req.body.homeAnniversary || client.homeAnniversary;

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

router.put("/agent/:id", function(req, res, next) {
  Agent.findOne({ agentCode: req.params.id }, function(err, agent) {
    if (err) {
      throw err;
    }

    agent.agentName = req.body.agentName || agent.agentName;
    agent.agentEmail = req.body.agentEmail || agent.agentEmail;
    agent.agentPhoneNumber =
      req.body.agentPhoneNumber || agent.agentPhoneNumber;
    agent.agentTitle = req.body.agentTitle || agent.agentTitle;
    agent.agentOffice = req.body.agentOffice || agent.agentOffice;

    agent.save(function(err, agent) {
      if (err) {
        throw err;
      }
      res.json(agent);
    });
  });
});

module.exports = router;
