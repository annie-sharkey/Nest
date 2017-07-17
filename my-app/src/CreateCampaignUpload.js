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
const FormItem = Form.Item;

export default class CreateCampaignUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploads: [],
      edit: false,
      // value: "",
      editedTitle: ""
    };
  }

  handleInput(event) {
    this.setState({
      ...this.state,
      uploadName: event.target.value
    });
  }

  handleNameNewUpload(event) {
    var upload = {
      title: this.state.uploadName,
      dataIndex: this.state.uploadName,
      key: this.state.uploadName
    };
    this.state.uploadName = "";

    this.setState({
      ...this.state,
      uploads: this.state.uploads.concat([upload])
    });
  }

  handleEditUpload(event, title) {
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
      return this.state.editedTitle === upload.title;
    });
    const updateUpload = {
      title: this.state.uploadName,
      dataIndex: this.state.uploadName,
      key: this.state.uploadName
    };
    const updatedUploads = this.state.uploads.slice(0);
    updatedUploads[uploadIndex] = updateUpload;
    this.state.uploadName = "";

    this.setState({
      edit: false,
      uploads: updatedUploads
    });
  }

  handleDeleteUpload(title) {
    this.setState({
      ...this.state,
      uploads: this.state.uploads.filter(upload => {
        return upload.title != title;
      })
    });
  }

  render() {
    return (
      <div>
      
          <Form>
            <FormItem label="Create a new upload:" style={{ width: 150 }}>
              <Input
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
            </FormItem>
            {this.state.uploads.map(upload => {
              return (
                <div>
                  <Icon
                    type="close"
                    onClick={event => this.handleDeleteUpload(upload.title)}
                  />
                  <Icon
                    type={"edit"}
                    onClick={event =>
                      this.handleEditUpload(event, upload.title)}
                  />
                  {" " + upload.title}
                </div>
              );
            })}
          </Form>
      </div>
    );
  }
}
