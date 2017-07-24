import React, { Component } from "react";

import { Button, Modal, Form, Input, Radio } from "antd";
const FormItem = Form.Item;

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.editModal,
      //fields: this.props.fields
      client: this.props.selectedClient,
      currentName: "",
      currentAddress: "",
      currentCity: "",
      currentEmail: "",
      currentState: "",
      currentBirthday: "",
      currentAnniversary: ""
    };
  }

  handleNameChange(e) {
    this.setState({
      currentName: e.target.value
    });
  }

  handleAddressChange(e) {
    this.setState({
      currentAddress: e.target.value
    });
  }

  handleStateChange(e) {
    this.setState({
      currentState: e.target.value
    });
  }

  handleCityChange(e) {
    this.setState({
      currentCity: e.target.value
    });
  }

  handleEmailChange(e) {
    this.setState({
      currentEmail: e.target.value
    });
  }
  handleBirthdayChange(e) {
    this.setState({
      currentBirthday: e.target.value
    });
  }

  handleAnniversaryChange(e) {
    this.setState({
      currentAnniversary: e.target.value
    });
  }
  handleCancel() {
    this.props.onCancel();
  }

  handleUpdate() {
    var name = this.state.currentName;
    var address = this.state.currentAddress;
    var city = this.state.currentCity;
    var birthday = this.state.currentBirthday;
    var email = this.state.currentEmail;
    var state = this.state.currentState;
    var anniversary = this.state.currentAnniversary;
    this.props.onOk(name, address, city, email, state, birthday, anniversary);
    this.setState({
      currentName: "",
      currentAddress: "",
      currentCity: "",
      currentEmail: "",
      currentState: "",
      currentBirthday: "",
      currentAnniversary: ""
    });
  }

  handleDeleteClient() {
    this.props.deleteClient();
  }

  render() {
    return (
      <Modal
        visible={this.state.visible}
        title="Edit Client"
        okText="Update"
        cancelText="Cancel"
        onCancel={() => this.handleCancel()}
        onOk={() => this.handleUpdate()}
      >
        <Form layout="vertical">
          <FormItem label="Name">
            <Input
              onChange={e => this.handleNameChange(e)}
              defaultValue={this.state.client.clientName}
            />
          </FormItem>
          <FormItem label="Address">
            <Input
              onChange={e => this.handleAddressChange(e)}
              defaultValue={this.state.client.clientAddress}
            />
          </FormItem>
          <FormItem label="City">
            <Input
              onChange={e => this.handleCityChange(e)}
              defaultValue={this.state.client.clientCity}
            />
          </FormItem>
          <FormItem label="Email">
            <Input
              onChange={e => this.handleEmailChange(e)}
              defaultValue={this.state.client.clientEmail}
            />
          </FormItem>
          <FormItem label="State">
            <Input
              onChange={e => this.handleStateChange(e)}
              defaultValue={this.state.client.clientState}
            />
          </FormItem>
          <FormItem label="Birthday">
            <Input
              onChange={e => this.handleBirthdayChange(e)}
              defaultValue={this.state.client.clientBirthday}
            />
          </FormItem>
          <FormItem label="Home Anniversary">
            <Input
              onChange={e => this.handleAnniversaryChange(e)}
              defaultValue={this.state.client.homeAnniversary}
            />
          </FormItem>
          <Button onClick={() => this.handleDeleteClient()}>Delete</Button>
        </Form>
      </Modal>
    );
  }
}
