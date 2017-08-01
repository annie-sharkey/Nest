import React, { Component } from "react";
import "./JSONtoExcel.css";
import axios from "axios";

//***Note: to make sure that data is in the right column, if a field is empty, make sure it is set to an empty string instead of not being there at all

export default class JSONtoExcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: [],
      campaignName: this.props.campaignName,
      office: this.props.office,
      selectedCampaignClientIDs: this.props.selectedCampaignClientIDs,
      allClients: [],
      selectedCampaignObjects: []
      // exportData: []
      // officeIDs: []
    };
  }

  componentWillMount() {
    axios.get("http://localhost:4000/api/clients").then(res => {
      this.setState({
        allClients: res.data
      });
    });
    // var selectedCampaignObjects = this.state.allClients.forEach(client => {
    //   this.state.selectedCampaignClientIDs.forEach(ID => {
    //     return ID === client._id;
    //   });
    // });
    // var OfficeObjects = this.state.allClients.map(client).filter(client => )
    // var selectedCampaignObjects = this.state.allClients.filter(client => {
    //   return client === this.state.selectedCampaignClientIDs;
    // });

    // console.log("selected campaign objects:", selectedCampaignObjects);
  }

  handleClick(event) {
    var selectiveData = this.state.selectedCampaignObjects.filter(data => {
      return data.office == this.state.office;
    });
    var data = selectiveData;
    if (data == "") return;

    this.JSONToCSVConvertor(
      data,
      this.state.campaignName + this.state.office,
      true
    );
  }

  JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    var arrData = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;

    var CSV = "";
    //Set Report title in first row or line

    CSV += ReportTitle + "\r\n\n";

    //This condition will generate the Label/Header
    if (ShowLabel) {
      var row = "";

      //This loop will extract the label from 1st index of on array
      for (var index in arrData[0]) {
        //Now convert each value to string and comma-seprated
        row += index + ",";
      }

      row = row.slice(0, -1);

      //append Label row with line break
      CSV += row + "\r\n";
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
      var row = "";

      //2nd loop will extract each column and convert it in string comma-seprated
      for (var index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }

      row.slice(0, row.length - 1);

      //add a line break after each row
      CSV += row + "\r\n";
    }

    if (CSV == "") {
      alert("Invalid data");
      return;
    }

    //Generate a file name
    var fileName = "";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    var uri = "data:text/csv;charset=utf-8," + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  render() {
    // console.log(
    //   "selected campaign client IDs:",
    //   this.state.selectedCampaignClientIDs
    // );

    // console.log("all clients:", this.state.allClients);

    var self = this;
    this.state.allClients.forEach(function(client) {
      if (self.state.selectedCampaignClientIDs.includes(client._id)) {
        self.state.selectedCampaignObjects.push(client);
      }
    });

    console.log(
      "selected campaign objects:",
      this.state.selectedCampaignObjects
    );

    return (
      <div className="mydiv">
        <button className="gen_btn" onClick={event => this.handleClick(event)}>
          Generate File
        </button>
      </div>
    );
  }
}
