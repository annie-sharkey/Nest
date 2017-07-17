import React, { Component } from "react";

import { Upload, message, Button, Icon } from "antd";
import { Modal, Form, Input, Radio } from "antd";
const FormItem = Form.Item;

// const props = {
//   name: "file",
//   action: "//jsonplaceholder.typicode.com/posts/",
//   headers: {
//     authorization: "authorization-text"
//   },
// onChange(info) {
//   if (info.file.status !== "uploading") {
//     console.log(info.file, info.fileList);
//   }
//   if (info.file.status === "done") {
//     message.success(`${info.file.name} file uploaded successfully`);
//   } else if (info.file.status === "error") {
//     message.error(`${info.file.name} file upload failed.`);
//   }
// }

export default class AgentUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props: [
        {
          name: "file",
          action: "//jsonplaceholder.typicode.com/posts/",
          headers: {
            authorization: "authorization-text"
          }
        }
      ]
    };
  }

  onChange(info) {
    console.log("onchange entered");
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  render() {
    return (
      <Upload {...this.state.props}>
        <Form>
          <FormItem label="PDF">
            <Button onClick={info => this.onChange(info)}>
              <Icon type="upload" /> Click to Upload
            </Button>
          </FormItem>
        </Form>
      </Upload>
    );
  }
}
