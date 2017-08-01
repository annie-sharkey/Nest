import React, { Component } from "react";
import {
  Form,
  Input,
  Icon,
  Row,
  Col,
  Checkbox,
  Button,
  Card,
  DatePicker,
  Popconfirm,
  Alert,
  message
} from "antd";
import "antd/dist/antd.css";
import CampaignTable from "./CampaignTable";
import CreateCampaignUpload from "./CreateCampaignUpload";
import CreateCampaignBuildTable from "./CreateCampaignBuildTable";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import "./CreateCampaignParent.css";
import axios from "axios";
import { Grid } from "semantic-ui-react";

const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;

const plainOptions = [
  "Asheville",
  "Charlottesville",
  "Fredericksburg",
  "Lake Norman",
  "New River Valley",
  "Richmond",
  "Shenandoah Valley",
  "The Triangle",
  "Wilmington"
];
const defaultCheckedList = [];

export default class CreateCampaignParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      writeColumns: [],
      writeUploads: [],
      campaignTitle: "",
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      done: false,
      agentData: [],
      campaignID: ""
    };
  }

  componentWillMount() {
    axios.get("http://localhost:4000/api/agents/").then(res => {
      this.setState({
        agentData: res.data
      });
    });
  }

  handleCampaignTitle(event) {
    this.setState({
      campaignTitle: event.target.value
    });
  }

  handleStartDate(date) {
    this.setState({
      ...this.state,
      startDate: date._d.toISOString()
    });
    // console.log("start date date._d:", date._d);
  }

  handleEndDate(date) {
    // console.log("handle end date:", date)
    this.setState({
      ...this.state,
      endDate: date._d.toISOString()
    });
    // console.log("end date:", this.state.endDate);
  }

  updateColumnState(columns) {
    this.setState({
      ...this.state,
      writeColumns: columns
    });
    // console.log("write columns:", this.state.writeColumns);
  }

  updateUploadState(uploads) {
    this.setState({
      ...this.state,
      writeUploads: uploads
    });
  }

  WritetoDatabase() {
    // var self = this;
    var id = ""
    this.setState({
      done: true
    });
    axios
      .post("http://localhost:4000/api/campaign/", {
        campaignName: this.state.campaignTitle,
        campaignColumns: this.state.writeColumns,
        clients: [],
        campaignUploads: this.state.writeUploads,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        officesIncludedinCampaign: this.state.checkedList
      })
      .then(res => {
        
        id = res.data._id
      for (var i = 0; i < this.state.agentData.length; i++) {
      if (
        this.state.checkedList.includes(this.state.agentData[i].agentOffice)
      ) {
        // console.log("past campaign:", this.state.agentData[i].pastCampaigns)
        var agentCode = this.state.agentData[i].agentCode;
        var agent = this.state.agentData[i];
        agent.pastCampaigns.push(
          id
        );
        axios.put("http://localhost:4000/api/agent/" + agentCode, agent);
      }
    }
        console.log("res.data._id:", res.data._id)
        // console.log("campaign ID:", this.state.campaignID)
      });
      


   
  }

  // PuttoDatabase(id) {
  //   console.log('entered put to database')
  //   console.log("id:", id)
  //     for (var i = 0; i < this.state.agentData.length; i++) {
  //     if (
  //       this.state.checkedList.includes(this.state.agentData[i].agentOffice)
  //     ) {
  //       // console.log("past campaign:", this.state.agentData[i].pastCampaigns)
  //       var agentCode = this.state.agentData[i].agentCode;
  //       var agent = this.state.agentData[i];
  //       agent.pastCampaigns = this.state.agentData[i].pastCampaigns.push(
  //         id
  //       );
  //       console.log("campaign ID put to database:", id)
  //       console.log("agent", agent)
        
  //       axios.put("http://localhost:4000/api/agent/" + agentCode, agent);
  //     }
  //   }
  // }

  onChange(checkedList) {
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length
    });
  }

  onCheckAllChange(e) {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  }

  render() {
    // console.log("checked list:", this.state.checkedList);
    // console.log("agent data:", this.state.agentData);
    message.config({
      top: 100
    });
    return (
      <div>
        <div>
          <div className="header">
            <Link to="/">
              <Icon
                type="arrow-left"
                style={{ fontSize: 30 }}
                onClick={message.destroy()}
              />
            </Link>
            <h1>Create a Campaign</h1>

            <br />
          </div>

          {!this.state.done &&
            <div className="campaignform">
              <Grid divided="vertically">
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <h3>Campaign</h3>
                    <br />
                    <FormItem style={{ width: 150 }}>
                      <Input
                        placeholder="Title"
                        onChange={event => this.handleCampaignTitle(event)}
                      />
                    </FormItem>
                  </Grid.Column>
                  <Grid.Column>
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
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <div>
                <h3>Select Offices to Include</h3>
                <br />
                <div style={{ borderBottom: "1px solid #E9E9E9" }}>
                  {/*<Checkbox
                    indeterminate={this.state.indeterminate}
                    onChange={e => this.onCheckAllChange()}
                    checked={this.state.checkAll}
                  >
                    Check all
                  </Checkbox>*/}
                </div>
                <br />
                <CheckboxGroup
                  options={plainOptions}
                  value={this.state.checkedList}
                  onChange={e => this.onChange(e)}
                />
              </div>
              <br />
              <br />
              <Form className="createcampaigntables">
                <CreateCampaignBuildTable
                  updateColumnState={columns => this.updateColumnState(columns)}
                />

                <CreateCampaignUpload
                  updateUploadState={uploads => this.updateUploadState(uploads)}
                />
              </Form>

              <br />
              <br />
              <Popconfirm
                title="Are you sure you're finished creating the campaign？"
                okText="Yes"
                cancelText="Keep Editing"
                onConfirm={event => this.WritetoDatabase()}
              >
                <Button type="danger">Finish Creating Campaign</Button>
              </Popconfirm>
              {/*</Card>*/}
            </div>}
          {this.state.done &&
            <div className="successText">
              Campaign successfully created. See Manage Campaigns to edit or
              delete your campaign.
            </div>}
        </div>
      </div>
    );
  }
}
