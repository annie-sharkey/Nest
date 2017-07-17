import React, { Component } from "react";
import "./AgentHome.css";
import Nest from "./Nest.png";
// import { HashRouter as Router, Route, Link } from "react-router-dom";

export default class AdminHome extends Component {
  render() {
    return (
      <div className="center">
        <div className="spaceAroundButton">
          <button className="btn">Create a campaign</button>
        </div>
        <div className="spaceAroundButton">
          <button className="btn">Manage campaigns</button>
        </div>
        <div className="spaceAroundButton">
          <button className="btn">Agent Directory</button>
        </div>

        
        <div className="footer">
          <img src={Nest} width={75} />
        </div>
      </div>
    );
  }
}
