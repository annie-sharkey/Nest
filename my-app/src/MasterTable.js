import React, { Component } from "react";
import "antd/dist/antd.css";
import { Table, Input, Icon, Popconfirm } from "antd";
import { Button } from "semantic-ui-react";
import axios from "axios";
// import data from './data';
import ClientForm from "./Form";
import EditForm from "./EditForm";
import "./App.css";

export default class MasterTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.dataSource,
      count: 2,
      modal: false,
      editModal: false,
      selectedClient: {},
      searchText: "",
      searchData: [],
      filtered: false
    };
  }

  handleOpenModal() {
    this.setState({
      modal: true
    });
  }

  handleCloseModal() {
    this.setState({
      modal: false
    });
  }

  openEditModal(text) {
    console.log(text);
    this.setState({
      editModal: true,
      selectedClient: text
    });
  }

  closeEditModal() {
    this.setState({
      editModal: false
    });
    window.location.reload();
  }

  cancelEditModal() {
    this.setState({
      editModal: false
    });
  }

  updateClient(
    clientName,
    clientAddress,
    clientCity,
    clientEmail,
    clientState,
    clientBirthday,
    clientAnniversary
  ) {
    var clientId = this.state.selectedClient._id;
    axios.put("http://localhost:4000/api/clients/" + clientId, {
      clientName: clientName,
      clientAddress: clientAddress,
      clientCity: clientCity,
      clientEmail: clientEmail,
      clientState: clientState,
      clientBirthday: clientBirthday,
      homeAnniversary: clientAnniversary
    });
    this.closeEditModal();
  }

  handleAdd(
    clientName,
    clientAddress,
    clientCity,
    clientEmail,
    clientState,
    clientBirthday,
    clientAnniversary
  ) {
    var data = this.state.dataSource;
    axios.post("http://localhost:4000/api/clients", {
      clientName: clientName,
      clientAddress: clientAddress,
      clientCity: clientCity,
      clientEmail: clientEmail,
      clientState: clientState,
      clientBirthday: clientBirthday,
      homeAnniversary: clientAnniversary,
      agentCode: this.props.agentCode
    });
    this.handleCloseModal();
  }

  deleteClient() {
    axios.delete(
      "http://localhost:4000/api/clients/" + this.state.selectedClient._id
    );

    this.setState({
      editModal: false
    });
    window.location.reload();
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
      searchData: this.state.dataSource
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
    console.log(this.state.dataSource);
    var modal;
    if (this.state.modal) {
      modal = (
        <ClientForm
          modal={this.state.modal}
          onCancel={() => {
            this.handleCloseModal();
          }}
          onOk={(
            clientName,
            clientAddress,
            clientCity,
            clientEmail,
            clientState,
            clientBirthday,
            clientAnniversary
          ) =>
            this.handleAdd(
              clientName,
              clientAddress,
              clientCity,
              clientEmail,
              clientState,
              clientBirthday,
              clientAnniversary
            )}
        />
      );
    }

    var editModal;

    if (this.state.editModal) {
      editModal = (
        <EditForm
          editModal={this.state.editModal}
          onCancel={() => this.cancelEditModal()}
          onOk={(
            clientName,
            clientAddress,
            clientCity,
            clientEmail,
            clientState,
            clientBirthday,
            clientAnniversary
          ) =>
            this.updateClient(
              clientName,
              clientAddress,
              clientCity,
              clientEmail,
              clientState,
              clientBirthday,
              clientAnniversary
            )}
          selectedClient={this.state.selectedClient}
          deleteClient={() => {
            this.deleteClient();
          }}
        />
      );
    }
    const columns = [
      {
        title: "Client Name",
        dataIndex: "clientName",
        key: "clientName",
        width: "25%",
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
        title: "Client Address",
        dataIndex: "clientAddress",
        key: "clientAddress",
        width: "25%"
      },
      {
        title: "Client City",
        dataIndex: "clientCity",
        key: "clientCity",
        width: "25%",
        sorter: (a, b) => {
          return this.compareByAlph(a.clientCity, b.clientCity);
        }
      },
      {
        title: "Client State",
        dataIndex: "clientState",
        key: "clientState",
        width: "10%"
      },
      {
        title: "Edit",
        dataIndex: "_id",
        key: "_id",
        render: (record, text, index) => {
          return (
            <a style={{ color: "#46797b" }}>
              <Icon
                type="edit"
                style={{ fontSize: 16 }}
                onClick={() => {
                  this.openEditModal(text);
                }}
              />
            </a>
          );
        }
      }
    ];
    return (
      <div className="master">
        <h2 className="master-title">Your List of Clients</h2>
        {modal}
        {editModal}
        <div className="master-table">
          <Table
            bordered
            dataSource={
              this.state.filtered
                ? this.state.searchData
                : this.state.dataSource
            }
            columns={columns}
            pagination={false}
          />
        </div>
        <div className="editable-add-btn">
          <Button onClick={() => this.handleOpenModal()} width="4" color="grey">
            Add Client
          </Button>
        </div>
      </div>
    );
  }
}

//fix the scroll
