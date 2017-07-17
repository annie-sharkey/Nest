import React, { Component } from "react";
import "antd/dist/antd.css";
import { Menu, Icon } from "antd";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import MasterTable from "./MasterTable";
import CampaignTable from "./CampaignTable";
import axios from "axios";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class AgentNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      current: "mail",
      update: false
    };
  }

  componentWillMount() {
    axios
      .get("http://localhost:4000/api/clients/" + this.props.agent.agentCode)
      .then(response => {
        this.setState({
          dataSource: response.data
        });
        console.log(response.data);
      });
  }

  handleTableUpdate() {
    console.log("Agent Nav Bar State changing");
    axios.get("http://localhost:4000/api/clients").then(response => {
      this.setState({
        dataSource: response.data
      });
    });
  }

  handleClick(e) {
    this.setState({
      current: e.key
    });
  }
  render() {
    return (
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
                <Icon type="contacts" />
                Master List
              </Link>
            </Menu.Item>

            <Menu.Item key="database">
              <Link to="/managelists/campaigns">
                <Icon type="database" />
                Build a Campaign
              </Link>
            </Menu.Item>
          </Menu>

          <Route
            exact
            path="/managelists"
            component={() =>
              <MasterTable
                dataSource={this.state.dataSource}
                agentCode={this.props.agent.agentCode}
              />}
          />
          <Route path="/managelists/campaigns" component={CampaignTable} />
        </div>
      </Router>
    );
  }
}
