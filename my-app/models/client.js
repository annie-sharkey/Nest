"use strict";
//import dependency
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var ClientSchema = new Schema({
  clientName: String,
  clientAddress: String,
  clientEmail: String,
  clientCity: String,
  clientState: String,
  category: {
    type: String,
    default: "buyer"
  },
  clientBirthday: { type: String, default: "" },
  homeAnniversary: { type: String, default: "" },
  campaigns: { type: [String], default: [] },
  childrenNames: { type: [String], default: [] },
  lastEdited: String,
  office: String,
  agentCode: String,
  agentName: String,
  agentEmail: String,
  agentTitle: String,
  agentPhone: String
});

//export our module to use in server.js

const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;
