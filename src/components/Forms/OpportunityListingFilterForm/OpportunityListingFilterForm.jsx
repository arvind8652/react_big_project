import { faUserPlus } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Select, Slider, Tag, Checkbox } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import {
  ScInputNumber,
  ScRangePicker,
} from "../../StyledComponents/formElements";

const OpportunityListingFilterForm = ({
  form,
  filterCs,
  formData,
  toggleDrawer,
  onFinish,
  onValuesChange,
  setFilterFormData,
  setFormData
}) => {
 
  const dateFormat = "DD-MM-YYYY";
  const [reset, setReset] = useState(1)
  const tagNameCheckboxOptions = ["Prospect", "Client"];
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
  return (
    <Form
      // form={form}
      layout="vertical"
      name="filter-form"
      className="filter-form"
      initialValues={formData}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      key={reset}
    >
      <div id="searchName" className="field-section">
        <Form.Item label="Search" name="searchName">
          <Input
            className="field"
            type="text"
            value={formData.firstName}
            placeholder="Search by client/ prospect name"
            suffix={
              <FontAwesomeIcon
                icon={faUserPlus}
                style={{ margin: "0 0 0 auto" }}
              />
            }
          />
        </Form.Item>
      </div>
      <div id="tagName" className="field-section">
        <Form.Item name="tagName" label="Type">
          <Checkbox.Group
            options={tagNameCheckboxOptions}
            value={formData.tagName}
            onChange={(value) => {
              console.log(value);
            }}
          />
        </Form.Item>
      </div>
      <div id="stage" className="field-section">
        <Form.Item name="stage" label="Stage">
          <Select
            className="filter-dropdown"
            size="large"
            mode="multiple"
            tagRender={tagRender}
            placeholder="Select Stage"
            value={formData.category}
            filterOption={(input, opt) => {
              return (
                opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
            showSearch
            showArrow
          >
            {filterCs &&
              filterCs.Stage &&
              filterCs.Stage.dropDownValue.map((option) => (
                <Select.Option
                  key={option.dataValue}
                  value={option.displayValue}
                >
                  {option.displayValue}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </div>
      <div id="type" className="field-section">
        <Form.Item name="type" label="Type">
          {/* <Checkbox.Group
            options={typeCheckboxOptions}
            value={formData.type}
            onChange={(value) => {
            }}
          /> */}
          <Select
            className="filter-dropdown"
            size="large"
            mode="multiple"
            tagRender={tagRender}
            placeholder="Select Type"
            value={formData.category}
            filterOption={(input, opt) => {
              return (
                opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
            showSearch
            showArrow
          >
            {filterCs &&
              filterCs.OpportunityType &&
              filterCs.OpportunityType.dropDownValue.map((option) => (
                <Select.Option
                  key={option.dataValue}
                  value={option.displayValue}
                >
                  {option.displayValue}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </div>
      <div id="targetAmountRange" className="field-section">
        <Form.Item label="Target Amount" name="targetAmountRange">
          <Slider
            className="amount-range-slider"
            min={0}
            max={10000000}
            // onChange={this.onChange}
            range={true}
            // defaultValue={formData.targetAmountRange}
            value={formData.targetAmountRange}
          />
        </Form.Item>
        <div className="target-range-input-fields">
          <Form.Item name="targetAmountMin">
            <ScInputNumber
              min={0}
              // className="target-amount-range-input"
              // max={10000}
              // defaultValue={
              //   formData.targetAmountRange && formData.targetAmountRange[0]
              // }
              value={
                formData.targetAmountRange && formData.targetAmountRange[0]
              }
            // onChange={onChangeMin}
            />
          </Form.Item>
          <span className="range-span"> to </span>
          <Form.Item name="targetAmountMax">
            <ScInputNumber
              min={0}
              // className="target-amount-range-input"
              // max={10000}
              // defaultValue={
              //   formData.targetAmountRange && formData.targetAmountRange[1]
              // }
              value={
                formData.targetAmountRange && formData.targetAmountRange[1]
              }
            // onChange={onChangeMax}
            />
          </Form.Item>
        </div>
      </div>
      <div id="ddrPicker" className="field-section">
        <Form.Item label="Due Date Range" name="ddrRange">
          <ScRangePicker format={dateFormat}
          />
          
        </Form.Item>
      </div>
      <div className="form-btn">
        <Button
          type="text"
          onClick={() => {
            setReset(reset + 1)
            setFormData({
              searchName: undefined,
              stage: undefined,
              type: undefined,
              targetAmountRange: undefined,
              ddrRange: undefined,
            });
            // toggleDrawer();
          }}
          className="text-only-btn"
        >
          Reset
        </Button>
        <Button type="primary" htmlType="submit" className="submit-btn">
          Apply
        </Button>
      </div>
    </Form>
  );
};

export default OpportunityListingFilterForm;
