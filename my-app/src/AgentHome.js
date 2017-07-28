import React, { Component } from "react";
import "./AgentHome.css";
import Nest from "./Nest.png";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Modal, Form, Input, Radio } from "antd";
import { Button } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import AgentForm from "./AgentProfile";
import AgentNavBar from "./AgentNavBar";
import axios from "axios";

export default class AgentHome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="home-container">
          <div className="profile">
            <Link to="/profile">
              <a className="edit-icon">
                <Icon name="edit" size="huge" />
              </a>
            </Link>
            <text className="name">
              <strong>
                {this.props.agent.agentName}{" "}
              </strong>
            </text>
          </div>
          <div className="center">
            <img src={Nest} width={75} />
            <div className="buttons">
              <Link to="/managelists">
                <div className="spaceAroundButton">
                  <button className="btn">Manage Lists</button>
                </div>
              </Link>
              <div className="secondbutton">
                <button className="btn">Media Center</button>
              </div>
            </div>
          </div>
          <div className="logout">
            <Button color="grey" onClick={() => this.props.logOut()}>
              <text className="logout-text">Log Out</text>
            </Button>
          </div>
        </div>
      </Router>
    );
  }
}
