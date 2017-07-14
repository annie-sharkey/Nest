import React, { Component } from "react";
import "./AgentHome.css";
import Nest from "./Nest.png";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Icon } from "antd";
import AgentForm from "./AgentProfile";

export default class AgentHome extends Component {
  render() {
    return (
      <div className="center">
        <div className="heading">
          <img src={Nest} width={75} />
        </div>

        <div className="edit">
          <Link to="/profile">
            <Icon type="edit" style={{ fontSize: 25 }} />
          </Link>
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
    );
  }
}
