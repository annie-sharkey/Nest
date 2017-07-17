import React, { Component } from "react";

import { Button, Modal, Form, Input, Radio } from "antd";
const FormItem = Form.Item;

export default class ClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.modal,
      name: "",
      address: "",
      city: "",
      email: "",
      birthday: "",
      anniversary: ""
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

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  handleBirthdayChange(e) {
    this.setState({
      birthday: e.target.value
    });
  }

  hanldeAnniversaryChange(e) {
    this.setState({
      anniversary: e.target.value
    });
  }

  handleCancel() {
    this.props.onCancel();
  }

  handleAdd() {
    var name = this.state.name;
    var address = this.state.address;
    var city = this.state.city;
    var email = this.state.email;
    var birthday = this.state.birthday;
    var anniversary = this.state.anniversary;
    this.props.onOk(name, address, city, email, birthday, anniversary);
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  handleBirthdayChange(e) {
    this.setState({
      birthday: e.target.value
    });
  }

  handleAnniversaryChange(e) {
    this.setState({
      anniversary: e.target.value
    });
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
          <FormItem label="Client Email">
            <Input onChange={e => this.handleEmailChange(e)} />
          </FormItem>
          <FormItem label="Client Birthday">
            <Input onChange={e => this.handleBirthdayChange(e)} />
          </FormItem>
          <FormItem label="Client Anniversary">
            <Input onChange={e => this.handleAnniversaryChange(e)} />
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
