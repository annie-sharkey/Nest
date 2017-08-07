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

app.post("/:id", function(req, res) {
  Agent.findOne({ agentCode: req.params.id }, function(err, agent) {
    if (err) {
      throw err;
    }
    if (agent.agentCode == "ADMIN") {
      console.log("Admin");
      res.send(agent);
    } else if (agent.agentCode !== "ADMIN") {
      console.log("Not admin");
      agent.comparePassword(req.body.password, function(err, isMatch) {
        if (err) {
          throw err;
        }
        console.log(req.body.password, isMatch);
        if (isMatch) {
          res.send(agent);
        } else {
          res.send(false);
        }
      });
    } else {
      res.send(false);
    }
  });
});

app.get("/:id", function(req, res) {
  Agent.findOne({ agentCode: req.params.id }, function(err, agent) {
    if (err) {
      throw err;
    }
    res.send(agent);
  });
});

app.use("/api", routes);
app.use(bodyParser.json());

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});

// convertExcel("./annData.xlsx", null, null, function(err, data) {
//   var clients = [];
//   if (err) {
//     throw err;
//   }
//   data.forEach(function(client) {
//     var new_client = new Client({
//       clientName: "",
//       clientAddress: "",
//       clientEmail: "",
//       clientCity: "",
//       clientState: "",
//       office: "",
//       agentCode: "",
//       agentName: "",
//       agentEmail: "",
//       agentTitle: "",
//       agentPhone: "",
//       lastEdited: new Date().toISOString()
//     });

//     new_client.clientName = client["DISPLAY NAME"];
//     new_client.clientAddress = client["CLIENT ADDRESS"];
//     new_client.clientCity = client["CLIENT CITY"];
//     new_client.office = client["CLIENT CITY"];
//     new_client.clientEmail = client["CLIENT EMAIL"];
//     new_client.clientState = client["CLIENT STATE"];
//     new_client.agentCode = client["AGENT CODE"];
//     new_client.agentName = client["AGENT FIRST AND LAST NAME"];
//     new_client.agentEmail = client["AGENT NEST REALTY EMAIL"];
//     new_client.agentTitle = client["REAL ESTATE TITLE"];
//     new_client.agentPhone = client["AGENT PHONE NUMBER"];

//     clients.push(new_client);

//     // new_client.save(function(err, client) {
//     //   if (err) {
//     //     throw err;
//     //   }
//     // });
//   });
//   clients.forEach(function(client) {
//     client.save(function(err, res) {
//       if (err) {
//         throw err;
//       }
//     });
//   });
// });

// convertExcel("./agents.xlsx", null, null, function(err, data) {
//   var agentsWithCodes = [];
//   var agentWithoutCodes = [];
//   data.forEach(function(agent) {
//     var new_agent = Agent({
//       agentCode: "",
//       agentName: "",
//       agentTitle: "",
//       agentEmail: "",
//       agentPhoneNumber: "",
//       agentOffice: "",
//       pastCampaigns: [],
//       password: ""
//     });
//     var password;
//     var email1 = "";
//     var email2 = "none";
//     var phone1 = "";
//     var phone2 = "none";

//     var emailIndex = agent["AGENT EMAIL"].indexOf(".com");
//     var lastEmailIndex = agent["AGENT EMAIL"].lastIndexOf(".com");
//     if (emailIndex == lastEmailIndex) {
//       email1 = agent["AGENT EMAIL"];
//     } else {
//       email1 = agent["AGENT EMAIL"].slice(0, emailIndex + 4);
//       email2 = agent["AGENT EMAIL"].slice(
//         emailIndex + 5,
//         agent["AGENT EMAIL"].length
//       );
//     }

//     var phoneIndex = agent["AGENT PHONE NUMBER"].indexOf("/");
//     if (phoneIndex == -1) {
//       phone1 = agent["AGENT PHONE NUMBER"].slice(0, phoneIndex);
//       phone2 = agent["AGENT PHONE NUMBER"].slice(
//         phoneIndex + 1,
//         agent["AGENT PHONE NUMBER"].length
//       );
//     }

//     if (agent["AGENT CODE"] !== "") {
//       new_agent.agentCode = agent["AGENT CODE"];
//       new_agent.agentName = agent["AGENT NAME"];
//       new_agent.agentTitle = agent["AGENT TITLE"];
//       new_agent.agentEmail = email1;
//       new_agent.agentEmail2 = email2;
//       new_agent.agentPhoneNumber = phone1;
//       new_agent.agentPhoneNumber2 = phone2;
//       new_agent.agentOffice = agent["AGENT OFFICE"];
//       new_agent.password = agent["AGENT CODE"].toLowerCase();
//       agentsWithCodes.push(new_agent);
//     } else {
//       new_agent.agentCode = agent["AGENT NAME"];
//       new_agent.agentName = agent["AGENT NAME"];
//       new_agent.agentTitle = agent["AGENT TITLE"];
//       new_agent.agentEmail = email1;
//       new_agent.agentEmail2 = email2;
//       new_agent.password = agent["AGENT CODE"].toLowerCase();
//       new_agent.agentPhoneNumber = agent["AGENT PHONE NUMBER"];
//       new_agent.agentPhoneNumber2 = phone2;
//       new_agent.agentOffice = agent["AGENT OFFICE"];
//       agentWithoutCodes.push(new_agent);
//     }
//   });
//   agentsWithCodes.forEach(function(agent) {
//     agent.save(function(err) {
//       if (err) {
//         throw err;
//       }
//     });
//   });
//   agentWithoutCodes.forEach(function(agent) {
//     agent.save(function(err) {
//       if (err) {
//         throw err;
//       }
//     });
//   });
// });
