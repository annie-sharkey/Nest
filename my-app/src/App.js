import React, { Component } from "react";
import "./App.css";
import AgentNavBar from "./AgentNavBar";
import AgentHome from "./AgentHome";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import AdminHome from "./AdminHome";
import JSONtoExcel from "./JSONtoExcel";
// import ExceltoJSON from "./ExceltoJSON";
import CampaignTable from "./CampaignTable";
import MasterTable from "./MasterTable";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: []
    }
  }


  componentWillMount() {
    axios.get("http://localhost:4000/api/clients").then(response => {
      // console.log("entered");
      // console.log(response)
      this.setState ({
        dataSource: response.data
      })
    });
    
    
  }

  render() {
    console.log("datasource:", this.state.dataSource)
    return (
      <div >
      <MasterTable dataSource={this.state.dataSource}/>

      </div>
    );
  }
}

export default App;


      // <Router>
      //   <div>
      //     <Route exact path="/" component={AgentHome} />
      //     <Route path="/navbar" component={AgentNavBar} />
      //   </div>
      // </Router>