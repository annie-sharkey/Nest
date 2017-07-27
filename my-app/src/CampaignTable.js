import React from "react";
// import { Table } from "semantic-ui-react";
import "./App.css";
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
    var self = this;
    axios.get("http://localhost:4000/api/campaigns").then(res => {
      if (res.data.length > 1) {
        //Current Campaign Index
        var last = res.data.length - 1;
        //Agent Clients Saved In Campaign
        var savedAgentClients = [];
        //Check all Clients in Campaign and filter the ones from this agent
        this.props.dataSource.forEach(function(client) {
          if (res.data[last].clients.includes(client._id)) {
            savedAgentClients.push(client._id);
          }
        });

        var lastAgentClients = [];
        var lastCampaignClients = res.data[last - 1].clients;
        lastAgentClients.forEach(function(client) {
          axios.get("http://localhost:4000/api/client/" + client).then(y => {
            if (y.agentCode == this.state.agentCode) {
              lastAgentClients.push(y);
            }
          });
        });

        //If no clients are saved for this agent, make a default list included clients
        if (savedAgentClients.length == 0 && lastAgentClients.length > 0) {
          var defaultClients = [];

          var lastCampaignClientsIds = res.data[last - 1].clients;

          var masterClients = this.props.dataSource;

          var lastCampaignTime = moment(res.data[last - 1].endDate)
            .toDate()
            .getTime();

          //From agent clients, any clients that were edited after previous campaign
          //and any clients from previous campaign
          masterClients.forEach(function(client) {
            var editedTime = moment(client.lastEdited).toDate().getTime();
            if (editedTime > lastCampaignTime) {
              console.log("New Client", client);
              defaultClients.push(client);
            }
            if (lastCampaignClientsIds.includes(client._id)) {
              console.log("Client from Previous Campaign", client);
              defaultClients.push(client);
            }
          });
          console.log("default clients", defaultClients);

          //Not Included Table Data
          var leftData = [];
          //Any clients Not in Default List
          masterClients.forEach(function(client) {
            if (!defaultClients.includes(client)) {
              leftData.push(client);
            }
          });

          //Clients to put into the database
          var clientsToSave = [];
          defaultClients.forEach(function(client) {
            clientsToSave.push(client._id);
          });

          this.setState({
            campaigns: res.data,
            columns: res.data[last].campaignColumns,
            campaignId: res.data[last]._id,
            leftData: leftData,
            rightData: defaultClients,
            currentCampaign: res.data[last].campaignName,
            clientsToSave: clientsToSave
          });
        } else if (
          savedAgentClients.length == 0 &&
          lastAgentClients.length == 0
        ) {
          //The case that the agent has no clients in previous campaign as well
          var clientsToSave = res.data[last].clients;
          var lastCampaignTime = moment(res.data[last - 1].endDate)
            .toDate()
            .getTime();

          var masterClients = this.props.dataSource;
          var defaultClients = [];
          masterClients.forEach(function(client) {
            var editedTime = moment(client.lastEdited).toDate().getTime();
            if (editedTime > lastCampaignTime) {
              console.log("New Client", client);
              defaultClients.push(client);
            }
          });

          //Not Included Table Data
          var leftData = [];
          //Any clients Not in Default List
          masterClients.forEach(function(client) {
            if (!defaultClients.includes(client)) {
              leftData.push(client);
            }
          });

          //Clients to put into the database
          var clientsToSave = [];
          defaultClients.forEach(function(client) {
            clientsToSave.push(client._id);
          });

          this.setState({
            campaigns: res.data,
            columns: res.data[last].campaignColumns,
            campaignId: res.data[last]._id,
            leftData: leftData,
            rightData: defaultClients,
            currentCampaign: res.data[last].campaignName,
            clientsToSave: clientsToSave
          });
        } else {
          //The case that the Agent already has clients saved in the campaign
          var last = res.data.length - 1;
          //All clients saved in current campaign
          var clientsToSave = res.data[last].clients;
          //All clients of this agent
          var allClients = this.props.dataSource;

          var leftData = [];
          var rightData = [];
          allClients.forEach(function(client) {
            if (clientsToSave.includes(client._id)) {
              rightData.push(client);
            } else {
              leftData.push(client);
            }
          });

          this.setState({
            campaigns: res.data,
            columns: res.data[last].campaignColumns,
            campaignId: res.data[last]._id,
            leftData: leftData,
            rightData: rightData,
            currentCampaign: res.data[last].campaignName,
            clientsToSave: clientsToSave
          });
        }
      } else {
        //case that only one campaign exists
        var clientsToSave = res.data[0].clients;
        this.setState({
          campaigns: res.data,
          columns: res.data[0].campaignColumns,
          campaignId: res.data[0]._id,
          leftData: self.props.dataSource,
          rightData: [],
          currentCampaign: res.data[0].campaignName,
          clientsToSave: clientsToSave
        });
      }
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
    console.log(clients);
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
    console.log(client_ids);
    included.splice(index, 1);
    this.setState({
      rightData: included,
      leftData: notIncluded,
      clientsToSave: client_ids
    });
  }

  saveClients(clients) {
    console.log(clients);
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
        <h2 className="campaign-title">
          {" "}{this.state.currentCampaign}{" "}
        </h2>
        <div className="buildCampaign">
          <div className="leftTable">
            <br />
            <div className="left-table-title">
              <h3 className="left-title" style={{ "font-family": "Cantarell" }}>
                Not Included
              </h3>
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
            <h3 style={{ "font-family": "Cantarell" }}> Included </h3>
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
