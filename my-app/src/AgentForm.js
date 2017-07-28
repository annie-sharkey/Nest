import React, { Component } from "react";

import { Button, Modal, Form, Input, Radio } from "antd";
import { Confirm } from "semantic-ui-react";
const FormItem = Form.Item;

export default class AgentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.modal,
      //fields: this.props.fields

      currentCode: "",
      currentName: "",
      currentEmail: "",
      currentTitle: "",
      currentPhoneNumber: "",
      currentAgentOffice: "",
      confirm: false
    };
  }

  handleNameChange(e) {
    this.setState({
      currentName: e.target.value
    });
  }

  handleEmailChange(e) {
    this.setState({
      currentEmail: e.target.value
    });
  }

  handleCodeChange(e) {
    this.setState({
      currentCode: e.target.value
    });
  }
  handlePhoneNumberChange(e) {
    this.setState({
      currentPhoneNumber: e.target.value
    });
  }

  handleAgentOfficeChange(e) {
    this.setState({
      currentAgentOffice: e.target.value
    });
  }

  handleTitleChange(e) {
    this.setState({
      currentTitle: e.target.value
    });
  }

  handleCancel() {
    this.props.onCancel();
  }

  handleAdd() {
    var name = this.state.currentName;
    var email = this.state.currentEmail;
    var title = this.state.currentTitle;
    var code = this.state.currentCode;
    var phone = this.state.currentPhoneNumber;
    var office = this.state.currentAgentOffice;
    this.props.onOk(code, name, email, title, phone, office);
    this.setState({
      currentName: "",
      currentEmail: "",
      currentTitle: "",
      currentCode: "",
      currentPhoneNumber: "",
      currentAgentOffice: "",
      confirm: false
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
        title="Add Agent"
        okText="Add"
        cancelText="Cancel"
        onCancel={() => this.handleCancel()}
        onOk={() => this.showConfirm()}
      >
        <Form layout="vertical">
          <FormItem label="Name">
            <Input onChange={e => this.handleNameChange(e)} />
          </FormItem>
          <FormItem label="Code">
            <Input onChange={e => this.handleCodeChange(e)} />
          </FormItem>
          <FormItem label="Email">
            <Input onChange={e => this.handleEmailChange(e)} />
          </FormItem>
          <FormItem label="Title">
            <Input onChange={e => this.handleTitleChange(e)} />
          </FormItem>
          <FormItem label="Phone Number">
            <Input onChange={e => this.handlePhoneNumberChange(e)} />
          </FormItem>
          <FormItem label="Agent Office">
            <Input onChange={e => this.handleAgentOfficeChange(e)} />
          </FormItem>
        </Form>
        <Confirm
          open={this.state.confirm}
          content="Are you sure you want to add this agent?"
          cancelButton="No"
          confirmButton="Yes"
          onCancel={() => this.handleCancelConfirm()}
          onConfirm={() => this.handleAdd()}
        />
      </Modal>
    );
  }
}
