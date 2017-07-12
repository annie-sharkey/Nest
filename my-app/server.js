//server.js
"use strict";

//first we import our dependencies...
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const routes = require("./routes/api");

//and create our instances
var app = express();
var router = express.Router();

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
  function(err, result) {
    if (err) {
      console.log("Error");
    }
    console.log("Successful");
  }
);
mongoose.Promise = global.Promise;

//now  we can set the route path & initialize the API
// app.get("/", function(req, res) {
//   res.json({ message: "API Initialized!" });
// });

//Use our router configuration when we call /api
app.use("/api", routes);
app.use(bodyParser.json());

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});

// db.clientCollection.insertOne({
//   clientName: "Fay Broadbent",
//   clientAddress: "6088 Little River Court",
//   clientCity: "Granite Falls"
// });

// db.clientCollection.insertOne({
//   clientName: "Susan and David Stagg",
//   clientAddress: "300 Pinnacle Peak Lane",
//   clientCity: "Flat Rock"
// });
