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
      confirm: false,
      searchText: "",
      leftSearchData: [],
      leftFiltered: false
    };
  }

  getNoCurrentAndNoPreviousData(
    left,
    campaigns,
    name,
    columns,
    id,
    currentClientIds
  ) {
    this.setState({
      leftData: left,
      rightData: [],
      campaigns: campaigns,
      currentCampaign: name,
      columns: columns,
      campaignId: id,
      clientsToSave: currentClientIds
    });
    console.log("annie");
  }

  componentWillMount() {
    //Cases:
    // 1) Agent already has clients in current Campaign
    // 2) Agent doesn't have clients in current campaign but had some in previous campaign
    // 3) Agent doesn't have clients in this campaign or previous campaign
    var notIncluded = [];
    var included = [];
    var campaigns = [];
    var currentCampaign = "";
    var columns = [];
    var campaignId = "";
    var clientsToSave = [];
    var masterClients = this.props.dataSource;

    var self = this;
    axios.get("http://localhost:4000/api/campaigns").then(res => {
      if (res.data.length == 1) {
        self.setState({
          leftData: self.props.dataSource,
          rightData: [],
          campaigns: res.data,
          currentCampaign: res.data[0].campaignName,
          columns: res.data[0].campaignColumns,
          campaignId: res.data[0]._id,
          clientsToSave: []
        });
      }
      if (res.data.length > 1) {
        var lastIndex = res.data.length - 1;
        var currentCampaign = res.data[lastIndex];
        var previousCampaign = res.data[lastIndex - 1];
        var currentClientIds = res.data[lastIndex].clients;
        var previousClientsIds = res.data[lastIndex - 1].clients;

        var agentClientsPrevious = [];
        masterClients.forEach(function(client) {
          if (previousClientsIds.includes(client._id)) {
            agentClientsPrevious.push(client);
          }
        });

        masterClients.forEach(function(client) {
          if (currentClientIds.includes(client._id)) {
            included.push(client);
          }
        });

        if (included.length == 0 && agentClientsPrevious.length == 0) {
          this.getNoCurrentAndNoPreviousData(
            self.props.dataSource,
            res.data,
            currentCampaign.campaignName,
            currentCampaign.campaignColumns,
            currentCampaign._id,
            currentClientIds
          );
        }

        //Case 1
        if (included.length > 0) {
          console.log("agent has clients in current campaign");
          masterClients.forEach(function(client) {
            if (!included.includes(client)) {
              notIncluded.push(client);
            }
          });

          self.setState({
            leftData: notIncluded,
            rightData: included,
            campaigns: res.data,
            currentCampaign: currentCampaign.campaignName,
            columns: currentCampaign.campaignColumns,
            campaignId: currentCampaign._id,
            clientsToSave: currentClientIds
          });
        } else if (included.length == 0 && agentClientsPrevious.length > 0) {
          //Case 2
          console.log(
            "agent has clients from previous campaign but not current"
          );
          agentClientsPrevious.forEach(function(client) {
            included.push(client);
          });

          console.log("Previous Clients", included);

          var previousCampaignTime = moment(previousCampaign.endDate)
            .toDate()
            .getTime();

          masterClients.forEach(function(client) {
            var editTime = moment(client.lastEdited).toDate().getTime();
            console.log(
              moment(client.lastEdited).toDate(),
              moment(previousCampaign.endDate).toDate()
            );
            if (previousCampaignTime < editTime) {
              if (!included.includes(client)) {
                included.push(client);
              }
            }
          });

          masterClients.forEach(function(client) {
            if (!included.includes(client)) {
              notIncluded.push(client);
            }
          });

          var includedIds = [];
          included.forEach(function(client) {
            includedIds.push(client._id);
          });

          self.setState({
            leftData: notIncluded,
            rightData: included,
            campaigns: res.data,
            currentCampaign: currentCampaign.campaignName,
            columns: currentCampaign.campaignColumns,
            campaignId: currentCampaign._id,
            clientsToSave: includedIds
          });
        }
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
    var self = this;
    var data = {
      clients: clients
    };

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

  //search functions
  onInputChange(e) {
    this.setState({ searchText: e.target.value });
  }
  onSearch() {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, "gi");
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      searchData: this.state.leftData
        .map(record => {
          const match = record.clientName.match(reg);
          if (!match) {
            return null;
          }
          return {
            ...record,
            name: (
              <span>
                {record.clientName.split(reg).map(
                  (text, i) =>
                    i > 0
                      ? [
                          <span className="highlight">
                            {match[0]}
                          </span>,
                          text
                        ]
                      : text
                )}
              </span>
            )
          };
        })
        .filter(record => !!record)
    });
  }
  //end search functions

  render() {
    var leftColumns = [
      {
        title: "Client Name",
        dataIndex: "clientName",
        key: "clientName",
        width: "20%",
        sorter: (a, b) => {
          return this.compareByAlph(a.clientName, b.clientName);
        },
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => (this.searchInput = ele)}
              placeholder="Search name"
              value={this.state.searchText}
              onChange={e => this.onInputChange(e)}
              onPressEnter={() => this.onSearch()}
            />
            <Button type="primary" onClick={() => this.onSearch()}>
              Search
            </Button>
          </div>
        ),
        filterIcon: (
          <Icon
            type="search"
            style={{ color: this.state.leftFiltered ? "#108ee9" : "#aaa" }}
          />
        ),
        filterDropdownVisible: this.state.filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => {
          this.setState(
            {
              filterDropdownVisible: visible
            },
            () => this.searchInput.focus()
          );
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
              dataSource={
                this.state.leftFiltered
                  ? this.state.leftSearchData
                  : this.state.leftData
              }
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
