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
  message,
  Table,
  Modal
} from "antd";
import "antd/dist/antd.css";
import CampaignTable from "./CampaignTable";
// import CreateCampaignUpload from "./CreateCampaignUpload";
// import CreateCampaignBuildTable from "./CreateCampaignBuildTable";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import "./CreateCampaignParent.css";
import axios from "axios";
import { Grid } from "semantic-ui-react";
import moment from "moment";
import EditBuildTable from "./EditBuildTable";
// import EditUploadTable from "./EditUploadTable";
import JSONtoExcel from './JSONtoExcel';

const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const dateFormat = "MM/DD/YYYY";

const plainOptions = [
  "Asheville",
  "Charlottesville",
  "Fredericksburg",
  "New River Valley",
  "Richmond",
  "Shenandoah Valley",
  "Wilmington"
];
// const defaultCheckedList = [
//   this.state.selectedCampaign.officesIncludedinCampaign
// ];
export default class ManageCampaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      openModal: false,
      selectedCampaign: {},
      campaignName: "",
      checkedList: [],
      writeColumns: [],
      writeUploads: [],
      openExportDataModal: false
    };
  }

  componentWillMount() {
    var date = moment(this.state.selectedCampaign.startDate).format(
      "MM/DD/YYYY"
    );
    console.log(date);
    // console.log("selected campaign", this.state.selectedCampaign.startDate)
    axios.get("http://localhost:4000/api/campaigns").then(res => {
      this.setState({
        data: res.data
      });
    });
  }

  handleCampaignTitle(event) {
    this.setState({
      campaignName: event.target.value
    });
  }

  handleStartDate(date) {
    this.setState({
      ...this.state,
      startDate: date._d.toISOString()
    });
  }

  handleEndDate(date) {
    this.setState({
      ...this.state,
      endDate: date._d.toISOString()
    });
  }

  deleteCampaign(id) {
    axios.delete("http://localhost:4000/api/campaigns/" + id);
  }

  handleOpenModal(text) {
    this.setState({
      openModal: true,
      selectedCampaign: text
    });
  }

  handleOpenExportDataModal(text) {
    this.setState({
      openExportDataModal: true,
      selectedCampaign: text
    });
  }

  handleCancel(event) {
    this.setState({
      openModal: false,
      openExportDataModal: false
    });
  }

  handleDone(event) {
    this.setState({
      openExportDataModal: false
    })
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

  onChange(checkedList) {
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length
    });
  }

  WritetoDatabase() {
    axios
      .put(
        "http://localhost:4000/api/campaigns/" +
          this.state.selectedCampaign._id,
        {
          campaignName: this.state.campaignName,
          campaignColumns: this.state.writeColumns,
          clients: [],
          campaignUploads: this.state.writeUploads,
          startDate: this.state.startDate,
          endDate: this.state.endDate,
          officesIncludedinCampaign: this.state.checkedList
        }
      )
      .then(res => {
        console.log(res.data);
      });
  }

  render() {
    // console.log("selected campaign text:", this.state.selectedCampaign)

    const columns = [
      {
        title: "Campaign Title",
        dataIndex: "campaignName",
        key: "campaignName"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) =>
          <span>
            <a onClick={() => this.handleOpenModal(text)}>Edit</a>
            <span className="ant-divider" />
            <Popconfirm
              title="Are you sure you want to delete this entire campaign?"
              okText="Yes"
              cancelText="Do not delete"
              onConfirm={() => this.deleteCampaign(text._id)}
            >
              <a>Delete Campaign</a>
            </Popconfirm>
            <span className="ant-divider" />
            <a onClick={() => this.handleOpenExportDataModal(text)}>
              Export Data
            </a>
          </span>
      }
    ];
    return (
      <div>
        <div className="header">
          <Link to="/">
            <Icon type="arrow-left" style={{ fontSize: 30 }} />
          </Link>
          <h1>Manage Campaigns</h1>
          <br />
        </div>
        <Table columns={columns} dataSource={this.state.data} />

        {this.state.openModal &&
          <div>
            <Modal
              visible={true}
              onCancel={event => this.handleCancel(event)}
              onOk={() => this.WritetoDatabase()}
            >
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
                          defaultValue={
                            this.state.selectedCampaign.campaignName
                          }
                        />
                      </FormItem>
                    </Grid.Column>
                    <Grid.Column>
                      <h3>Campaign Timeline</h3>
                      <br />
                      <FormItem>
                        <DatePicker
                          placeholder="Start date"
                          format={dateFormat}
                          onChange={event => this.handleStartDate(event)}
                          defaultValue={moment(
                            this.state.selectedCampaign.startDate
                          )}
                          
                        />
                        <DatePicker
                          placeholder="End date"
                          format="MM/DD/YYYY"
                          onChange={event => this.handleEndDate(event)}
                          defaultValue={moment(
                            this.state.selectedCampaign.endDate
                          )}
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
                      onChange={this.onCheckAllChange}
                      checked={this.state.checkAll}
                    >
                      Check all
                    </Checkbox>*/}
                  </div>
                  <br />
                  <CheckboxGroup
                    options={plainOptions}
                    defaultValue={
                      this.state.selectedCampaign.officesIncludedinCampaign
                    }
                    onChange={checkedList => this.onChange(checkedList)}
                  />
                </div>
                <br />
                <br />
                <Form className="createcampaigntables">
                  <EditBuildTable
                    updateColumnState={columns =>
                      this.updateColumnState(columns)}
                    selectedCampaign={this.state.selectedCampaign}
                  />

                  {/*<EditUploadTable
                    updateUploadState={uploads =>
                      this.updateUploadState(uploads)}
                    selectedCampaign={this.state.selectedCampaign}
                  />*/}
                </Form>
              </div>
            </Modal>
          </div>}

        {this.state.openExportDataModal &&
          <Modal visible={true} onCancel={event => this.handleCancel(event)} okText="Done" onOk={event => this.handleDone(event)}>
            <div>
              {this.state.selectedCampaign.officesIncludedinCampaign.map(office => {
                return (
                  <div>
                    {office}
                    <JSONtoExcel office={office} campaignName={this.state.selectedCampaign.campaignName} selectedCampaignObject={this.state.selectedCampaign}/>
                    
                  </div>
                );
              })}
            </div>
          </Modal>}
      </div>
    );
  }
}
