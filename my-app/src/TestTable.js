import React, { Component } from "react";
import { Table, Icon } from "antd";
import axios from "axios";

// const columns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     key: "name"
//   },
//   {
//     title: "Age",
//     dataIndex: "age",
//     key: "age"
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//     key: "address"
//   }
// ];

const data = [
  {
    key: "1",
    Name: "John Brown",
    Age: 32,
    Address: "New York No. 1 Lake Park",
    state: "SC"
  },
  {
    key: "2",
    Name: "Jim Green",
    Age: 42,
    Address: "London No. 1 Lake Park",
    state: "VA"
  },
  {
    key: "3",
    Name: "Joe Black",
    Age: 32,
    Address: "Sidney No. 1 Lake Park",
    state: "MD"
  }
];

export default class TestTable extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       columns: [
//         {
//           title: "Name",
//           dataIndex: "name",
//           key: "name"
//         }
//       ]
//     };
//   }

//   handleAdd() {
//     var column = {
//       title: "Age",
//       dataIndex: "age",
//       key: "age"
//     };
//     this.setState({
//       columns: this.state.columns.concat([column])
//     });

//     console.log("entered");
//     console.log("columns:", this.state.columns);
//   }

  render() {
    // console.log("columns:", this.state.columns);
    return (
      <div>
        {/*<button onClick={event => this.handleAdd()}>Add Column</button>*/}
        <Table columns={this.props.columns} dataSource={data} />
      </div>
    );
  }
}
