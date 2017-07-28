import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Radio } from "antd";
import { Confirm } from "semantic-ui-react";
const FormItem = Form.Item;

export default class EditProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.editModal,
      name: null,
      email: null,
      title: null,
      phone: null,
      office: null,
      agent: this.props.agent,
      confirm: false
    };
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  handlePhoneChange(e) {
    this.setState({
      phone: e.target.value
    });
  }

  handleOfficeChange(e) {
    this.setState({
      office: e.target.value
    });
  }

  editInfo() {
    var agent = this.state.agent;
    console.log(agent);
    agent.agentName = this.state.name || agent.agentName;
    agent.agentEmail = this.state.email || agent.agentEmail;
    agent.agentPhoneNumber = this.state.phone || agent.agentPhoneNumber;
    agent.agentTitle = this.state.title || agent.agentTitle;
    agent.agentOffice = this.state.office || agent.agentOffice;
    this.props.onOk(agent);
    this.handleCancel();
  }

  showConfirm() {
    this.setState({
      confirm: true
    });
  }

  handleCancel() {
    this.setState({
      confirm: false
    });
  }

  render() {
    return (
      <Modal
        visible={this.state.visible}
        title="Edit Your Information"
        okText="Update"
        cancelText="Cancel"
        onCancel={() => this.props.onCancel()}
        onOk={() => this.showConfirm()}
      >
        <Form layout="vertical">
          <FormItem label="Name">
            <Input
              onChange={e => this.handleNameChange(e)}
              defaultValue={this.state.agent.agentName}
            />
          </FormItem>
          <FormItem label="Email">
            <Input
              onChange={e => this.handleEmailChange(e)}
              defaultValue={this.state.agent.agentEmail}
            />
          </FormItem>
          <FormItem label="Phone Number">
            <Input
              onChange={e => this.handlePhoneChange(e)}
              defaultValue={this.state.agent.agentPhoneNumber}
            />
          </FormItem>
          <FormItem label="Title">
            <Input
              onChange={e => this.handleTitleChange(e)}
              defaultValue={this.state.agent.agentTitle}
            />
          </FormItem>
          <FormItem label="Office">
            <Input
              onChange={e => this.handleOfficeChange(e)}
              defaultValue={this.state.agent.agentOffice}
            />
          </FormItem>
        </Form>
        <Confirm
          open={this.state.confirm}
          content="Are you sure you want to make these edits?"
          cancelButton="No"
          confirmButton="Yes"
          onCancel={() => this.handleCancel()}
          onConfirm={() => this.editInfo()}
        />
      </Modal>
    );
  }
}
