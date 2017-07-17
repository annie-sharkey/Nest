import React, { Component } from "react";
import "./App.css";
import AgentNavBar from "./AgentNavBar";
import AgentHome from "./AgentHome";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

// import AdminHome from "./AdminHome";
// import JSONtoExcel from "./JSONtoExcel";
// // import ExceltoJSON from "./ExceltoJSON";
// //import CampaignTable from "./CampaignTable";
// import MasterTable from "./MasterTable";
// import ClientForm from "./Form";
// import axios from "axios";
import AgentForm from "./AgentProfile";
import { Button, Modal, Form, Input, Radio } from "antd";
import TestTable from "./TestTable";
import TestCreateCampaign from "./TestCreateCampaign";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: "",
      agent: false
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
        this.setState({
          agent: response.data
        });
      });
  }

  render() {
    if (!this.state.agent) {
      return (
        <div>
          <Input
            className="login-field"
            size="small"
            onChange={e => this.handleFieldChange(e)}
          />
          <Button className="login-button" onClick={() => this.validateLogin()}>
            Login
          </Button>
        </div>
      );
    }
    if (this.state.agent) {
      return (
        <div>
          <Router>
            <div>
              <Route
                exact
                path="/"
                component={() => <AgentHome agent={this.state.agent} />}
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
        </div>
      );
    }
  }
}

export default App;
