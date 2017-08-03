import React, { Component } from "react";
import axios from "axios";
import { Table, Input, Icon, Popconfirm } from "antd";
import { Button } from "semantic-ui-react";
import { Confirm } from "semantic-ui-react";
import moment from "moment";
import { Menu, Dropdown, message } from "antd";
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
      notIncluded: this.props.dataSource,
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
      var currentCampaign = agentCampaigns.filter(campaign => {
        var start = moment(campaign.startDate).toDate().getTime();
        var end = moment(campaign.endDate).toDate().getTime();
        var current = new Date().getTime();
        if (current >= start && current <= end) {
          return campaign;
        }
      });
      var allOtherClients = currentCampaign[0].clients.filter(client => {
          console.log("client.agentCode:", client.agentCode)
        return client.agentCode != this.state.agent.agentCode;
      });
      console.log("all other clients:", allOtherClients)
      var index = 0;
      for (var i = 0; i < agentCampaigns.length; i++) {
        if (agentCampaigns[i] == currentCampaign[0]) {
          index = i;
        }
      }

      var previousCampaign = agentCampaigns[index - 1];

      var previousCampaignSavedClients = [];
      if (previousCampaign != null) {
        previousCampaignSavedClients = previousCampaign.clients.filter(
          client => {
            if (client.agentCode == this.state.agent.agentCode) {
              return client;
            }
          }
        );
      }

      var savedClients = currentCampaign[0].clients.filter(client => {
        if (client.agentCode == this.state.agent.agentCode) {
          return client;
        }
      });

      var previousSavedClients = [];

      //Case 1
      if (savedClients.length > 0) {
        console.log("case one");
        included = savedClients;
        notIncluded = this.state.masterList.filter(client => {
          if (!included.includes(client)) {
            return client;
          }
        });
      } else if (previousCampaign !== null) {
        //Case 2
        if (
          savedClients.length == 0 &&
          previousCampaignSavedClients.length == 0
        ) {
          console.log("case two");
          included = [];
          notIncluded = this.state.masterList;
        }

        //Case 3
        if (
          savedClients.length == 0 &&
          previousCampaignSavedClients.length > 0
        ) {
          console.log("case three");
          included = previousCampaignSavedClients;
          console.log("included");
          notIncluded = this.state.masterList.filter(client => {
            if (!included.includes(client)) {
              return client;
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
        currentCampaign: currentCampaign[0],
        allOtherClients: allOtherClients
      });
    });
  }

  include(client) {
    var new_included = this.state.included;
    new_included.push(client);

    var new_notIncluded = this.state.notIncluded.filter(notClient => {
      return client != notClient;
    });
    console.log("new_notIncluded:", new_notIncluded);
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
    var clients = this.state.allOtherClients;
    // console.log("clients:", clients)
    included.forEach(function(client){
        clients.push(client)
    })  
    console.log("clients:", clients)
    var data = {
      clients: clients
    };
    axios.put(
      "http://localhost:4000/api/campaign/" + this.state.currentCampaign._id,
      data
    );
  }

  render() {
    var notIncludedColumns = [
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
              value={this.state.leftSearchText}
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
        filterLeftDropdownVisible: this.state.filterLeftDropdownVisible,
        onFilterLeftDropdownVisibleChange: visible => {
          this.setState(
            {
              filterLeftDropdownVisible: visible
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
          return this.compareByAlph(a.clientName, b.clientName);
        },
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => (this.searchRightInput = ele)}
              placeholder="Search name"
              value={this.state.rightSearchText}
              onChange={e => this.onRightInputChange(e)}
              onPressEnter={() => this.onRightSearch()}
            />
            <Button type="primary" onClick={() => this.onRightSearch()}>
              Search
            </Button>
          </div>
        ),
        filterIcon: (
          <Icon
            type="search"
            style={{ color: this.state.rightFiltered ? "#108ee9" : "#aaa" }}
          />
        ),
        filterDropdownVisible: this.state.filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => {
          this.setState(
            {
              filterDropdownVisible: visible
            },
            () => this.searchRightInput.focus()
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
        <h2>
          {" Current Campaign: "}
          {this.state.currentCampaign.campaignName}{" "}
        </h2>

        <div className="tables">
          <div className="included-table">
            <Table
              bordered
              dataSource={this.state.included}
              columns={IncludedColumns}
              pagination={false}
              scroll={{ y: 350 }}
              rowKey="uid"
            />
          </div>
          <div className="middle" />
          <div className="not-table">
            <Table
              bordered
              dataSource={this.state.notIncluded}
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
