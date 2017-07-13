import React, { Component } from "react";
import "./App.css";
import AgentNavBar from "./AgentNavBar";
import AgentHome from "./AgentHome";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import AgentForm from "./AgentProfile";

import TestTable from "./TestTable";
import TestCreateCampaign from "./TestCreateCampaign";

class App extends Component {
  render() {
    return (
      <TestCreateCampaign />
      // <div>
      //   <Router>
      //     <div>
      //       <Route exact path="/" component={AgentHome} />
      //       <Route path="/profile" component={AgentForm} />
      //       <Route path="/managelists" component={AgentNavBar} />
      //     </div>
      //   </Router>
      // </div>
    );
  }
}

export default App;
