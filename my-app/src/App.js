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
import CampaignTable2 from "./CampaignTable2";

// import JSONtoExcel from "./JSONtoExcel";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: "",
      password: "",
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

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  updateAgent(agent) {
    console.log("Updated Agent", agent);
    var self = this;
    var updateAgent = this.state.agent;
    updateAgent = agent;
    axios.put("http://localhost:4000/api/agent/" + agent.agentCode, agent);
    self.setState({
      agent: updateAgent
    });
  }

  validateLogin() {
    var self = this;
    var body = {
      password: this.state.password
    };
    axios
      .post(
        "http://localhost:4000/" + this.state.field.toLocaleUpperCase(),
        body
      )
      .then(response => {
        if (response.data) {
          console.log("Agent Confirmed", response.data);
          var agent = response.data;
          var logged = true;
          var admin = false;
          if (agent.agentCode == "ADMIN") {
            admin = true;
          }
          self.setState({
            agent: agent,
            logged: logged,
            admin: admin
          });
          sessionStorage.setItem("logged", "true");
          sessionStorage.setItem("agent", agent.agentCode);
        }
      });
  }

  logOut() {
    sessionStorage.setItem("agent", null);
    sessionStorage.setItem("logged", "false");
    this.setState({
      logged: false,
      admin: false
    });
  }

  componentWillMount() {
    var logged = sessionStorage.getItem("logged");
    var agent = sessionStorage.getItem("agent");
    var self = this;
    if (logged == "true" && agent !== "ADMIN") {
      axios.get("http://localhost:4000/" + agent).then(response => {
        self.setState({
          logged: true,
          admin: false,
          agent: response.data
        });
      });
    } else if (agent == "ADMIN") {
      self.setState({
        logged: true,
        admin: true
      });
    }
  }

  render() {
    if (this.state.admin) {
      return (
        <LocaleProvider locale={enUS}>
          <Router>
            <div>
              <Route
                exact
                path="/"
                component={() => <AdminHome logOut={() => this.logOut()} />}
              />
              <Route path="/createcampaign" component={CreateCampaignParent} />
              <Route path="/clientdirectory" component={AdminClientDirectory} />
              <Route path="/agentdirectory" component={AdminAgentDirectory} />
              <Route path="/managecampaigns" component={ManageCampaigns} />
            </div>
          </Router>
        </LocaleProvider>
      );
    }

    if (!this.state.logged) {
      return (
        <div className="background">
        <div className="login">
          <h1 className="title">NEST PORTAL</h1>
          <br />
          <div className="login-field">
            <Input
              onChange={e => this.handleFieldChange(e)}
              placeholder="Enter FON Code"
            />
            <br />
            <Input
              type="password"
              onChange={e => this.handlePasswordChange(e)}
              placeholder="Enter Your Password"
            />
          </div>

          <div className="login-button-container">
            <Button
              className="login-button"
              color="black"
              onClick={() => this.validateLogin()}
            >
              Login
            </Button>
          </div>
        </div>
        </div>
      );
    }

    if (this.state.logged) {
      console.log("session storage is true");
      return (
        <div>
          <Router>
            <div>
              <Route
                exact
                path="/"
                component={() =>
                  <AgentHome
                    agent={this.state.agent}
                    logOut={() => this.logOut()}
                  />}
              />
              <Route
                path="/managelists"
                component={() => <AgentNavBar agent={this.state.agent} />}
              />
              <Route
                path="/profile"
                component={() =>
                  <AgentProfile
                    agent={this.state.agent}
                    updateAgent={data => {
                      this.updateAgent(data);
                    }}
                  />}
              />
            </div>
          </Router>
        </div>
      );
    }
  }
}

export default App;
