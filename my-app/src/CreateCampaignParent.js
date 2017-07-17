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
  Popconfirm,
  DatePicker
} from "antd";
import "antd/dist/antd.css";
// import TestTable from "./TestTable";
import CampaignTable from "./CampaignTable";
import CreateCampaignUpload from "./CreateCampaignUpload";
import CreateCampaignBuildTable from "./CreateCampaignBuildTable";
const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;

export default class CreateCampaignParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: ""
    };
  }

  handleStartDate(date) {
    this.setState({
      ...this.state,
      startDate: date._d
    });
  }

  handleEndDate(date) {
    this.setState({
      ...this.state,
      endDate: date._d
    });
    console.log("entered")

  }
  render() {
    console.log("start date:", this.state.startDate)
    console.log("end date:", this.state.endDate)
    return (
      <div>
        <Card title="Create a Campaign">
          <Card>
            <Form>
              <FormItem label="Campaign timeline:">
                <DatePicker
                  placeholder="Start date"
                  format="MM/DD/YYYY"
                  onChange={event => this.handleStartDate(event)}
                />

                <DatePicker
                  placeholder="End date"
                  format="MM/DD/YYYY"
                  onChange={event => this.handleEndDate(event)}
                />
              </FormItem>
            </Form>
          </Card>

          <Card>
            <CreateCampaignBuildTable />
          </Card>
          <Card>
            <CreateCampaignUpload />
          </Card>
          <br />
          <br />
          <Button type="primary">Finish Creating Campaign</Button>
        </Card>
      </div>
    );
  }
}
