import React from "react";
import { Table } from "semantic-ui-react";
import "./App.css";
import { Dropdown, Menu, Icon } from "semantic-ui-react";
import axios from "axios";

export default class CampaignTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftData: [],
      rightData: [],
      campaigns: [],
      currentCampaign: "Not Included",
      columns: []
    };
  }

  componentWillMount() {
    axios.get("http://localhost:4000/api/campaigns").then(res => {
      var last = res.data.length - 1;
      this.setState({
        campaigns: res.data,
        columns: res.data[last].campaignColumns,
        leftData: this.props.dataSource,
        currentCampaign: res.data[last].campaignName
      });
    });
  }

  handleClick(client, columns) {
    var included = this.state.rightData;
    included.push(client);
    console.log(included);
    this.setState({
      ...this.state,
      rightData: included,
      columns: columns
    });
  }

  render() {
    var columns = this.state.columns.splice(0, 3);
    columns.push("Select");
    var cols = columns.map(col => {
      return (
        <Table.HeaderCell>
          {col}
        </Table.HeaderCell>
      );
    });

    var notIncluded = this.state.leftData;
    var self = this;
    var data = notIncluded.map(client => {
      return (
        <Table.Row>
          <Table.Cell>
            {client.clientName}
          </Table.Cell>
          <Table.Cell>
            {client.clientCity}
          </Table.Cell>
          <Table.Cell>
            {client.clientAddress}
          </Table.Cell>
          <Table.Cell>
            <a onClick={() => self.handleClick(client, columns)}>
              <Icon name="check" />
            </a>
          </Table.Cell>
        </Table.Row>
      );
    });

    var included = this.state.rightData;
    console.log(included);
    var rightData;
    if (included.length != 0) {
      rightData = included.map(client => {
        return (
          <Table.Row>
            <Table.Cell>
              {client.clientName}
            </Table.Cell>
            <Table.Cell>
              {client.clientCity}
            </Table.Cell>
            <Table.Cell>
              {client.clientAddress}
            </Table.Cell>
            <Table.Cell>
              <Icon name="erase" />
            </Table.Cell>
          </Table.Row>
        );
      });
    }

    return (
      <div className="campaignPage">
        <h2>
          {" "}{this.state.currentCampaign}{" "}
        </h2>
        <div className="buildCampaign">
          <div className="leftTable">
            <br />
            <div className="left-table-title">
              <h3 className="left-title">Not Included</h3>
            </div>
            <Table selectable>
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
            <Table selectable>
              <Table.Header>
                <Table.Row>
                  {cols}
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {rightData}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
