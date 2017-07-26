import React, { Component } from "react";

import { Button, Modal, Form, Input, Radio } from "antd";
import { Confirm } from "semantic-ui-react";
const FormItem = Form.Item;

export default class ManageCampaignEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.modal,
      confirm: false,
      name: "",
      address: "",
      city: "",
      email: "",
      state: "",
      birthday: "",
      anniversary: ""
    };
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleStateChange(e) {
    this.setState({
      state: e.target.value
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
    var state = this.state.state;
    var birthday = this.state.birthday;
    var anniversary = this.state.anniversary;
    this.props.onOk(name, address, city, email, state, birthday, anniversary);
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

  showConfirm() {
    this.setState({
      confirm: true
    });
  }

  handleCancelConfirm() {
    this.setState({
      confirm: false
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
        onOk={() => this.showConfirm()}
      >
        <Form layout="vertical">
          <FormItem label="Campaign Title">
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
          <FormItem label="Client State">
            <Input onChange={e => this.handleStateChange(e)} />
          </FormItem>
          <FormItem label="Client Birthday">
            <Input onChange={e => this.handleBirthdayChange(e)} />
          </FormItem>
          <FormItem label="Client Anniversary">
            <Input onChange={e => this.handleAnniversaryChange(e)} />
          </FormItem>
        </Form>
        <Confirm
          open={this.state.confirm}
          content="Are you sure you want to add this client?"
          cancelButton="No"
          confirmButton="Yes"
          onCancel={() => this.handleCancelConfirm()}
          onConfirm={() => this.handleAdd()}
        />
      </Modal>
    );
  }
}
