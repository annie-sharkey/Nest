import React, { Component } from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Card, 
  Table,
  Popconfirm
} from "antd";
import "antd/dist/antd.css";
// import TestTable from "./TestTable";
import CampaignTable from "./CampaignTable";
const FormItem = Form.Item;


//create columns cells
class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

export default class CreateCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'Columns',
      dataIndex: 'Columns',
      width: '30%',
      render: (text, record, index) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(index, 'Columns')}
        />
      ),
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
          this.state.dataSource.length > 1 ?
          (
            <Popconfirm title="Are you sure you want to delete?" onConfirm={() => this.onDelete(index)} okText="Delete" cancelText="Cancel">
              <a>Delete</a>
            </Popconfirm>
          ) : null
        );
      },
    }];
    this.state = {
      dataSource: [{
        key: '0',
        name: 'Edward King 0',
        age: '32',
        address: 'London, Park Lane no. 0',
      }, {
        key: '1',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
      }],
      count: 2,
      campaignTableColumns: []
    };
  }
  onCellChange = (index, key) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  }
  onDelete = (index) => {
    const dataSource = [...this.state.dataSource];
    dataSource.splice(index, 1);
    this.setState({ dataSource });
  }


  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: "columns"
    };
    const campaignTableColumns = {
      title: this.state.columns,
      dataIndex: this.state.columns,
      key: this.state.columns
    }
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
      campaignTableColumns: this.state.campaignTableColumns.concat([campaignTableColumns])
    });
    console.log("name:", name)
    console.log("campaign table columns:", campaignTableColumns)
  }
  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    console.log("datasource:", dataSource)
    return (
      <div>
        <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
        <Table bordered dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}



// export default class CreateCampaign extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       columns: [
//         { title: "First Name", dataIndex: "First Name", key: "First Name" },
//         { title: "Last Name", dataIndex: "Last Name", key: "Last Name" },
//         { title: "City", dataIndex: "City", key: "City" },
//         { title: "State", dataIndex: "State", key: "State" }
//       ]
//     };
//   }

//   handleNameNewUpload(event) {
//     var column = {
//       title: event.target.value,
//       dataIndex: event.target.value,
//       key: event.target.value
//     };
//     this.setState({
//       ...this.state,
//       columns: this.state.columns.concat([column])
//     });
//     console.log("entered");
//   }

//   render() {
//     return (
//       <div>
//         <Card title="Create a Campaign">
//           <Form>
//             <FormItem label="Column Name" style={{ width: 150 }}>
//               <Input
//                 placeholder="Enter Column Name"
//                 onPressEnter={event => this.handleNameNewUpload(event)}
//               />
//             </FormItem>
//           </Form>
//         </Card>
//         {/*<CampaignTable columns={this.state.columns} />*/}
//       </div>
//     );
//   }
// }
