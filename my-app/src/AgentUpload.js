import React, { Component } from "react";

import { Upload, Button, Icon, message } from "antd";

import axios from "axios";

export default class AgentUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      uploading: false
    };
  }

  handleUpload() {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("files[]", file);
    });

    this.setState({
      uploading: true
    });

    // You can use any AJAX library you like
    //   axios({
    //     url: "http://localhost:4000/api/upload/",
    //     method: "post",
    //     processData: false,
    //     data: formData,
    //     success: () => {
    //       this.setState({
    //         fileList: [],
    //         uploading: false
    //       });
    //       message.success("upload successfully.");
    //     },
    //     error: () => {
    //       this.setState({
    //         uploading: false
    //       });
    //       message.error("upload failed.");
    //     }
    //   });
    // };

    axios
      .post("http://localhost:4000/api/upload/", {
        uploadedFiles: this.state.fileList
      })
      .then(res => {
        console.log(res);
      });
  }

  render() {
    const { uploading } = this.state;
    const props = {
      action: "http://localhost:4000/api/upload/",
      onRemove: file => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file]
        }));
        return false;
      },
      fileList: this.state.fileList
    };

    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
        <Button
          className="upload-demo-start"
          type="primary"
          onClick={() => this.handleUpload()}
          disabled={this.state.fileList.length === 0}
          loading={uploading}
        >
          {uploading ? "Uploading" : "Start Upload"}
        </Button>
      </div>
    );
  }
}
