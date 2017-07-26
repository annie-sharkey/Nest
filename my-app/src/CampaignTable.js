import React from "react";
// import { Table } from "semantic-ui-react";
// import "./App.css";
// import { Dropdown, Menu, Icon } from "semantic-ui-react";
import axios from "axios";
import { Table, Input, Icon, Popconfirm } from "antd";
import { Button } from "semantic-ui-react";
import { Confirm } from "semantic-ui-react";
import moment from "moment";

export default class CampaignTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftData: [],
      rightData: [],
      campaigns: [],
      currentCampaign: "Not Included",
      columns: [],
      campaignId: "",
      clientsToSave: [],
      agentCode: this.props.agentCode,
      confirm: false
    };
  }

  componentWillMount() {
    //get the current campaign

    var self = this;
    axios.get("http://localhost:4000/api/campaigns").then(res => {
      var left_data = [];
      var right_data = [];
      var last = res.data.length - 1;
      var clients = [];

      console.log(res.data[last - 1]);
      var lastCampaignClients = res.data[last - 1].clients;
      console.log("clients from last campaign", lastCampaignClients);

      var masterClients = this.props.dataSource;
      console.log("clients from master", masterClients);

      var lastCampaignTime = moment(res.data[last - 1].endDate)
        .toDate()
        .getTime();

      console.log("last campaign end date", lastCampaignTime);

      masterClients.forEach(function(client) {
        var editedTime = moment(client.lastEdited).toDate().getTime();
        console.log(editedTime);
        console.log(lastCampaignTime);
        console.log(editedTime > lastCampaignTime);
        if (editedTime > lastCampaignTime) {
          clients.push(client);
        }
      });

      var self = this;
      lastCampaignClients.forEach(function(client) {
        if (!clients.includes(client)) {
          axios
            .get("http://localhost:4000/api/clients/" + self.props.agentCode)
            .then(res => {
              if (res.data.includes(client)) {
                clients.push(client);
              }
            });
        }
      });

      console.log(clients);
      //Left Data: All clients from last campaign and any clients that were added since then
      //Right Data: All clients to be included for the current campaign

      clients.forEach(function(client) {
        if (!res.data[last].clients.includes(client._id)) {
          left_data.push(client);
        } else {
          right_data.push(client);
        }
      });
      this.setState({
        campaigns: res.data,
        columns: res.data[last].campaignColumns,
        campaignId: res.data[last]._id,
        leftData: left_data,
        rightData: right_data,
        currentCampaign: res.data[last].campaignName,
        clientsToSave: res.data[last].clients
      });
    });
  }

  compareByAlph(a, b) {
    if (a > b) {
      return -1;
    }
    if (a < b) {
      return 1;
    }
    return 0;
  }

  moveOver(text) {
    var clients = this.state.clientsToSave;
    clients.push(text._id);

    var included = this.state.rightData;
    included.push(text);

    var notIncluded = this.state.leftData;
    var index = 0;
    for (var i = 0; i < notIncluded.length; i++) {
      var client = notIncluded[i];
      if (client._id == text._id) {
        index = i;
      }
    }

    notIncluded.splice(index, 1);
    this.setState({
      rightData: included,
      leftData: notIncluded,
      clientsToSave: clients
    });
  }

  moveBack(text) {
    var client_ids = this.state.clientsToSave;
    var x = 0;
    for (var y = 0; y < client_ids.length; y++) {
      if (text._id == client_ids[y]) {
        x = y;
      }
    }
    client_ids.splice(x, 1);

    var notIncluded = this.state.leftData;
    notIncluded.push(text);

    var included = this.state.rightData;
    var index = 0;
    for (var i = 0; i < included.length; i++) {
      var client = included[i];
      if (client._id == text._id) {
        index = i;
      }
    }
    included.splice(index, 1);
    this.setState({
      rightData: included,
      leftData: notIncluded,
      clientsToSave: client_ids
    });
  }

  saveClients(clients) {
    var data = {
      clients: clients
    };

    var self = this;
    axios
      .put("http://localhost:4000/api/campaign/" + this.state.campaignId, data)
      .then(res => {
        self.setState({
          confirm: false
        });
      });
  }

  showConfirm() {
    this.setState({
      confirm: true
    });
  }

  handleCancelConfirm() {
    this.setState({
      confirm: false
    });
  }

  render() {
    console.log(this.state.clientsToSave);
    var leftColumns = [
      {
        title: "Client Name",
        dataIndex: "clientName",
        key: "clientName",
        width: "20%",
        sorter: (a, b) => {
          return this.compareByAlph(a.clientName, b.clientName);
        }
      },
      {
        title: "Client Address",
        dataIndex: "clientAddress",
        key: "clientAddress",
        width: "20%"
      },
      {
        title: "Client State",
        dataIndex: "clientState",
        key: "clientState",
        width: "12%",
        sorter: (a, b) => {
          return this.compareByAlph(a.clientState, b.clientState);
        }
      },
      {
        title: "Client City",
        dataIndex: "clientCity",
        key: "clientCity",
        width: "17%",
        sorter: (a, b) => {
          return this.compareByAlph(a.clientCity, b.clientCity);
        }
      },
      {
        title: "Move",
        dataIndex: "_id",
        key: "_id",
        width: "10%",
        render: (record, text, index) => {
          return (
            <a style={{ color: "#46797b" }} onClick={() => this.moveOver(text)}>
              Include
              <Icon
                type="right arrow"
                style={{ fontSize: 16 }}
                onClick={() => {
                  this.moveOver(text);
                }}
              />
            </a>
          );
        }
      }
    ];

    var rightColumns = [
      {
        title: "Client Name",
        dataIndex: "clientName",
        key: "clientName",
        width: "20%",
        sorter: (a, b) => {
          return this.compareByAlph(a.clientName, b.clientName);
        }
      },
      {
        title: "Client Address",
        dataIndex: "clientAddress",
        key: "clientAddress",
        width: "20%"
      },
      {
        title: "Client State",
        dataIndex: "clientState",
        key: "clientState",
        width: "12%",
        sorter: (a, b) => {
          return this.compareByAlph(a.clientState, b.clientState);
        }
      },
      {
        title: "Client City",
        dataIndex: "clientCity",
        key: "clientCity",
        width: "17%",
        sorter: (a, b) => {
          return this.compareByAlph(a.clientCity, b.clientCity);
        }
      },
      {
        title: "Move Back",
        dataIndex: "_id",
        key: "_id",
        width: "13%",
        render: (record, text, index) => {
          return (
            <a style={{ color: "#46797b" }} onClick={() => this.moveBack(text)}>
              <Icon
                type="left arrow"
                style={{ fontSize: 16 }}
                onClick={() => {
                  this.moveBack(text);
                }}
              />
              Remove
            </a>
          );
        }
      }
    ];

    return (
      <div className="campaignPage">
        <h2>
          {" "}{this.state.currentCampaign}{" "}
        </h2>
        <div className="buildCampaign">
          <div className="leftTable">
            <br />
            <div className="left-table-title">
              <h3 className="left-title">Not Included</h3>
            </div>
            <Table
              bordered
              dataSource={this.state.leftData}
              columns={leftColumns}
              pagination={false}
              scroll={{ y: 350 }}
              rowKey="uid"
            />
          </div>
          <div className="middle" />
          <div className="rightTable">
            <br />
            <h3> Included </h3>
            <Table
              bordered
              dataSource={this.state.rightData}
              columns={rightColumns}
              pagination={false}
              scroll={{ y: 350 }}
              rowKey="uid"
            />
            <div className="save-button">
              <Button
                onClick={e => {
                  this.showConfirm();
                }}
                color="white"
              >
                <text className="save-text">Save</text>
              </Button>
            </div>
          </div>
        </div>
        <Confirm
          open={this.state.confirm}
          content="Are you sure you want to save your changes to this Campaign?"
          cancelButton="No"
          confirmButton="Yes"
          onCancel={() => this.handleCancelConfirm()}
          onConfirm={e => this.saveClients(this.state.clientsToSave)}
        />
      </div>
    );
  }
}
