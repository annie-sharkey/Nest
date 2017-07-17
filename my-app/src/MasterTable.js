import React, { Component } from "react";
import "antd/dist/antd.css";
import { Table, Input, Icon, Button, Popconfirm } from "antd";
import axios from "axios";
// import data from './data';
import ClientForm from "./Form";
import EditForm from "./EditForm";

export default class MasterTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Client Name",
        dataIndex: "clientName",
        key: "clientName",
        width: "25%"
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
        width: "25%"
      },
      {
        title: "Edit",
        dataIndex: "_id",
        key: "_id",
        render: (record, text, index) =>
          <Icon type="edit" onClick={text => this.openEditModal(text)} />
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

  openEditModal(record, index) {
    // console.log(record.clientName);
    this.setState({
      editModal: true,
      selectedClient: record
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
    clientBirthday,
    clientAnniversary
  ) {
    var clientId = this.state.selectedClient._id;
    axios.put("http://localhost:4000/api/clients/" + clientId, {
      clientName: clientName,
      clientAddress: clientAddress,
      clientCity: clientCity,
      clientEmail: clientEmail,
      clientBirthday: clientBirthday,
      homeAnniversary: clientAnniversary
    });
    this.closeEditModal();
    //this.props.handleTableUpdate();
  }

  handleAdd(
    clientName,
    clientAddress,
    clientCity,
    clientEmail,
    clientBirthday,
    clientAnniversary
  ) {
    axios.post("http://localhost:4000/api/clients", {
      clientName: clientName,
      clientAddress: clientAddress,
      clientCity: clientCity,
      clientEmail: clientEmail,
      clientBirthday: clientBirthday,
      homeAnniversary: clientAnniversary,
      agentCode: this.props.agentCode
    });
    this.setState({
      modal: false
    });
    //this.props.handleTableUpdate();
  }

  deleteClient() {
    axios.delete(
      "http://localhost:4000/api/clients/" + this.state.selectedClient._id
    );
    this.setState({
      editModal: false
    });
    this.props.handleTableUpdate();
  }

  componentWillReceiveProps() {
    this.setState({
      dataSource: this.props.dataSource
    });
  }

  render() {
    const rowSelection = {
      onSelect: (record, selected, selectedRows) => {
        console.log(record);
      },
      onSelectAll: selected => {
        console.log(selected);
      }
    };
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
            clientBirthday,
            clientAnniversary
          ) =>
            this.handleAdd(
              clientName,
              clientAddress,
              clientCity,
              clientEmail,
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
            clientBirthday,
            clientAnniversary
          ) =>
            this.updateClient(
              clientName,
              clientAddress,
              clientCity,
              clientEmail,
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
    //console.log("data source:", this.state.dataSource);
    //console.log(this.state.selectedClient);
    //const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div>
        <Button
          className="editable-add-btn"
          onClick={() => this.handleOpenModal()}
        >
          Add
        </Button>
        {modal}
        {editModal}
        <div>
          <Table
            bordered
            dataSource={this.state.dataSource}
            columns={columns}
            pagination={false}
            onRowClick={(record, index) => this.openEditModal(record, index)}
          />
        </div>
      </div>
    );
  }
}

//fix the scroll
