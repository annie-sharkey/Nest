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
import "./CreateCampaignBuildTable.css";
const FormItem = Form.Item;

export default class CreateCampaignBuildTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.props.selectedCampaign.campaignColumns,
      edit: false,
      editedTitle: ""
    //   selectedClient: this.props.selectedClient
    };
  }

  handleInput(event) {
    this.setState({
      ...this.state,
      columnName: event.target.value
    });
  }

  handleNameNewColumn(event) {
    var column = this.state.columnName;
    this.state.columnName = "";
    this.setState({
      ...this.state,
      columns: this.state.columns.concat(column)
    });
    this.props.updateColumnState(this.state.columns.concat(column));
  }

  handleEditColumn(event, title) {
    // this.props.updateColumnState(this.state.columns);
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
      return this.state.editedTitle === column;
    });
    const updateColumn = this.state.columnName;

    const updatedColumns = this.state.columns.slice(0);
    updatedColumns[columnIndex] = updateColumn;

    this.state.columnName = "";

    this.setState({
      edit: false,
      columns: updatedColumns
    });
    this.props.updateColumnState(updatedColumns);
  }

  handleDeleteColumn(title) {
    var columns = this.state.columns.filter(column => {
      return column != title;
    });
    this.setState({
      ...this.state,
      columns: columns
    });
    this.props.updateColumnState(columns);
  }

  // handleAllColumnsComplete(event) {
  //   this.setState({
  //     ...this.state,
  //     done: true
  //   });
  // }

  // handleAllColumnsEdit(event) {
  //   this.setState({
  //     ...this.state,
  //     done: false
  //   });
  // }

  render() {
    console.log("columns child:", this.state.columns);
    return (
      <div>
        <Form>
          <h3>Columns</h3>

          {!this.state.done &&
            <FormItem label="Create a column:" style={{ width: 150 }}>
              <Input
                placeholder="Column Title"
                value={this.state.columnName}
                onChange={event => this.handleInput(event)}
                onPressEnter={event =>
                  this.state.edit
                    ? this.handleResubmitColumn(event)
                    : this.handleNameNewColumn(event)}
              />

              <div>
                {!this.state.edit && <Button onClick={event => this.handleNameNewColumn(event)}>Enter</Button>}
                {this.state.edit &&
                  <Button
                    type="primary"
                    onClick={event => this.handleResubmitColumn(event)}
                  >
                    Resubmit
                  </Button>}
              </div>
            </FormItem>}
{this.state.columns.length < 1 && <div>No Columns</div>}
          {this.state.columns.map(column => {
            return (
              <div>
                {" " + column}
                <div className="columnName">
                  <Icon
                    type="close"
                    onClick={event => this.handleDeleteColumn(column)}
                  />
                  <Icon
                    type={"edit"}
                    onClick={event => this.handleEditColumn(event, column)}
                  />
                </div>
              </div>
            );
          })}
          <br />
        </Form>
      </div>
    );
  }
}
