import React, { Component } from "react";
import "./App.css";
import AgentNavBar from "./AgentNavBar";
import AgentHome from "./AgentHome";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import AdminHome from "./AdminHome";

class App extends Component {
  render() {
    return (
      // <AdminHome />
      <Router>
        <div>
          <Route exact path="/" component={AgentHome} />
          <Route path="/navbar" component={AgentNavBar} />
        </div>
      </Router>
    );
  }
}

export default App;
