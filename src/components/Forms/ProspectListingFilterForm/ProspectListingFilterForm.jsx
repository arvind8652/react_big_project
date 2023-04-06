import { faUserPlus } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Select, Slider, Tag, Checkbox } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import {
  ScInputNumber,
  ScRangePicker,
} from "../../StyledComponents/formElements";

const ProspectListingFilterForm = ({
  form,
  filterCs,
  formData,
  toggleDrawer,
  onFinish,
  onValuesChange,
  setFilterFormData,
  setFormData,
}) => {
  const tagNameCheckboxOptions = ["Prospect", "Client"];
  const [reset, setReset] = useState(1);
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
      <div id="type" className="field-section">
        <Form.Item name="type" label="Type">
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
              filterCs.Type &&
              filterCs.Type.dropDownValue.map((option) => (
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
      <div id="category" className="field-section">
        <Form.Item name="category" label="Category">
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
              filterCs.Category &&
              filterCs.Category.dropDownValue.map((option) => (
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
      <div id="source" className="field-section">
        <Form.Item name="source" label="Source">
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
            placeholder="Select Source"
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
              filterCs.Source &&
              filterCs.Source.dropDownValue.map((option) => (
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
      <div id="branch" className="field-section">
        <Form.Item name="branch" label="Branch">
          <Select
            className="filter-dropdown"
            size="large"
            mode="multiple"
            tagRender={tagRender}
            placeholder="Select Branch"
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
              filterCs.Branch &&
              filterCs.Branch.lookupValue &&
              filterCs.Branch.lookupValue.lookUpValues.map((option) => (
                <Select.Option key={option.Unit_Hierarchy} value={option.NAME}>
                  {option.NAME}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </div>
      <div id="relationshipManager" className="field-section">
        <Form.Item name="relationshipManager" label="Relationship Manager">
          <Select
            className="filter-dropdown"
            size="large"
            mode="multiple"
            tagRender={tagRender}
            placeholder="Select Relationship Manager"
            value={formData.relationshipManager}
            filterOption={(input, opt) => {
              return (
                opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
            showSearch
            showArrow
          >
            {filterCs &&
              filterCs.RelationshipManager &&
              filterCs.RelationshipManager.lookupValue &&
              filterCs.RelationshipManager.lookupValue.lookUpValues.map(
                (option) => (
                  <Select.Option key={option.ID} value={option.Name}>
                    {option.Name}
                  </Select.Option>
                )
              )}
          </Select>
        </Form.Item>
      </div>
      <div id="interestLevel" className="field-section">
        <Form.Item name="interestLevel" label="Interest Level">
          <Select
            className="filter-dropdown"
            size="large"
            tagRender={tagRender}
            placeholder="Select Interest Level"
            value={formData.interestLevel}
            filterOption={(input, opt) => {
              return (
                opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
            showSearch
            showArrow
          >
            {filterCs &&
              filterCs.InterestLevel &&
              filterCs.InterestLevel.dropDownValue.map((option) => (
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

      {/* <div className="form-btn"> */}
      <div
        className=""
        style={{ right: "28px", position: "absolute", marginBottom: "6%" }}
      >
        <Button
          type="text"
          onClick={() => {
            setReset(reset + 1);
            setFormData({
              searchName: undefined,
              type: undefined,
              category: undefined,
              source: undefined,
              branch: undefined,
              relationshipManager: undefined,
              interestLevel: undefined,
            });
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

export default ProspectListingFilterForm;
