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
    this.columns = [
      {
        title: "Client Name",
        dataIndex: "clientName",
        key: "clientName",
        width: "25%",
        sorter: (a, b) => {
          return this.compareByAlph(a.clientName, b.clientName);
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
    this.state = {
      dataSource: this.props.dataSource,
      count: 2,
      modal: false,
      editModal: false,
      selectedClient: {}
    };
  }

  onCellChange(index, key) {
    return value => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  }
  onDelete(index) {
    const dataSource = [...this.state.dataSource];
    dataSource.splice(index, 1);
    this.setState({ dataSource });
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
    var self = this;
    var data;
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
          onCancel={() => this.closeEditModal()}
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
    const columns = this.columns;
    return (
      <div className="master">
        <div className="editable-add-btn">
          <Button onClick={() => this.handleOpenModal()} width="4" color="grey">
            Add Client
          </Button>
        </div>
        {modal}
        {editModal}
        <div className="master-table">
          <Table
            bordered
            dataSource={this.state.dataSource}
            columns={columns}
            pagination={false}
          />
        </div>
      </div>
    );
  }
}

//fix the scroll
