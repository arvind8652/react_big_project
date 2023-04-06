import React, { useState } from "react";

import "antd/dist/antd.css";
// import "./index.css";
import { Input, Select, DatePicker, Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faExclamationCircle } from "@fortawesome/pro-solid-svg-icons";

const initialType = "password";
const initialValue = "Enter Text";
const initialError = "No Error";
const GenericInput = ({
  type = initialType,
  onChange,
  label = "Input Label",
  value = initialValue,
  errorMsg = initialError
}) => {
  const { Option } = Select;

  const options = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      children: [
        {
          value: "hangzhou",
          label: "Hangzhou",
          children: [
            {
              value: "xihu",
              label: "West Lake"
            }
          ]
        }
      ]
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      children: [
        {
          value: "nanjing",
          label: "Nanjing",
          children: [
            {
              value: "zhonghuamen",
              label: "Zhong Hua Men"
            }
          ]
        }
      ]
    }
  ];
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const renderInputField = (type, initialValue, errorMsg) => {
    switch (type) {
      case "text":
        return (
          <Input
            className="fieldInput"
            type="text"
            value={initialValue}
            style={
              errorMsg && errorMsg !== ""
                ? {
                    border: "1px solid #931F2A",
                    boxSizing: "border-box",
                    borderradius: 4
                  }
                : {}
            }
          />
        );
      case "password":
        return (
          //   <Space direction="vertical">
          <Input.Password
            placeholder="input password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          //   </Space>
        );
      case "date":
        return <DatePicker />;
      case "contact":
        return (
          <Input.Group compact>
            <Select defaultValue="Zhejiang">
              <Option value="Zhejiang">Zhejiang</Option>
              <Option value="Jiangsu">Jiangsu</Option>
            </Select>
            <Input defaultValue="Xihu District, Hangzhou" />
          </Input.Group>
        );
      case "social":
        return (
          <Input.Group compact>
            <Input style={{ width: "20%" }} defaultValue="0571" />
            <Input style={{ width: "30%" }} defaultValue="26888888" />
          </Input.Group>
        );
      default:
        return "";
    }
  };

  return (
    <>
      <div className="field">
        <label htmlFor="userId" className="fieldLabel">
          {label}
        </label>
        {type === "password" && (
          <NavLink to="/forgotPassword" className="forgotPassword">
            Forgot Password
          </NavLink>
        )}
        <Form.Item name="userId">
          {renderInputField(type, value, errorMsg)}
        </Form.Item>
        {errorMsg && (
          <div className="errorMsg">
            {/* <FontAwesomeIcon
            icon={faExclamationCircle}
            style={{ color: "#931f2a", marginRight: 8 }}
          /> */}
            {errorMsg}
          </div>
        )}
      </div>
    </>
  );
};
export default GenericInput;
