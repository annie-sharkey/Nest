import React, { Component } from "react";
import "./AgentHome.css";
import Nest from "./Nest.png";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import axios from "axios";
import FileInput from "react-file-input";

export default class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: null
    };
  }
  handleChange(e) {
    // this.setState({
    //   selectedFiles: e.target.files
    // });
    let data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("name", e.target.files[0].name);
    //axios.post("http://localhost:4000/api/upload", data);
    console.log(data);
    this.setState({
      file: data,
      name: e.target.files[0].name
    });
  }

  handleSubmit() {
    console.log(this.state.file);
    axios.post("http://localhost:4000/api/upload", this.state.file);
    alert("Data Submitted from " + this.state.name);
  }
  render() {
    return (
      <Router>
        <div className="home-container">
          <div className="centerAdmin">
            <div className="adminLogo">
              <img src={Nest} width={75} />
            </div>
            <div className="buttons">
              <Link to="/createcampaign">
                <div className="spaceAroundButton">
                  <button className="btn">Create a Campaign</button>
                </div>
              </Link>
              <Link to="/managecampaigns">
                <div className="secondbutton">
                  <button className="btn">Manage Campaigns</button>
                </div>
              </Link>
              <Link to="/clientdirectory">
                <div className="secondbutton">
                  <button className="btn">Client Directory</button>
                </div>
              </Link>
              <Link to="/agentdirectory">
                <div className="secondbutton">
                  <button className="btn">Agent Directory</button>
                </div>
              </Link>
              <div className="inputFile">
                <input type="file" onChange={e => this.handleChange(e)} />
                <br />
                <Button type="tiny" onClick={() => this.handleSubmit()}>
                  Submit Agent Data
                </Button>
              </div>
            </div>
          </div>

          <div className="logout">
            <Button color="black" onClick={() => this.props.logOut()}>
              Log Out
            </Button>
          </div>
        </div>
      </Router>
    );
  }
}
