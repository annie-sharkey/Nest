import React, { Component } from "react";
import "./App.css";
import AgentNavBar from "./AgentNavBar";
import AgentHome from "./AgentHome";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
//import CreateCampaignParent from "./CreateCampaignParent";
import AgentUpload from "./AgentUpload";
import { LocaleProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";
import AgentForm from "./AgentProfile";
import { Modal, Form, Input, Radio } from "antd";
import { Button } from "semantic-ui-react";
//import TestTable from "./TestTable";
//import TestCreateCampaign from "./TestCreateCampaign";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: "",
      agent: {},
      logged: false
    };
  }

  handleFieldChange(e) {
    this.setState({
      field: e.target.value
    });
  }

  validateLogin() {
    axios
      .get("http://localhost:4000/" + this.state.field.toLocaleUpperCase())
      .then(response => {
        if (response != false) {
          this.setState({
            agent: response.data,
            logged: true
          });
          sessionStorage.setItem("logged", "true");
          sessionStorage.setItem("agent", response.data.agentCode);
        }
      });
  }

  logOut() {
    sessionStorage.setItem("logged", "false");
    this.setState({
      logged: false
    });
  }

  componentWillMount() {
    if (sessionStorage.getItem("logged") == "true") {
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
    if (!this.state.logged) {
      return (
        <div className="login">
          <h1 className="title">NEST PORTAL</h1>
          <div className="login-field">
            <Input
              onChange={e => this.handleFieldChange(e)}
              placeholder="Enter FON Code"
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
                component={() => <AgentForm agent={this.state.agent} />}
              />
            </div>
          </Router>
          {/*<div>
            <LocaleProvider locale={enUS}>
              <CreateCampaignParent />
            </LocaleProvider>
          </div>*/}
        </div>
      );
    }
  }
}

export default App;
