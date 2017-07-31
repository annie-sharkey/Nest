import React, { Component } from "react";
import "./AgentHome.css";
import Nest from "./Nest.png";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import axios from "axios";

export default class AdminHome extends Component {
  handleFileUpload(e) {
    var path = {
      path: e.target.value
    };
    console.log(e.target.value)
    axios.post("http://localhost:4000/api/upload", path);
  }
  render() {
    return (
      <Router>
        <div className="home-container">
          <div className="centerAdmin">
            <div className="adminLogo">
              <img src={Nest} width={75} />
            </div>
            <div className="buttons">
              <Link to="/createcampaign">
                <div className="spaceAroundButton">
                  <button className="btn">Create a Campaign</button>
                </div>
              </Link>
              <Link to="/managecampaigns">
                <div className="secondbutton">
                  <button className="btn">Manage Campaigns</button>
                </div>
              </Link>
              <Link to="/clientdirectory">
                <div className="secondbutton">
                  <button className="btn">Client Directory</button>
                </div>
              </Link>
              <Link to="/agentdirectory">
                <div className="secondbutton">
                  <button className="btn">Agent Directory</button>
                </div>
              </Link>
              <div className="inputFile">
                <input
                  type="file"
                  accept=".xlsx, .xlx"
                  onChange={e => this.handleFileUpload(e)}
                />
              </div>
            </div>
          </div>
          <div className="logout">
            <Button color="black" onClick={() => this.props.logOut()}>
              Log Out
            </Button>
          </div>
        </div>
      </Router>
    );
  }
}
