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
  AutoComplete
} from "antd";
import { Link } from "react-router-dom";


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class AgentProfile extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 6
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 60 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website =>
      <AutoCompleteOption key={website}>
        {website}
      </AutoCompleteOption>
    );

    return (
      <div>
        <Link to="/">
          <Icon type="arrow-left" style={{ fontSize: 25 }} />
        </Link>

        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="First Name" hasFeedback>
            {getFieldDecorator("name", {
              rules: [
                {
                  type: "first name"
                },
                {
                  required: true,
                  message: "Please input your first name!"
                }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label="Last Name" hasFeedback>
            {getFieldDecorator("name", {
              rules: [
                {
                  type: "last name"
                },
                {
                  required: true,
                  message: "Please input your last name!"
                }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label="Title" hasFeedback>
            {getFieldDecorator("name", {
              rules: [
                {
                  type: "title"
                },
                {
                  required: true
                }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label="E-mail" hasFeedback>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label="E-mail 2" hasFeedback>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label="Password" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.checkConfirm
                }
              ]
            })(<Input type="password" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Confirm Password" hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.checkPassword
                }
              ]
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </FormItem>

          <FormItem {...formItemLayout} label="Phone Number">
            {getFieldDecorator("phone", {
              rules: [
                { required: true, message: "Please input your phone number!" }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label="Website">
            {getFieldDecorator("website", {
              rules: [{ required: true, message: "Please input website!" }]
            })(
              <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
                placeholder="website"
              >
                <Input />
              </AutoComplete>
            )}
          </FormItem>

          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="save" size="large">
              Save
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const AgentForm = Form.create()(AgentProfile);
export default AgentForm;

// import React, { Component } from 'react';

// export default class AgentProfile extends Component {
//     render() {
//         return (
//             <div>

//                 </div>
//         )
//     }
// }
