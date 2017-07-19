import React, { Component } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import "./App.css";
import axios from "axios";
import { Icon } from "semantic-ui-react";
import { HashRouter as Router, Route, Link } from "react-router-dom";

class AgentProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agent: this.props.agent,
      name: "",
      email: "",
      title: "",
      phone: "",
      office: ""
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
    agent.agentName = this.state.name;
    agent.agentEmail = this.state.email;
    agent.agentPhoneNumber = this.state.phone;
    agent.agentTitle = this.state.title;
    agent.agentOffice = this.state.office;

    axios
      .put("http://localhost:4000/api/agent/" + agent.agentCode, agent)
      .then(response => {
        this.props.updateAgent(response.data);
      });
  }

  render() {
    var agent = this.state.agent;
    return (
      <div>
        <Link to="/">
          <Icon name="home" color="positive" size="huge" />
        </Link>
        <div className="form-container">
          <Form className="form" onSubmit={e => this.handleSubmit(e)}>
            <Form.Input
              className="form-field"
              placeholder="Name"
              label="Name"
              onChange={e => this.handleNameChange(e)}
              width="7"
              defaultValue={agent.agentName}
            />
            <Form.Input
              className="form-field"
              placeholder="Email"
              label="Email"
              onChange={e => this.handleEmailChange(e)}
              width="7"
              defaultValue={agent.agentEmail}
            />
            <Form.Input
              className="form-field"
              placeholder="Title"
              label="Title"
              onChange={e => this.handleTitleChange(e)}
              width="7"
              defaultValue={agent.agentTitle}
            />
            <Form.Input
              className="form-field"
              label="FON Code"
              disabled={true}
              width="7"
              defaultValue={agent.agentCode}
            />
            <Form.Input
              className="form-field"
              defaultValue="111-111-1111"
              label="Phone"
              width="7"
              onChange={e => this.handlePhoneChange(e)}
              defaultValue={agent.agentPhoneNumber}
            />
            <Form.Input
              className="form-field"
              placeholder="Charlottesville"
              label="Office"
              onChange={e => this.handleOfficeChange(e)}
              width="7"
              defaultValue={agent.agentOffice}
            />
          </Form>
        </div>
        <div className="edit-button">
          <Button
            content="Edit"
            onClick={() => this.editInfo()}
            color="black"
          />
        </div>
      </div>
    );
  }
}

export default AgentProfile;
