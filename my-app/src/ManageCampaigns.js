import React, { Component } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Icon } from 'antd';

export default class ManageCampaigns extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/">
          <Icon type="arrow-left" style={{ fontSize: 30 }} />
        </Link>
        <h1>Manage Campaigns</h1>
      </div>
    );
  }
}
