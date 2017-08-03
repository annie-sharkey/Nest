import React, { Component } from "react";
import "antd/dist/antd.css";
import { Menu, Icon } from "antd";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import MasterTable from "./MasterTable";
import CampaignTable from "./CampaignTable";
import axios from "axios";
import './AgentNavBar.css'

import CampaignTable2 from './CampaignTable2';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class AgentNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      current: "contacts",
      update: false,
      allClients: []
    };
  }

  componentWillMount() {
    var current = "";
    if (window.location.href.includes("campaigns")) {
      current = "database";
    }
    if (!window.location.href.includes("campaigns")) {
      current = "contacts";
    }
    axios
      .get("http://localhost:4000/api/clients/" + this.props.agent.agentCode)
      .then(response => {
        // console.log(response.data);
        this.setState({
          dataSource: response.data,
          current: current,
          allClients: response.data
        });
      });
  }

  updateClients(clients) {
    this.setState({
      dataSource: clients
    });
  }

  handleClick(e) {
    this.setState({
      current: e.key
    });
  }

  handleMasterHighlight() {
    this.setState({
      current: "contacts"
    });
  }

  handleCampaignHighlight() {
    this.setState({
      current: "database"
    });
  }
  render() {
    // console.log(this.state.dataSource);
    return (
      // <div>
      //   <ul>
      //     <li>Master List</li>
      //     <li>Build a Campaign</li>
      //     </ul>
      //   </div>
      <Router ref="nav">
        <div>
          <Menu
            onClick={e => this.handleClick(e)}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            theme="dark"
          >
            <Menu.Item key="home">
              <Link to="/">
                <Icon type="left" color="#FFFFFF" />
              </Link>
            </Menu.Item>

            <Menu.Item key="contacts">
              <Link to="/managelists">
                <Icon
                  type="contacts"
                  onClick={() => this.handleMasterHighlight()}
                />
                Master List
              </Link>
            </Menu.Item>

            <Menu.Item key="database">
              <Link to="/managelists/campaigns">
                <Icon
                  type="database"
                  onClick={() => this.handleCampaignHighlight()}
                />
                Build a Campaign
              </Link>
            </Menu.Item>
          </Menu>

          <Route
            exact
            path="/managelists"
            component={() =>
              <MasterTable
                dataSource={this.state.dataSource.reverse()}
                agentCode={this.props.agent.agentCode}
                agent={this.props.agent}
                updateClients={clients => this.updateClients(clients)}
              />}
          />
          <Route
            path="/managelists/campaigns"
            component={() =>
              <CampaignTable2
                dataSource={this.state.dataSource.reverse()}
                agentCode={this.props.agent.agentCode}
                agentID={this.props.agent._id}
                agent={this.props.agent}
                //allClients={this.state.dataSource}
              />}
          />
        </div>
      </Router>
    );
  }
}
