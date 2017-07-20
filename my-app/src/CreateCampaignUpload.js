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
import "./CreateCampaignBuildTable.css";
// import TestTable from "./TestTable";
import CampaignTable from "./CampaignTable";
import MediaCenter from './MediaCenter';
const FormItem = Form.Item;

export default class CreateCampaignUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploads: [],
      edit: false,
      // value: "",
      editedTitle: ""
      // done: false
    };
  }

  handleInput(event) {
    this.setState({
      ...this.state,
      uploadName: event.target.value
    });
  }

  handleNameNewUpload(event) {
    var upload = this.state.uploadName;
    this.state.uploadName = "";
    this.props.updateUploadState(this.state.uploads);
    this.setState({
      ...this.state,
      uploads: this.state.uploads.concat(upload)
    });
  }

  handleEditUpload(event, title) {
    // this.props.updateUploadState(this.state.uploads)
    this.setState({
      title: title,
      dataIndex: title,
      key: title,
      edit: true,
      value: title,
      editedTitle: title,
      uploadName: title
    });
  }

  handleResubmitUpload(event, value) {
    const uploadIndex = this.state.uploads.findIndex(upload => {
      return this.state.editedTitle === upload;
    });
    const updateUpload = this.state.uploadName
    const updatedUploads = this.state.uploads.slice(0);
    updatedUploads[uploadIndex] = updateUpload;
    this.state.uploadName = "";
    this.props.updateUploadState(this.state.uploads)
    this.setState({
      edit: false,
      uploads: updatedUploads
    });
  }

  handleDeleteUpload(title) {
    this.props.updateUploadState(this.state.uploads)
    this.setState({
      ...this.state,
      uploads: this.state.uploads.filter(upload => {
        return upload != title;
      })
    });
  }

  // handleAllUploadsComplete(event) {
  //   this.setState({
  //     ...this.state,
  //     done: true
  //   });
  // }

  // handleAllUploadsEdit(event) {
  //   this.setState({
  //     ...this.state,
  //     done: false
  //   });
  // }

  render() {
    // console.log("uploads child:", this.state.uploads)
    // this.props.updateUploadState(this.state.uploads)
    return (
      <div>
        <Form>
          <h3>Uploads</h3>

          {!this.state.done &&
            <FormItem label="Create a new upload:" style={{ width: 150 }}>
              <Input
                placeholder="Upload Title"
                value={this.state.uploadName}
                onChange={event => this.handleInput(event)}
                onPressEnter={event =>
                  this.state.edit
                    ? this.handleResubmitUpload(event)
                    : this.handleNameNewUpload(event)}
              />
              <div>
                {this.state.edit &&
                  <Button
                    type="primary"
                    onClick={event => this.handleResubmitUpload(event)}
                  >
                    Resubmit
                  </Button>}
              </div>
            </FormItem>}
          {/*{this.state.done &&*/}
          {this.state.uploads.length < 1 && <div>No Uploads</div>}

          {this.state.uploads.map(upload => {
            return (
              <div>
                {" " + upload}
                <div className="columnName">
                  <Icon
                    type="close"
                    onClick={event => this.handleDeleteUpload(upload)}
                  />
                  <Icon
                    type={"edit"}
                    onClick={event =>
                      this.handleEditUpload(event, upload)}
                  />
                </div>
              </div>
            );
          })}
          <br />
          {/*{!this.state.done &&
            <Button
              type="dashed"
              onClick={event => {
                this.handleAllUploadsComplete(event);
                this.props.updateUploadState(this.state.uploads);
              }}
            >
              Submit Upload List
            </Button>}*/}
          {/*{this.state.done &&
            <Button
              type="dashed"
              onClick={event => {
                this.handleAllUploadsEdit(event);
              }}
            >
              Edit Upload List
            </Button>}*/}
            <MediaCenter uploadList={this.state.uploads}/>
            
        </Form>
      </div>
    );
  }
}
