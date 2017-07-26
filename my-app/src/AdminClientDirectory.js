import React, { Component } from "react";
import { Table, Tabs, Button, Input, Icon } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import "./AdminDirectory.css";
import EditForm from "./EditForm";
const TabPane = Tabs.TabPane;

export default class AdminClientDirectory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterDropdownVisible: false,
      data: [],
      officeData: [],
      searchText: "",
      filtered: false,
      searchData: []
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

  componentWillMount() {
    axios.get("http://localhost:4000/api/clients").then(res => {
      this.setState({
        data: res.data,
        officeData: res.data.filter(client => {
          return "Asheville" === client.office;
        })
      });
    });
  }

  handleTabClick(key) {
    var data = this.state.data;
    this.setState({
      officeData: data.filter(client => {
        return key === client.office;
      }),
      searchData: [],
      filtered: false,
      searchText: ""
    });
  }

  render() {
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    console.log("search data:", this.state.searchData);
    console.log("office data:", this.state.officeData);
    const columns = [
      {
        title: "Client Name",
        dataIndex: "clientName",
        width: 150,
        sorter: function(a, b) {
          var nameA = a.clientName.toLowerCase(),
            nameB = b.clientName.toLowerCase();
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
        title: "Street",
        dataIndex: "clientAddress",
        width: 150
      },
      {
        title: "City",
        dataIndex: "clientCity",
        width: 150,
        sorter: function(a, b) {
          var nameA = a.clientCity.toLowerCase(),
            nameB = b.clientCity.toLowerCase();
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
        dataIndex: "clientEmail",
        width: 150
      },
      {
        title: "Birthday",
        dataIndex: "clientBirthday",
        width: 150,
        sorter: function(a, b) {
          return new Date(b.date) - new Date(a.date);
        }
      },
      {
        title: "Home Anniversary",
        dateIndex: "homeAnniversary",
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
                <EditForm />;
              }}
            />
          </span>
      }
    ];

    return (
      <div>
        <div className="header">
          <Link to="/">
            <Icon type="arrow-left" style={{ fontSize: 30 }} />
          </Link>
          <h1>Client Directory</h1>
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
          //scroll={{ y: 700 }}
        />
      </div>
    );
  }
}
