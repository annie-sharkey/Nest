"use strict";
//import dependency
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var ClientSchema = new Schema({
  clientName: String,
  firstName: String,
  lastName: String,
  clientAddress: String,
  clientEmail: String,
  clientCity: String,
  clientState: String,
  category: {
    type: String,
    default: "buyer"
  },
  clientBirthday: { type: String, default: "None" },
  homeAnniversary: { type: String, default: "None" },
  campaigns: { type: [String], default: ["None"] },
  childrenNames: { type: [String], default: ["None"] },
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
