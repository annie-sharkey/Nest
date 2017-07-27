const express = require("express");
const router = express.Router();
const Client = require("../models/client.js");

const Agent = require("../models/agent.js");

const Campaign = require("../models/campaign.js");

router.get("/clients", function(req, res, next) {
  Client.find({}).then(function(clients) {
    res.send(clients);
  });
});

router.get("/client/:id", function(req, res, next) {
  Client.findOne({ _id: req.params.id }).then(function(client) {
    res.json(client);
  });
});

router.get("/clients/:code", function(req, res, next) {
  Client.find({ agentCode: req.params.code }).then(function(clients) {
    res.send(clients);
  });
});

router.get("/agents", function(req, res, next) {
  Agent.find({}).then(function(agents) {
    res.send(agents);
  });
});

router.post("/clients", function(req, res) {
  var client = new Client({
    clientName: req.body.clientName,
    clientAddress: req.body.clientAddress,
    clientCity: req.body.clientCity,
    clientState: req.body.clientState,
    clientEmail: req.body.clientEmail,
    clientBirthday: req.body.clientBirthday,
    homeAnniversary: req.body.homeAnniversary,
    agentCode: req.body.agentCode,
    lastEdited: new Date()
  });
  client.save(function(err) {
    if (err) {
      throw err;
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
    client.clientState = req.body.clientState || client.clientState;
    client.clientEmail = req.body.clientEmail || client.clientEmail;
    client.clientBirthday = req.body.clientBirthday || client.clientBirthday;
    client.homeAnniversary = req.body.homeAnniversary || client.homeAnniversary;
    client.lastEdited = new Date();

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

router.delete("/campaigns/:id", function(req, res, next) {
  Campaign.findByIdAndRemove(req.params.id, function(err, campaign) {
    if (err) {
      throw err;
    }

    res.json(campaign);
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

router.get("/campaigns", function(req, res, next) {
  Campaign.find({}, function(err, campaigns) {
    if (err) {
      throw err;
    }
    res.json(campaigns);
  });
});

router.post("/campaign/", function(req, res, next) {
  var campaign = new Campaign({
    campaignName: req.body.campaignName,
    campaignColumns: req.body.campaignColumns,
    clients: req.body.clients,
    campaignUploads: req.body.campaignUploads,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    officesIncludedinCampaign: req.body.officesIncludedinCampaign
  });
  campaign.save(function(err) {
    if (err) {
      throw err;
    }
    res.json(campaign);
  });
});

router.put("/campaign/:id", function(req, res, next) {
  Campaign.findOne({ _id: req.params.id }, function(err, campaign) {
    if (err) {
      throw err;
    }

    campaign.clients = req.body.clients || campaign.clients;

    campaign.save(function(err, campaign) {
      if (err) {
        throw err;
      }
      res.json(campaign);
    });
  });
});

module.exports = router;
