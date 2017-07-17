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
// const data = require("./src/data.js");
//and create our instances
var app = express();
var router = express.Router();

var data = [
  {
    "AGENT CODE": "ADH",
    "AGENT FIRST AND LAST NAME": "Danielle Hoffmann",
    "REAL ESTATE TITLE": "Real Estate Broker",
    "AGENT NEST REALTY EMAIL": "danielle.hoffmann@nestrealty.com",
    "AGENT PHONE NUMBER": "828-435-2520",
    "CLIENT NAME": "Fay Broadbent",
    "CLIENT ADDRESS": "6088 Little River Court",
    "CLIENT CITY": "Granite Falls",
    "CLIENT STATE": "NC",
    "CLIENT ZIP": "28630",
    "EMAIL 1 (IF DESIRED)": "",
    "EMAIL 2 (IF DESIRED)": "",
    "MAP CUSTOMIZATION": "Fay's"
  },
  {
    "AGENT CODE": "ADH",
    "AGENT FIRST AND LAST NAME": "Danielle Hoffmann",
    "REAL ESTATE TITLE": "Real Estate Broker",
    "AGENT NEST REALTY EMAIL": "danielle.hoffmann@nestrealty.com",
    "AGENT PHONE NUMBER": "828-435-2520",
    "CLIENT NAME": "Susan and David Stagg",
    "CLIENT ADDRESS": "300 Pinnacle Peak Lane",
    "CLIENT CITY": "Flat Rock",
    "CLIENT STATE": "NC",
    "CLIENT ZIP": "28731",
    "EMAIL 1 (IF DESIRED)": "susanannstagg@gmail.com",
    "EMAIL 2 (IF DESIRED)": "davidastagg@gmail.com",
    "MAP CUSTOMIZATION": "Sue and Dave's"
  }
];

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.API_PORT || 4000;

//now we should configure the API to use bodyParser and look for JSON data in the request body
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

//config
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

//now  we can set the route path & initialize the API
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

//Use our router configuration when we call /api
app.use("/api", routes);
app.use(bodyParser.json());

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
