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

router.get("/campaigns", function(req, res, next) {
  Campaign.find({}, function(err, campaigns) {
    if (err) {
      throw err;
    }
    res.json(campaigns);
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
    lastEdited: new Date().toISOString(),
    office: req.body.office,
    agentName: req.body.agentName,
    agentEmail: req.body.agentEmail,
    agentTitle: req.body.agentTitle,
    agentPhone: req.body.agentPhone
  });
  client.save(function(err) {
    if (err) {
      throw err;
    }
    res.json(client);
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
    agent.agentEmail2 = req.body.agentEmail2 || agent.agentEmail2;
    agent.agentPhoneNumber =
      req.body.agentPhoneNumber || agent.agentPhoneNumber;
    agent.agentPhoneNumber2 =
      req.body.agentPhoneNumber2 || agent.agentPhoneNumber2;
    agent.agentTitle = req.body.agentTitle || agent.agentTitle;
    agent.agentOffice = req.body.agentOffice || agent.agentOffice;
    agent.pastCampaigns = req.body.pastCampaigns || agent.pastCampaigns;
    agent.password = req.body.password || agent.password;

    agent.save(function(err, agent) {
      if (err) {
        throw err;
      }
      res.json(agent);
    });
  });
});

router.post("/agent/new", function(req, res, next) {
  var agent = new Agent({
    agentCode: req.body.agentCode,
    agentName: req.body.agentName,
    agentTitle: req.body.agentTitle,
    agentEmail: req.body.agentEmail,
    agentEmail2: req.body.agentEmail2,
    agentPhoneNumber: req.body.agentPhoneNumber,
    agentPhoneNumber2: req.body.agentPhoneNumber2,
    agentOffice: req.body.agentOffice,
    pastCampaigns: [],
    password: req.body.password
  });

  agent.save(function(err, agent) {
    if (err) {
      throw err;
    }
    res.json(agent);
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
    client.lastEdited = new Date().toISOString();
    client.office = req.body.office || client.office;

    client.save(function(err, client) {
      if (err) {
        throw err;
      }
      res.json(client);
    });
  });
});

router.put("/campaigns/:id", function(req, res, next) {
  Campaign.findOne({ _id: req.params.id }, function(err, campaign) {
    if (err) {
      throw err;
    }
    campaign.campaignName = req.body.campaignName || campaign.campaignName;
    campaign.startDate = req.body.startDate || campaign.startDate;
    campaign.endDate = req.body.endDate || campaign.endDate;
    campaign.clients = req.body.clients || campaign.clients;

    if (req.body.officesIncludedinCampaign.length > 0) {
      campaign.officesIncludedinCampaign = req.body.officesIncludedinCampaign;
    }

    if (req.body.campaignUploads.length > 0) {
      campaign.campaignUploads = req.body.campaignUploads;
    }

    if (req.body.campaignColumns.length > 0) {
      campaign.campaignColumns = req.body.campaignColumns;
    }

    campaign.save(function(err, campaign) {
      if (err) {
        throw err;
      }
      res.json(campaign);
    });
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

router.post("/upload", function(req, res, next) {
  console.log(req.body.path);
});

module.exports = router;
