import React, { Component } from "react";
import "antd/dist/antd.css";
import { Table, Input, Icon, Button, Popconfirm } from "antd";
import axios from "axios";
// import data from './data';
import ClientForm from "./Form";

export default class MasterTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Client Name",
        dataIndex: "clientName",
        width: "25%"
      },
      {
        title: "Client Address",
        dataIndex: "clientAddress",
        width: "25%"
      },
      {
        title: "Client City",
        dataIndex: "clientCity",
        width: "25%"
      },
      {
        title: "Edit",
        dataIndex: "_id",
        key: "_id",
        render: () => <Icon type="edit" />
      }
    ];

    this.state = {
      dataSource: this.props.dataSource,
      count: 2,
      modal: false
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

  handleAdd(clientName, clientAddress, clientCity) {
    axios.post("http://localhost:4000/api/clients", {
      clientName: clientName,
      clientAddress: clientAddress,
      clientCity: clientCity
    });
    this.setState({
      modal: false
    });
  }

  render() {
    var modal;
    if (this.state.modal) {
      modal = (
        <ClientForm
          modal={this.state.modal}
          onCancel={() => {
            this.handleCloseModal();
          }}
          onOk={(clientName, clientAddress, clientCity) =>
            this.handleAdd(clientName, clientAddress, clientCity)}
        />
      );
    }
    console.log("data source:", this.props.dataSource);
    const { dataSource } = this.state;
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
        <Table
          bordered
          dataSource={this.props.dataSource}
          columns={columns}
          pagination={false}
          scroll={{ y: 240 }}
        />
      </div>
    );
  }
}
