import React, { Component } from "react";
import axios from "axios";
import { Table, Input, Icon, Popconfirm } from "antd";
import { Button, Dropdown } from "semantic-ui-react";
import { Confirm } from "semantic-ui-react";
import moment from "moment";
import { Menu, message } from "antd";
import "antd/dist/antd.css";
import "./CampaignTable2.css";

export default class CampaignTable2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      masterList: this.props.dataSource,
      agent: this.props.agent,
      agentCampaigns: [],
      included: [],
      includedSearchText: "",
      includedSearchData: [],

      notIncluded: this.props.dataSource,
      notIncludedSearchText: "",
      notIncludedSearchData: [],

      currentCampaign: {},
      allOtherClients: []
    };
  }

  componentWillMount() {
    //Case 1 : clients saved in current campaign
    // Case 2 : No clients in past campaign or this one
    // Case 3 : clients in past campaign but not this one
    var self = this;
    axios.get("http://localhost:4000/api/campaigns").then(res => {
      var campaigns = res.data;

      var included = [];
      var notIncluded = [];
      var agentCampaigns = res.data.filter(campaign => {
        if (this.state.agent.pastCampaigns.includes(campaign._id)) {
          return campaign;
        }
      });
      console.log("agent campaigns", agentCampaigns);

      var currentCampaign = agentCampaigns.filter(campaign => {
        var start = moment(campaign.startDate).toDate().getTime();
        var end = moment(campaign.endDate).toDate().getTime();
        var current = new Date().getTime();
        if (current >= start && current <= end) {
          return campaign;
        }
      });
      console.log("Current campaign:", currentCampaign[0]);

      var index = 0;
      for (var i = 0; i < agentCampaigns.length; i++) {
        if (agentCampaigns[i] == currentCampaign[0]) {
          index = i;
        }
      }

      var previousCampaign = agentCampaigns[index - 1];

      var code = this.state.agent.agentCode;

      console.log("Previous", previousCampaign);
      var previousCampaignSavedClients = [];
      if (previousCampaign != null) {
        for (var agent in previousCampaign.clients) {
          if (agent == code && previousCampaign.clients[agent].length != 0) {
            previousCampaignSavedClients = previousCampaign.clients[agent];
          }
        }
      }

      var savedClients = [];

      for (var agent in currentCampaign[0].clients) {
        if (agent == code && currentCampaign[0].clients[agent].length != 0) {
          savedClients = currentCampaign[0].clients[agent];
        }
      }

      console.log("Saved Clients", savedClients);
      console.log("Previous Campaign", previousCampaign);

      //Case 1
      if (savedClients.length > 0) {
        console.log("case one");
        included = savedClients;
        var includedIds = included.map(client => {
          return client._id;
        });
        notIncluded = this.state.masterList.filter(client => {
          if (!includedIds.includes(client._id)) {
            return client;
          }
        });
      } else if (previousCampaign !== null) {
        //Case 2
        if (
          savedClients.length == 0 &&
          previousCampaignSavedClients.length == 0
        ) {
          included = [];
          notIncluded = this.state.masterList;
          notIncluded.map(client => {
            var campaignEndTime = moment(currentCampaign[0].endDate)
              .toDate()
              .getTime();
            var lastEditedTime = moment(client.lastEdited).toDate().getTime();
            if (lastEditedTime > campaignEndTime) {
              included.push(client);
            }
          });
        }

        //Case 3
        if (
          savedClients.length == 0 &&
          previousCampaignSavedClients.length > 0
        ) {
          included = previousCampaignSavedClients;
          var includedIds = included.map(client => {
            return client._id;
          });
          notIncluded = this.state.masterList.filter(client => {
            if (!includedIds.includes(client._id)) {
              return client;
            }
          });
          notIncluded.map(client => {
            var campaignEndTime = moment(currentCampaign[0].endDate)
              .toDate()
              .getTime();
            var lastEditedTime = moment(client.lastEdited).toDate().getTime();
            if (lastEditedTime > campaignEndTime) {
              included.push(client);
            }
          });
        }
      } else {
        included = [];
        notIncluded = this.state.masterList;
      }
      self.setState({
        included: included,
        notIncluded: notIncluded,
        currentCampaign: currentCampaign[0]
      });
    });
  }

  include(client) {
    var new_included = this.state.included;
    new_included.push(client);

    var new_notIncluded = this.state.notIncluded.filter(notClient => {
      return client != notClient;
    });

    this.setState({
      included: new_included,
      notIncluded: new_notIncluded
    });
    this.saveClients(new_included);
  }

  remove(client) {
    var new_notIncluded = this.state.notIncluded;
    new_notIncluded.push(client);

    var new_included = this.state.included.filter(notClient => {
      return client != notClient;
    });

    this.setState({
      included: new_included,
      notIncluded: new_notIncluded
    });

    this.saveClients(new_included);
  }

  saveClients(included) {
    var data = {
      clients: included
    };
    console.log(this.state.currentCampaign._id);
    axios
      .put(
        "http://localhost:4000/api/campaign/" +
          this.state.currentCampaign._id +
          "/" +
          this.state.agent.agentCode,
        data
      )
      .then(res => {
        console.log(res.data);
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

  //search functions Included
  onIncludedInputChange(e) {
    this.setState({ includedSearchText: e.target.value });
  }
  onIncludedSearch() {
    const { includedSearchText } = this.state;
    const reg = new RegExp(includedSearchText, "gi");
    this.setState({
      filterDropdownVisible: false,
      includedFiltered: !!includedSearchText,
      includedSearchData: this.state.included
        .map(record => {
          console.log("record", record);
          const match =
            record.clientName.match(reg) ||
            record.clientCity.match(reg) ||
            record.clientAddress.match(reg) ||
            record.clientState.match(reg);
          if (!match) {
            return null;
          }
          return {
            ...record
          };
        })
        .filter(record => !!record)
    });
  }
  //end search functions Included

  //search functions not included
  onNotIncludedInputChange(e) {
    this.setState({ notIncludedSearchText: e.target.value });
  }
  onNotIncludedSearch() {
    const { notIncludedSearchText } = this.state;
    const reg = new RegExp(notIncludedSearchText, "gi");
    this.setState({
      filterDropdownVisible: false,
      notIncludedFiltered: !!notIncludedSearchText,
      notIncludedSearchData: this.state.notIncluded
        .map(record => {
          console.log("record", record);
          const match =
            record.clientName.match(reg) ||
            record.clientCity.match(reg) ||
            record.clientAddress.match(reg) ||
            record.clientState.match(reg);
          if (!match) {
            return null;
          }
          return {
            ...record
          };
        })
        .filter(record => !!record)
    });
  }
  //end search functions not included
  handleIncludedClearSearch(event) {
    this.setState({
      includedFiltered: false,
      includedSearchText: ""
    });
  }

  handleNotIncludedClearSearch(event) {
    this.setState({
      notIncludedFiltered: false,
      notIncludedSearchText: ""
    });
  }

  render() {
    var notIncludedColumns = [
      {
        title: "Client Name",
        dataIndex: "clientName",
        key: "clientName",
        width: "20%",
        sorter: (a, b) => {
          return this.compareByAlph(b.clientName, a.clientName);
        }
      },
      {
        title: "Client Address",
        dataIndex: "clientAddress",
        key: "clientAddress",
        width: "20%"
      },
      {
        title: "Client City",
        dataIndex: "clientCity",
        key: "clientCity",
        width: "17%",
        sorter: (a, b) => {
          return this.compareByAlph(b.clientCity, a.clientCity);
        }
      },
      {
        title: "Client State",
        dataIndex: "clientState",
        key: "clientState",
        width: "12%",
        sorter: (a, b) => {
          return this.compareByAlph(b.clientState, a.clientState);
        }
      },

      {
        title: "Move",
        dataIndex: "_id",
        key: "_id",
        width: "10%",
        render: (record, text, index) => {
          return (
            <a style={{ color: "#46797b" }} onClick={() => this.include(text)}>
              <Icon
                type="left arrow"
                style={{ fontSize: 16 }}
                onClick={() => {
                  this.include(text);
                }}
              />
              Include
            </a>
          );
        }
      }
    ];

    var IncludedColumns = [
      {
        title: "Client Name",
        dataIndex: "clientName",
        key: "clientName",
        width: "20%",
        sorter: (a, b) => {
          return this.compareByAlph(b.clientName, a.clientName);
        }
      },
      {
        title: "Client Address",
        dataIndex: "clientAddress",
        key: "clientAddress",
        width: "20%"
      },
      {
        title: "Client City",
        dataIndex: "clientCity",
        key: "clientCity",
        width: "17%",
        sorter: (a, b) => {
          return this.compareByAlph(b.clientCity, a.clientCity);
        }
      },
      {
        title: "Client State",
        dataIndex: "clientState",
        key: "clientState",
        width: "12%",
        sorter: (a, b) => {
          return this.compareByAlph(b.clientState, a.clientState);
        }
      },

      {
        title: "Move Back",
        dataIndex: "_id",
        key: "_id",
        width: "13%",
        render: (record, text, index) => {
          return (
            <a style={{ color: "#46797b" }} onClick={() => this.remove(text)}>
              Remove
              <Icon
                type="right arrow"
                style={{ fontSize: 16 }}
                onClick={() => {
                  this.remove(text);
                }}
              />
            </a>
          );
        }
      }
    ];
    return (
      <div className="campaignPage">
        <br />
        <h2>
          {" Current Campaign: "}
          {this.state.currentCampaign.campaignName}{" "}
        </h2>
        <div className="dropdown">
          <Dropdown placeholder="Select Friend" fluid selection />
        </div>
        <div className="tables">
          <div className="included-table">
            <h2 className="tableTitles">Not Included</h2>
            <div className="search-bar">
              <div style={{ width: "70%" }}>
                <Input
                  ref={ele => (this.includedSearchInput = ele)}
                  placeholder="Search included list by name, address, city, or state"
                  value={this.state.includedSearchText}
                  onChange={e => this.onIncludedInputChange(e)}
                  onPressEnter={() => this.onIncludedSearch()}
                />
              </div>
              <Button
                type="primary"
                size="mini"
                onClick={() => this.onIncludedSearch()}
                style={{ marginLeft: "1%" }}
              >
                Search
              </Button>
              <Button
                type="primary"
                size="mini"
                onClick={e => this.handleIncludedClearSearch(e)}
              >
                Clear Search
              </Button>
            </div>
            <br />

            <Table
              bordered
              dataSource={
                this.state.includedFiltered
                  ? this.state.includedSearchData
                  : this.state.included
              }
              columns={IncludedColumns}
              pagination={false}
              scroll={{ y: 350 }}
              rowKey="uid"
            />
          </div>
          <div className="middle" />
          <div className="not-table">
            <h2 className="tableTitles">Not Included</h2>
            <div className="search-bar">
              <div style={{ width: "70%" }}>
                <Input
                  ref={ele => (this.notIncludedSearchInput = ele)}
                  placeholder="Search not included list by name, address, city, or state"
                  value={this.state.notIncludedSearchText}
                  onChange={e => this.onNotIncludedInputChange(e)}
                  onPressEnter={() => this.onNotIncludedSearch()}
                  size="mini"
                />
              </div>
              <Button
                type="primary"
                size="mini"
                onClick={() => this.onNotIncludedSearch()}
                style={{ marginLeft: "1%" }}
              >
                Search
              </Button>
              <Button
                type="primary"
                size="mini"
                onClick={e => this.handleNotIncludedClearSearch(e)}
              >
                Clear Search
              </Button>
            </div>
            <br />

            <Table
              bordered
              dataSource={
                this.state.notIncludedFiltered
                  ? this.state.notIncludedSearchData
                  : this.state.notIncluded
              }
              columns={notIncludedColumns}
              pagination={false}
              scroll={{ y: 350 }}
              rowKey="uid"
            />
          </div>
        </div>
      </div>
    );
  }
}
