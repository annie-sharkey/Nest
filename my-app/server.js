//server.js
"use strict";

//first we import our dependencies...
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const routes = require("./routes/api");
const Client = require("./models/client.js");
const Agent = require("./models/agent.js");
const Campaign = require("./models/campaign.js");
var convertExcel = require("excel-as-json").processFile;

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );

  //and remove cacheing so we get the most recent comments
  res.setHeader("Cache-Control", "no-cache");
  next();
});

mongoose.connect(
  "mongodb://Annie:Ann1esharkey@nest-shard-00-00-icudb.mongodb.net:27017,nest-shard-00-01-icudb.mongodb.net:27017,nest-shard-00-02-icudb.mongodb.net:27017/Nest?ssl=true&replicaSet=Nest-shard-0&authSource=admin",
  {
    useMongoClient: true
  },
  function(err) {
    if (err) {
      throw err;
    }
  }
);
mongoose.Promise = global.Promise;

app.get("/:id", function(req, res) {
  Agent.findOne({ agentCode: req.params.id }, function(err, agent) {
    if (err) {
      throw err;
    }
    if (agent) {
      res.send(agent);
    } else {
      res.send(false);
    }
  });
});

app.use("/api", routes);
app.use(bodyParser.json());

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});

convertExcel("./ann.xlsx", null, null, function(err, data) {
  var clients = [];
  if (err) {
    throw err;
  }
  data.forEach(function(client) {
    var new_client = new Client({
      clientName: "",
      clientAddress: "",
      clientEmail: "",
      clientCity: "",
      clientState: "",
      office: "",
      agentCode: "",
      agentName: "",
      agentEmail: "",
      agentTitle: "",
      agentPhone: "",
      lastEdited: new Date().toISOString()
    });

    new_client.clientName = client["DISPLAY NAME"];
    new_client.clientAddress = client["CLIENT ADDRESS"];
    new_client.clientCity = client["CLIENT CITY"];
    new_client.office = client["CLIENT CITY"];
    new_client.clientEmail = client["CLIENT EMAIL"];
    new_client.clientState = client["CLIENT STATE"];
    new_client.agentCode = client["AGENT CODE"];
    new_client.agentName = client["AGENT FIRST AND LAST NAME"];
    new_client.agentEmail = client["AGENT NEST REALTY EMAIL"];
    new_client.agentTitle = client["REAL ESTATE TITLE"];
    new_client.agentPhone = client["AGENT PHONE NUMBER"];

    clients.push(new_client);
    new_client.save(function(err, client) {
      if (err) {
        throw err;
      }
    });
  });
});
