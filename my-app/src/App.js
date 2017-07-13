import React, { Component } from "react";
import "./App.css";
import AgentNavBar from "./AgentNavBar";
import AgentHome from "./AgentHome";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import AgentForm from "./AgentProfile";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  render() {
    console.log("datasource:", this.state.dataSource);
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={AgentHome} />
            <Route path="/profile" component={AgentForm} />
            <Route path="/managelists" component={AgentNavBar} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
