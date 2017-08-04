import React, { Component } from "react";
import "./AgentHome.css";
import Nest from "./Nest.png";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import axios from "axios";
import FileInput from "react-file-input";

export default class AdminHome extends Component {
  handleChange(e) {}
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
                <form>
                  Select an image to upload:
                  <input type="file" name="image" />
                  <input type="submit" value="Upload Image" />
                </form>
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
