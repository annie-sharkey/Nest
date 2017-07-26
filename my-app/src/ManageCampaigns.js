import React, { Component } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Icon, Table, Popconfirm } from "antd";
import axios from "axios";

export default class ManageCampaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillMount() {
    axios.get("http://localhost:4000/api/campaigns").then(res => {
      this.setState({
        data: res.data
      });
    });
  }

  deleteCampaign(id) {
    axios.delete("http://localhost:4000/api/campaigns/" + id);
  }


  render() {
    const columns = [
      {
        title: "Campaign Title",
        dataIndex: "campaignName",
        key: "campaignName"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) =>
          <span>
            <a>Edit</a>
            <span className="ant-divider" />
            <Popconfirm title="Are you sure you want to delete this entire campaign?" okText="Yes" cancelText="Do not delete" onConfirm={() => this.deleteCampaign(text._id)}>
              <a>
                Delete Campaign
              </a>
            </Popconfirm>
          </span>
      }
    ];
    return (
      <div>
        <div className="header">
          <Link to="/">
            <Icon type="arrow-left" style={{ fontSize: 30 }} />
          </Link>
          <h1>Manage Campaigns</h1>
        </div>
        <Table columns={columns} dataSource={this.state.data} />
      </div>
    );
  }
}
