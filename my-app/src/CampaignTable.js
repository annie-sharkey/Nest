// import React, { Component } from "react";
// import { Table, Button, Badge, Menu, Dropdown, Icon } from "antd";
// import "antd/dist/antd.css";

// //nested table columns and data
// //expandedRowRender is called inside the table in class NestedTable
// const expandedRowRender = () => {
//   const columns = [
//     { title: "Date", dataIndex: "date", key: "date" },
//     { title: "Name", dataIndex: "name", key: "name" },
//     {
//       title: "Status",
//       key: "state",
//       render: () =>
//         <span>
//           <Badge status="success" />Finished
//         </span>
//     },
//     { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" }
//   ];

//   const data = [];
//   for (let i = 0; i < 3; ++i) {
//     data.push({
//       key: i,
//       date: "2014-12-24 23:12:00",
//       name: "This is production name",
//       upgradeNum: "Upgraded: 56"
//     });
//   }

//   return <Table columns={columns} dataSource={data} pagination={false} />;
// };
// //end NestedTable

// export default class CampaignTable extends Component {
//   state = {
//     selectedRowKeys: [], // Check here to configure the default column
//     loading: false
//   };

//   //select rows
//   start = () => {
//     this.setState({ loading: true });
//     // ajax request after empty completing
//     setTimeout(() => {
//       this.setState({
//         selectedRowKeys: [],
//         loading: false
//       });
//     }, 1000);
//   };
//   onSelectChange = selectedRowKeys => {
//     console.log("selectedRowKeys changed: ", selectedRowKeys);
//     this.setState({ selectedRowKeys });
//   };

//   render() {
//       //columns and data for overall table
//     const columns = [
//       { title: "Name", dataIndex: "name", key: "name" },
//       { title: "Platform", dataIndex: "platform", key: "platform" },
//       { title: "Version", dataIndex: "version", key: "version" },
//       { title: "Upgraded", dataIndex: "upgradeNum", key: "upgradeNum" },
//       { title: "Creator", dataIndex: "creator", key: "creator" },
//       { title: "Date", dataIndex: "createdAt", key: "createdAt" },
//       { title: "Testing", dataIndex: "testing", key: "testing"},
//       { title: "Testing2", dataIndex: "testing2", key: "testing2"},
//       { title: "Testing3", dataIndex: "testing3", key: "testing3"}
//     ];

//     const data = [];
//     for (let i = 0; i < 46; ++i) {
//       data.push({
//         key: i,
//         name: "Screem",
//         platform: "iOS",
//         version: "10.3.4.5654",
//         upgradeNum: 500,
//         creator: "Jack",
//         createdAt: "2014-12-24 23:12:00"
//       });
//     }

//     //select feature
//     //fix select menu
//     const { loading, selectedRowKeys } = this.state;
//     const rowSelection = {
//       selectedRowKeys,
//       onChange: this.onSelectChange,
//       selections: [
//         {
//           key: "all-data",
//           text: "Select All Data",
//           onSelect: () => {
//             this.setState({
//               //this is hard coded: adjust
//               selectedRowKeys: [...Array(46).keys()] // 0...45
//             });
//           }
//         }
//       ]
//     };
//     const hasSelected = selectedRowKeys.length > 0;
//     //end select feature

//     return (
//       <div>
//         <div style={{ marginBottom: 16 }}>
//           <Button
//             type="primary"
//             onClick={this.start}
//             disabled={!hasSelected}
//             loading={loading}
//           >
//             Reload
//           </Button>
//           <span style={{ marginLeft: 8 }}>
//             {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
//           </span>
//         </div>
//         <Table
//           rowSelection={rowSelection}
//           columns={columns}
//           //call to nested table
//           expandedRowRender={expandedRowRender}
//           dataSource={data}
//           scroll={{ x: 1500 }}
//         />
//       </div>
//     );
//   }
// }
