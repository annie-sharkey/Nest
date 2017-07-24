import React, { Component } from "react";
import "./AgentHome.css";
import Nest from "./Nest.png";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

export default class AdminHome extends Component {
  render() {
    return (
      <Router>
        <div className="home-container">
          <div className="center">
            <img src={Nest} width={75} />
            <div className="buttons">
              <Link to="/createcampaign">
                <div className="spaceAroundButton">
                  <button className="btn">Create a Campaign</button>
                </div>
              </Link>
              <div className="secondbutton">
                <button className="btn">Manage Campaigns</button>
              </div>
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
