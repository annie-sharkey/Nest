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
import './CreateCampaignParent.css'
import axios from "axios";

const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;

export default class CreateCampaignParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      writeColumns: [],
      writeUploads: [],
      title: ""
    };
  }

  handleCampaignTitle(event) {
    this.setState({
      campaignTitle: event.target.value
    });
  }

  handleSubmitTitle(event) {
    this.setState({
      title: this.state.campaignTitle
    })
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
  }

  updateColumnState = columns => {
    this.setState({
      ...this.state,
      writeColumns: columns
    });
    console.log("write columns:", columns);
  };

  updateUploadState = uploads => {
    this.setState({
      ...this.state,
      writeUploads: uploads
    });
  };

  WritetoDatabase() {
    var writeColumns = this.state.writeColumns;
    // var columns = []
    // writeColumns.forEach(function(col){
    //   columns.push(col.key)
    // })
    // console.log(columns);
    var name = "cam 2";
    axios
      .post("http://localhost:4000/api/campaign/", {
        campaignName: name,
        campaignColumns: this.state.writeColumns,
        clients: []
      })
      .then(res => {
        console.log(res);
      });
  }

  render() {
    return (
      <div>
        <h1>Create A Campaign</h1>
        <br />
        <Card className="form">
          <Form>
            <h3>Set Campaign Title</h3>
            <br />
            <FormItem style={{ width: 150 }} >
              <Input
                placeholder="Title"
                onChange={event => this.handleCampaignTitle(event)}
                
              />
              <Button onClick={event => this.handleSubmitTitle(event)} type="dashed">Enter</Button>
            </FormItem>
            
            <br />
            <br />
            <h3>Campaign Timeline</h3>
            <br />
            <FormItem>
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
            <CreateCampaignBuildTable
              updateColumnState={this.updateColumnState}
            />
            <br />
            <br />
            <CreateCampaignUpload updateUploadState={this.updateUploadState} />
          </Form>
        </Card>
        <br />
        <br />

        <Button type="danger" onClick={event => this.WritetoDatabase()}>
          Finish Creating Campaign
        </Button>
      </div>
    );
  }
}
