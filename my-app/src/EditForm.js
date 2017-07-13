import React, { Component } from "react";

import { Button, Modal, Form, Input, Radio } from "antd";
const FormItem = Form.Item;

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.modal,
      fields: this.props.fields
    };
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleAddressChange(e) {
    this.setState({
      address: e.target.value
    });
  }

  handleCityChange(e) {
    this.setState({
      city: e.target.value
    });
  }

  handleCancel() {
    this.props.onCancel();
  }

  handleAdd() {
    var name = this.state.name;
    var address = this.state.address;
    var city = this.state.city;
    this.props.onOk(name, address, city);
  }

  render() {
    return (
      <Modal
        visible={this.state.visible}
        title="Add a Client to Your List"
        okText="Add Client"
        cancelText="Cancel"
        onCancel={() => this.handleCancel()}
        onOk={() => this.handleAdd()}
      >
        <Form layout="vertical">
          <FormItem label="Client Name">
            <Input onChange={e => this.handleNameChange(e)} />
          </FormItem>
          <FormItem label="Client Address">
            <Input onChange={e => this.handleAddressChange(e)} />
          </FormItem>
          <FormItem label="Client City">
            <Input onChange={e => this.handleCityChange(e)} />
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
