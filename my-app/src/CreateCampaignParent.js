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
  DatePicker
} from "antd";
import "antd/dist/antd.css";
// import TestTable from "./TestTable";
import CampaignTable from "./CampaignTable";
import CreateCampaignUpload from "./CreateCampaignUpload";
import CreateCampaignBuildTable from "./CreateCampaignBuildTable";
import "./CreateCampaignParent.css";
import axios from "axios";
import { Grid } from "semantic-ui-react";

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
      campaignTitle: ""
    };
  }

  handleCampaignTitle(event) {
    this.setState({
      campaignTitle: event.target.value
    });
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
    // console.log("write columns:", this.state.writeColumns);
  };

  updateUploadState = uploads => {
    this.setState({
      ...this.state,
      writeUploads: uploads
    });
  };

  WritetoDatabase() {
    console.log(this.state.writeUploads);
    axios
      .post("http://localhost:4000/api/campaign/", {
        campaignName: this.state.campaignTitle,
        campaignColumns: this.state.writeColumns,
        clients: [],
        campaignUploads: this.state.writeUploads,
        startDate: this.state.startDate,
        endDate: this.state.endDate
      })
      .then(res => {
        console.log(res.data);
      });
  }

  render() {
    // console.log("write columns:", this.state.writeColumns)
    // console.log("write uploads parent:", this.state.writeUploads);
    // console.log("write columns parent:", this.state.writeColumns);
    return (
      <div>
        <Card width={100}>
          <h1>Create A Campaign</h1>
          <br />
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

          <Form>
            <CreateCampaignBuildTable
              updateColumnState={this.updateColumnState}
            />
            <br />
            <br />
            <CreateCampaignUpload updateUploadState={this.updateUploadState} />
          </Form>

          <br />
          <br />

          <Button type="danger" onClick={event => this.WritetoDatabase()}>
            Finish Creating Campaign
          </Button>
        </Card>
      </div>
    );
  }
}
