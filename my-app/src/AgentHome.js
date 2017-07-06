import React, { Component } from "react";
import "./AgentHome.css";
import Nest from "./Nest.png";
import { HashRouter as Router, Route, Link } from "react-router-dom";

export default class AgentHome extends Component {
  render() {
    return (
      <div className="center">
        <Link to="/navbar">
          <div className="spaceAroundButton">
            <button className="btn">Manage Lists</button>
          </div>
        </Link>
        <div className="spaceAroundButton">
          <button className="btn">Media Center</button>
        </div>
        <div className="footer">
          <img src={Nest} width={75} />
        </div>
      </div>
    );
  }
}
