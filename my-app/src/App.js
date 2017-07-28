import React, { Component } from "react";
import "./App.css";
import AgentNavBar from "./AgentNavBar";
import AgentHome from "./AgentHome";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import CreateCampaignParent from "./CreateCampaignParent";

import MediaCenter from "./MediaCenter";

import { LocaleProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";

import AgentProfile from "./AgentProfile";

import { Modal, Form, Input, Radio } from "antd";
import { Button } from "semantic-ui-react";
import AdminHome from "./AdminHome";
import AdminClientDirectory from "./AdminClientDirectory";
import AdminAgentDirectory from "./AdminAgentDirectory";
import ManageCampaigns from "./ManageCampaigns";

import JSONtoExcel from "./JSONtoExcel";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: "",
      agent: {},
      logged: false,
      updated: false,
      admin: false
    };
  }

  handleFieldChange(e) {
    this.setState({
      field: e.target.value
    });
  }

  updateAgent(agent) {
    console.log("Updated Agent", agent);
    var self = this;
    var updateAgent = this.state.agent;
    updateAgent = agent;
    axios.put("http://localhost:4000/api/agent/" + agent.agentCode, agent);
    // axios.get("http://localhost:4000/" + agent.agentCode).then(function(res) {
    //   updateAgent.agentName = res.data.agentName;
    //   updateAgent.agentTitle = res.data.agentTitle;
    //   updateAgent.agentEmail = res.data.agentEmail;
    //   updateAgent.agentOffice = res.data.agentOffice;
    //   updateAgent.agentPhoneNumber = res.data.agentPhoneNumber;
    // });
    self.setState({
      agent: updateAgent
    });
  }

  validateLogin() {
    var self = this;
    axios
      .get("http://localhost:4000/" + this.state.field.toLocaleUpperCase())
      .then(response => {
        var admin = false;
        if (response.data.agentCode === "ADMIN") {
          admin = true;
        }
        if (response != false && !admin) {
          this.setState({
            agent: response.data,
            logged: true
          });
          sessionStorage.setItem("logged", "true");
          sessionStorage.setItem("agent", response.data.agentCode);
        } else if (admin) {
          this.setState({
            admin: true
          });
          sessionStorage.setItem("admin", "true");
          sessionStorage.setItem("logged", "false");
        }
      });
  }

  logOut() {
    console.log("log out entered");
    sessionStorage.setItem("logged", "false");
    sessionStorage.setItem("admin", "false");
    this.setState({
      logged: false,
      admin: false
    });
  }

  componentWillMount() {
    if (sessionStorage.getItem("admin") == "true") {
      console.log("admin session");
      this.setState({
        logged: false,
        admin: true
      });
    } else if (
      sessionStorage.getItem("logged") == "true" &&
      sessionStorage.getItem("agent")
    ) {
      var agentCode = sessionStorage.getItem("agent");
      var agent;
      axios.get("http://localhost:4000/" + agentCode).then(response => {
        this.setState({
          logged: true,
          agent: response.data
        });
      });
    } else if (
      sessionStorage.getItem("logged") == null ||
      sessionStorage.getItem("logged") == "false"
    ) {
      {
        this.setState({
          logged: false
        });
      }
    }
  }

  render() {
    return (
      <div>
        <JSONtoExcel />
      </div>
    );

    // if (this.state.admin) {
    //   return (
    //     <LocaleProvider locale={enUS}>
    //       <Router>
    //         <div>
    //           <Route
    //             exact
    //             path="/"
    //             component={() => <AdminHome logOut={() => this.logOut()} />}
    //           />
    //           <Route path="/createcampaign" component={CreateCampaignParent} />
    //           <Route path="/clientdirectory" component={AdminClientDirectory} />
    //           <Route path="/agentdirectory" component={AdminAgentDirectory} />
    //           <Route path="/managecampaigns" component={ManageCampaigns} />
    //         </div>
    //       </Router>
    //     </LocaleProvider>
    //   );
    // }

    // if (!this.state.logged) {
    //   return (
    //     <div className="login">
    //       <h1 className="title">NEST PORTAL</h1>
    //       <div className="login-field">
    //         <Input
    //           onChange={e => this.handleFieldChange(e)}
    //           placeholder="Enter FON Code"
    //         />
    //       </div>

    //       <div className="login-button-container">
    //         <Button
    //           className="login-button"
    //           color="black"
    //           onClick={() => this.validateLogin()}
    //         >
    //           Login
    //         </Button>
    //       </div>
    //     </div>
    //   );
    // }

    // if (this.state.logged) {
    //   console.log("session storage is true");
    //   return (
    //     <div>
    //       <Router>
    //         <div>
    //           <Route
    //             exact
    //             path="/"
    //             component={() =>
    //               <AgentHome
    //                 agent={this.state.agent}
    //                 logOut={() => this.logOut()}
    //               />}
    //           />
    //           <Route
    //             path="/managelists"
    //             component={() => <AgentNavBar agent={this.state.agent} />}
    //           />
    //           <Route
    //             path="/profile"
    //             component={() =>
    //               <AgentProfile
    //                 agent={this.state.agent}
    //                 updateAgent={data => {
    //                   this.updateAgent(data);
    //                 }}
    //               />}
    //           />
    //         </div>
    //       </Router>
    //     </div>
    //   );
    // }
  }
}

export default App;
