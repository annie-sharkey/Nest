import React, { Component } from "react";

import { Button, Modal, Form, Input, Radio } from "antd";
const FormItem = Form.Item;

export default class AgentEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.editModal,
      //fields: this.props.fields
      agent: this.props.selectedAgent,
      currentCode: "",
      currentName: "",
      currentEmail: "",
      currentPhoneNumber: "",
      currentAgentOffice: ""
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

  handleCancel() {
    this.props.onCancel();
  }

  handleUpdate() {
    var name = this.state.currentName;
    var email = this.state.currentEmail;
    var code = this.state.currentCode;
    var phone = this.state.currentPhoneNumber;
    var office = this.state.currentAgentOffice;
    this.props.onOk(code,name, email,phone,office);
    this.setState({
      currentName: "",
      currentEmail: "",
      currentCode: "",
      currentPhoneNumber: "",
      currentAgentOffice: ""
    });
  }

  handleDeleteClient() {
    this.props.deleteClient();
  }

  render() {
      console.log("agent:", this.state.agent)
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
              defaultValue={this.state.agent.agentName}
            />
          </FormItem>
          <FormItem label="Code">
            <Input
              onChange={e => this.handleCodeChange(e)}
              defaultValue={this.state.agent.agentCode}
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
              onChange={e => this.handlePhoneNumberChange(e)}
              defaultValue={this.state.agent.agentPhoneNumber}
            />
          </FormItem>
          <FormItem label="Agent Office">
            <Input
              onChange={e => this.handleAgentOfficeChange(e)}
              defaultValue={this.state.agent.agentOffice}
            />
          </FormItem>

          <Button onClick={() => this.handleDeleteClient()}>Delete</Button>
        </Form>
      </Modal>
    );
  }
}