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
  category: {
    type: String,
    default: "buyer"
  },
  clientBirthday: String,
  homeAnniversary: String,
  campaigns: [String],
  childrenNames: [String],
  agentCode: String,
  office: String
});

//export our module to use in server.js

const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;
