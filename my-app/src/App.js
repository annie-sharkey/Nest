import React, { Component } from "react";
import "./App.css";
import AgentNavBar from "./AgentNavBar";
import AgentHome from "./AgentHome";
import { HashRouter as Router, Route, Link } from "react-router-dom";

import AdminHome from "./AdminHome";
import JSONtoExcel from "./JSONtoExcel";
// import ExceltoJSON from "./ExceltoJSON";
import CampaignTable from "./CampaignTable";
import MasterTable from "./MasterTable";
import ClientForm from "./Form";
import axios from "axios";
import AgentForm from "./AgentProfile";

import CreateCampaign from "./CreateCampaign";

import AgentUpload from "./AgentUpload";

class App extends Component {
  render() {
    return (
      <div>
        <CreateCampaign />
        
      </div>
      // <div>
      //   <Router>
      //     <div>
      //       <Route exact path="/" component={AgentHome} />
      //       <Route path="/profile" component={AgentForm} />
      //       <Route path="/managelists" component={AgentNavBar} />

      //     </div>
      //   </Router>
      // </div>
      // <div>

      //   </div>
    );
  }
}

export default App;
