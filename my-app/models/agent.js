"use strict";
//import dependency
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var AgentSchema = new Schema({
  agentCode: String,
  agentName: String,
  agentTitle: String,
  agentEmail: String,
  agentPhoneNumber: String,
  agentOffice: String,
  pastCampaigns: [String]
});

//export our module to use in server.js

const Agent = mongoose.model("Agent", AgentSchema);
module.exports = Agent;
