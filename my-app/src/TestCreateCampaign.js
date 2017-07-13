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
  AutoComplete
} from "antd";
import "antd/dist/antd.css";
import TestTable from "./TestTable";
const FormItem = Form.Item;

export default class TestCreateCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: []
    };
  }

  handleNameNewColumn(event) {
    var column = {
      title: event.target.value,
      dataIndex: event.target.value,
      key: event.target.value
    };
    this.setState({
      ...this.state,
      columns: this.state.columns.concat([column])
    });
    console.log("entered");
  }

  render() {
    return (
        <div>
      <Form>
        <FormItem label="Column Name" style={{ width: 150 }}>
          <Input
            placeholder="Enter Column Name"
            onPressEnter={event => this.handleNameNewColumn(event)}
          />
        </FormItem>
      </Form>
      <TestTable columns={this.state.columns}/>
      </div>
    );
  }
}
