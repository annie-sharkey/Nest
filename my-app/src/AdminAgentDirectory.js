import React, { Component } from "react";
import { Table, Tabs, Button, Input, Icon } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import "./AdminDirectory.css";
import AgentEditForm from "./AgentEditForm";
import AgentForm from "./AgentForm";
const TabPane = Tabs.TabPane;

export default class AdminAgentDirectory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterDropdownVisible: false,
      data: [],
      officeData: [],
      searchText: "",
      filtered: false,
      searchData: [],
      editModal: false,
      selectedAgent: {},
      modal: false
    };
  }

  onInputChange(e) {
    this.setState({ searchText: e.target.value });
  }
  onSearch() {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, "gi");
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      searchData: this.state.officeData
        .map(record => {
          const match = record.agentName.match(reg);
          if (!match) {
            return null;
          }
          return {
            ...record,
            name: (
              <span>
                {record.agentName.split(reg).map(
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

  componentWillMount() {
    axios.get("http://localhost:4000/api/agents").then(res => {
      console.log(res.data);
      this.setState({
        data: res.data,
        officeData: res.data.filter(agent => {
          return "Asheville" === agent.agentOffice;
        })
      });
    });
  }

  handleTabClick(key) {
    var data = this.state.data;
    this.setState({
      officeData: data.filter(agent => {
        return key === agent.agentOffice;
      })
    });
  }

  handleTabClick(key) {
    var data = this.state.data;
    this.setState({
      officeData: data.filter(agent => {
        return key === agent.agentOffice;
      }),
      searchData: [],
      filtered: false,
      searchText: ""
    });
  }

  openEditModal(text) {
    console.log(text);
    this.setState({
      editModal: true,
      selectedAgent: text
    });
  }

  updateAgent(agentCode, agentName, agentEmail, agentPhoneNumber, agentOffice) {
    console.log(
      agentCode,
      agentName,
      agentEmail,
      agentPhoneNumber,
      agentOffice
    );
    var agentId = this.state.selectedAgent._id;
    console.log("id:", agentId);
    axios.put(
      "http://localhost:4000/api/agent/" + this.state.selectedAgent.agentCode,
      {
        // agentCode: agentCode,
        agentName: agentName,
        agentEmail: agentEmail,
        agentPhoneNumber: agentPhoneNumber,
        agentOffice: agentOffice
      }
    );
    this.closeEditModal();
  }

  closeEditModal() {
    this.setState({
      editModal: false
    });
  }

  deleteAgent() {
    axios.delete(
      "http://localhost:4000/api/agent/" + this.state.selectedAgent.agentCode
    );
    this.setState({
      editModal: false
    });
  }

  addAgent(
    agentCode,
    agentName,
    agentEmail,
    agentTitle,
    agentPhoneNumber,
    agentOffice,
    password
  ) {
    var data = {
      agentCode: agentCode,
      agentEmail: agentEmail,
      agentName: agentName,
      agentTitle: agentTitle,
      agentPhoneNumber: agentPhoneNumber,
      agentOffice: agentOffice,
      password: password
    };

    axios.post("http://localhost:4000/api/agent/new", data);
    this.setState({
      modal: false
    });
  }

  closeModal() {
    this.setState({
      modal: false
    });
  }

  openModal() {
    this.setState({
      modal: true
    });
  }
  render() {
    var modal;
    if (this.state.modal) {
      modal = (
        <AgentForm
          modal={this.state.modal}
          onCancel={() => this.closeModal()}
          onOk={(
            agentCode,
            agentName,
            agentEmail,
            agentTitle,
            agentPhoneNumber,
            agentOffice,
            password
          ) =>
            this.addAgent(
              agentCode,
              agentName,
              agentEmail,
              agentTitle,
              agentPhoneNumber,
              agentOffice,
              password
            )}
        />
      );
    }

    var editModal;
    if (this.state.editModal) {
      editModal = (
        <AgentEditForm
          editModal={this.state.editModal}
          onCancel={() => this.closeEditModal()}
          onOk={(
            agentCode,
            agentName,
            agentEmail,
            agentPhoneNumber,
            agentOffice
          ) =>
            this.updateAgent(
              agentCode,
              agentName,
              agentEmail,
              agentPhoneNumber,
              agentOffice
            )}
          selectedAgent={this.state.selectedAgent}
          deleteAgent={() => {
            this.deleteAgent();
          }}
        />
      );
    }
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const columns = [
      {
        title: "Agent Name",
        dataIndex: "agentName",
        width: 150,
        sorter: function(a, b) {
          var nameA = a.agentName.toLowerCase(),
            nameB = b.agentName.toLowerCase();
          if (
            nameA < nameB //sort string ascending
          )
            return -1;
          if (nameA > nameB) return 1;
          return 0; //default return value (no sorting)
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
            <Button type="primary" onClick={this.onSearch}>
              Search
            </Button>
          </div>
        ),
        filterIcon: (
          <Icon
            type="search"
            style={{ color: this.state.filtered ? "#108ee9" : "#aaa" }}
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
        title: "Code",
        dataIndex: "agentCode",
        width: 150,
        sorter: function(a, b) {
          var nameA = a.agentCode.toLowerCase(),
            nameB = b.agentCode.toLowerCase();
          if (
            nameA < nameB //sort string ascending
          )
            return -1;
          if (nameA > nameB) return 1;
          return 0; //default return value (no sorting)
        }
      },
      {
        title: "Email",
        dataIndex: "agentEmail",
        width: 150
      },
      {
        title: "Phone",
        dataIndex: "agentPhoneNumber",
        width: 150
      },
      {
        title: "Edit",
        key: "action",
        render: (text, record) =>
          <span>
            <Icon
              type="edit"
              onClick={() => {
                this.openEditModal(text);
              }}
            />
          </span>
      }
    ];

    return (
      <div>
        <div className="header">
          {editModal}
          {modal}
          <Link to="/">
            <Icon type="arrow-left" style={{ fontSize: 30 }} />
          </Link>
          <Button onClick={() => this.openModal()}>Add Client</Button>
          <h1>Agent Directory</h1>
          <br />
        </div>

        <Tabs
          defaultActiveKey="Asheville"
          onChange={key => this.handleTabClick(key)}
        >
          <TabPane tab="Asheville" key="Asheville" />
          <TabPane tab="Charlottesville" key="Charlottesville" />
          <TabPane tab="Fredericksburg" key="Fredericksburg" />
          <TabPane tab="New River Valley" key="New River Valley" />
          <TabPane tab="Richmond" key="Richmond" />
          <TabPane tab="Shenandoah Valley" key="Shenandoah Valley" />
          <TabPane tab="Wilmington" key="Wilmington" />
        </Tabs>
        <Table
          columns={columns}
          dataSource={
            this.state.filtered ? this.state.searchData : this.state.officeData
          }
          pagination={{ pageSize: 50 }}
          // scroll={{ y: 240 }}
        />
      </div>
    );
  }
}
