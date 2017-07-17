import React, { Component } from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Card,
  Table,
  Popconfirm
} from "antd";
import "antd/dist/antd.css";
// import TestTable from "./TestTable";
import CampaignTable from "./CampaignTable";
import CreateCampaignUpload from "./CreateCampaignUpload";
const FormItem = Form.Item;

export default class CreateCampaignBuildTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "First Name", dataIndex: "First Name", key: "First Name" },
        { title: "Last Name", dataIndex: "Last Name", key: "Last Name" },
        { title: "City", dataIndex: "City", key: "City" },
        { title: "State", dataIndex: "State", key: "State" }
      ],
      edit: false,
      // value: "",
      editedTitle: ""
    };
  }

  handleInput(event) {
    this.setState({
      ...this.state,
      columnName: event.target.value
    });
  }

  handleNameNewColumn(event) {
    var column = {
      title: this.state.columnName,
      dataIndex: this.state.columnName,
      key: this.state.columnName
    };
    this.state.columnName = "";

    this.setState({
      ...this.state,
      columns: this.state.columns.concat([column])
    });
  }

  handleEditColumn(event, title) {
    // const column = this.state.columns.find(column => title === column.title);
    // event.target.value = title;
    this.setState({
      title: title,
      dataIndex: title,
      key: title,
      edit: true,
      value: title,
      editedTitle: title,
      columnName: title
    });
  }

  handleResubmitColumn(event, value) {
    const columnIndex = this.state.columns.findIndex(column => {
      return this.state.editedTitle === column.title;
    });
    const updateColumn = {
      title: this.state.columnName,
      dataIndex: this.state.columnName,
      key: this.state.columnName
    };
    const updatedColumns = this.state.columns.slice(0);
    updatedColumns[columnIndex] = updateColumn;
    this.state.columnName = "";

    this.setState({
      edit: false,
      columns: updatedColumns
    });
  }

  handleDeleteColumn(title) {
    this.setState({
      ...this.state,
      columns: this.state.columns.filter(column => {
        return column.title != title;
      })
    });
  }

  render() {
    return (
      <div>
          <Form>
            <FormItem label="Create a new column:" style={{ width: 150 }}>
              <Input
                value={this.state.columnName}
                onChange={event => this.handleInput(event)}
                onPressEnter={event =>
                  this.state.edit
                    ? this.handleResubmitColumn(event)
                    : this.handleNameNewColumn(event)}
              />
              <div>
                {this.state.edit &&
                  <Button
                    type="primary"
                    onClick={event => this.handleResubmitColumn(event)}
                  >
                    Resubmit
                  </Button>}
              </div>
            </FormItem>
            {this.state.columns.map(column => {
              return (
                <div>
                  <Icon
                    type="close"
                    onClick={event => this.handleDeleteColumn(column.title)}
                  />
                  <Icon
                    type={"edit"}
                    onClick={event =>
                      this.handleEditColumn(event, column.title)}
                  />
                  {" " + column.title}
                </div>
              );
            })}
          </Form>
        

      </div>
    );
  }
}