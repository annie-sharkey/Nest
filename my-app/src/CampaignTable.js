import React from "react";
import { Table } from "semantic-ui-react";
import "./App.css";
import { Dropdown, Menu } from "semantic-ui-react";
import axios from "axios";

export default class CampaignTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftData: [],
      rightData: [],
      campaigns: [],
      selectedCampaign: "Not Included",
      columns: []
    };
  }

  componentWillMount() {
    axios.get("http://localhost:4000/api/campaigns").then(res => {
      console.log(res.data[3].campaignColumns);
      this.setState({
        campaigns: res.data,
        columns: res.data[3].campaignColumns,
        leftData: this.props.dataSource
      });
    });
  }

  changeCampaign(e) {
    this.setState({
      selectedCampaign: e.target.value
    });
  }

  render() {
    var columns = this.state.columns.splice(0, 4);
    var cols = columns.map(col => {
      return (
        <Table.HeaderCell>
          {col}
        </Table.HeaderCell>
      );
    });

    var notIncluded = this.state.leftData;
    var data = notIncluded.map(client => {
      return (
        <Table.Row>
          <Table.Cell>
            {client.clientName.split(" ")[0]}
          </Table.Cell>
          <Table.Cell>
            {client.clientName.split(" ")[1]}
          </Table.Cell>
          <Table.Cell>
            {client.clientCity}
          </Table.Cell>
          <Table.Cell>
            {client.clientAddress}
          </Table.Cell>
        </Table.Row>
      );
    });

    console.log(this.state.leftData);

    return (
      <div className="buildCampaign">
        <div className="leftTable">
          <br />
          <div className="left-table-title">
            <h3 className="left-title">
              {" "}{this.state.selectedCampaign}{" "}
            </h3>
          </div>
          <Table basic>
            <Table.Header>
              <Table.Row>
                {cols}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data}
            </Table.Body>
          </Table>
        </div>
        <div className="middle" />
        <div className="rightTable">
          <br />
          <h3> Included </h3>
          <Table basic>
            <Table.Header>
              <Table.Row>
                {cols}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}
