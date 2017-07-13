import React, { Component } from "react";
import "antd/dist/antd.css";
import { Table, Input, Icon, Button, Popconfirm } from "antd";
import axios from 'axios';
// import data from './data';

class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: false
    };
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }
  check() {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit() {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {editable
          ? <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={e => this.handleChange(e)}
                onPressEnter={() => this.check()}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={() => this.check()}
              />
            </div>
          : <div className="editable-cell-text-wrapper">
              {value || " "}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={() => this.edit()}
              />
            </div>}
      </div>
    );
  }
}

export default class MasterTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Client Name",
        dataIndex: "clientName",
        width: "30%",
        render: (text, record, index) =>
          <EditableCell
            value={text}
            onChange={this.onCellChange(index, "name")}
          />
      },
      {
        title: "Client Address",
        dataIndex: "clientAddress"
      },
      {
        title: "Client City",
        dataIndex: "clientCity"
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record, index) => {
          return this.state.dataSource.length > 1
            ? <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.onDelete(index)}
              >
                <a href="#">Delete</a>
              </Popconfirm>
            : null;
        }
      }
    ];
    this.state = {
      dataSource: this.props.dataSource,
      count: 2
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

  // handleAdd() {
  //   const { count, dataSource } = this.state;
  //   const newData = {
  //     key: count,
  //     name: `Edward King ${count}`,
  //     age: 32,
  //     address: `London, Park Lane no. ${count}`
  //   };
  //   this.setState({
  //     dataSource: [...dataSource, newData],
  //     count: count + 1
  //   });
  // }

  render() {
    console.log("data source:", this.props.dataSource)
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div>
        {/*<Button className="editable-add-btn" onClick={() => this.handleAdd()}>
          Add
        </Button>*/}
        <div>
        <Table bordered dataSource={this.props.dataSource} columns={columns} pagination={false}/>
        </div>
      </div>
    );
  }
}

//fix the scroll
