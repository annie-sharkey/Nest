import React, { Component } from "react";
import "./AgentHome.css";
import Nest from "./Nest.png";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Button, Modal, Form, Input, Radio } from "antd";
import { Icon } from "antd";
import AgentForm from "./AgentProfile";
import AgentNavBar from "./AgentNavBar";
import axios from "axios";

export default class AgentHome extends Component {
  constructor(props) {
    super(props);
  }

  logOut() {
    sessionStorage.setItem("logged", false);
  }
  render() {
    return (
      <Router>
        <div>
          <div className="center">
            <div className="heading">
              <img src={Nest} width={75} />
            </div>

            <div className="edit">
              <Link to="/profile">
                <Icon type="edit" style={{ fontSize: 25 }}>
                  {this.props.agent.agentName}{" "}
                </Icon>
              </Link>
              <Button onClick={() => this.props.logOut()}>Log Out</Button>
            </div>

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
        </div>
      </Router>
    );
  }
}
