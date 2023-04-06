import { faUserPlus } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./stockHoldingAdvFilter.scss"
import {
  Button,
  Form,
  Input,
  Select,
  Slider,
  Tag,
  DatePicker,
  Checkbox,
  AutoComplete,
} from "antd";
import { useEffect } from "react";
import { useState } from "react";

// import { clientFilters } from "./DocConstant";

const StockHoldingAdvFilter = ({
  form,
  filterCs,
  formData,
  toggleDrawer,
  onFinish,
  onValuesChange,
  setFilterFormData,
  advancedFilter,
  controlStructure,
  onCancel,
}) => {
  const updatedKeyList = advancedFilter[3]?.lookupValue.lookUpValues.map(
    ({ name: value, ...rest }) => ({
      value,
      ...rest,
    })
  );
  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    return (
      <Tag
        className="filter-tag"
        color="#5D6DD1"
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  // const onSubmit = (form) => {
  //   const fetchedIssuer = updatedKeyList.find((item) => {
  //     let issuer;
  //     if (item.value === form.fundManager) {
  //       issuer = item.issuer;
  //     }
  //     return issuer;
  //   });
  //   form.fundManager = fetchedIssuer;
  //   onFinish(form);
  // };

  return (
    <Form
      form={form}
      layout="vertical"
      name="filter-form"
      className="filter-form"
      initialValues={formData}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
    >
      <div id="currency" className="field-section">
        <Form.Item name="currency" label="Currency">
          <Select
            className="filter-dropdown"
            size="large"
            mode="multiple"
            tagRender={tagRender}
            placeholder={`Select ${advancedFilter[0]?.fieldLabel}`}
            value={formData.currency}
            filterOption={(input, opt) => {
              return (
                opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
            showSearch
            showArrow
          >
            {advancedFilter[0]?.dropDownValue.map((option, index) => (
              <Select.Option key={index} value={option.dataValue}>
                {option.displayValue}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div id="country" className="field-section">
        <Form.Item name="country" label="Country">
          <Select
            className="filter-dropdown"
            size="large"
            mode="multiple"
            tagRender={tagRender}
            placeholder={`Select ${advancedFilter[1]?.fieldLabel}`}
            value={formData.country}
            filterOption={(input, opt) => {
              return (
                opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
            showSearch
            showArrow
          >
            {advancedFilter[1]?.dropDownValue.map((option, index) => (
              <Select.Option key={index} value={option.dataValue}>
                {option.displayValue}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div id="fundType" className="field-section">
        <Form.Item name="fundType" label="Fund Type">
          <Select
            className="filter-dropdown"
            size="large"
            mode="multiple"
            tagRender={tagRender}
            placeholder={`Select ${advancedFilter[2]?.fieldLabel}`}
            value={formData.fundType}
            filterOption={(input, opt) => {
              return (
                opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
            showSearch
            showArrow
          >
            {advancedFilter[2]?.dropDownValue.map((option, index) => (
              <Select.Option key={index} value={option.dataValue}>
                {option.displayValue}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div id="fundManager" className="field-section">
        <Form.Item name="fundManager" label="Fund Manager">
          <Select
            className="filter-dropdown"
            size="large"
            mode="multiple"
            tagRender={tagRender}
            placeholder={`Select ${advancedFilter[3]?.fieldLabel}`}
            value={formData.fundManager}
            filterOption={(input, opt) => {
              return (
                opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
            showSearch
            showArrow
          >
            {advancedFilter[3]?.lookupValue?.lookUpValues.map(
              (option, index) => (
                <Select.Option key={index} value={option.issuer}>
                  {option.name}
                </Select.Option>
              )
            )}
          </Select>
        </Form.Item>
      </div>
      <div id="fundName" className="field-section">
        <Form.Item name="fundName" label="Fund Name">
          <Select
            className="filter-dropdown"
            size="large"
            mode="multiple"
            tagRender={tagRender}
            placeholder={`Select ${advancedFilter[4]?.fieldLabel}`}
            value={formData.fundName}
            filterOption={(input, opt) => {
              return (
                opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
            showSearch
            showArrow
          >
            {advancedFilter[4]?.lookupValue?.lookUpValues.map(
              (option, index) => (
                <Select.Option key={index} value={option.security}>
                  {option.name}
                </Select.Option>
              )
            )}
          </Select>
        </Form.Item>
      </div>

      {/* <div className="form-btn"> */}
      <div className="" style={{right:"28px", position:"absolute",marginBottom:"6%"}}>
        <Button
          type="text"
          onClick={() => {
            setFilterFormData({
              currency: undefined,
              country: undefined,
              fundType: undefined,
              fundManager: undefined,
              fundName: undefined,
            });
            onCancel();
            toggleDrawer();
          }}
          className="text-only-btn"
        >
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" className="submit-btn">
          Apply
        </Button>
      </div>
    </Form>
  );
};

export default StockHoldingAdvFilter;
