import React, { useEffect, useState } from "react";
import { Button, Form, Input, Drawer, Select, Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/pro-light-svg-icons";
import "../../screens/LeadListingScreen/LeadListingScreen.scss";
import "../../styles/common.scss";

const FilterDrawer = ({
  showDrawer,
  toggleDrawer,
  filterCs,
  onAdvFilterSubmit,
  filtersData,
  setIsFilterApplied,
}) => {
  const [filterCount, setFilterCount] = useState(0);
  const [filterFormData, setFilterFormData] = useState({
    firstName: filtersData.firstName || undefined,
    category: filtersData.category || undefined,
    type: filtersData.type || undefined,
    source: filtersData.source || undefined,
    relationshipManager: filtersData.relationshipManager || undefined,
    branch: filtersData.branch || undefined,
    interestLevel: filtersData.interestLevel || undefined,
  });
  const [reset, setReset] = useState(1);
  useEffect(() => {
    const formDataKeys = Object.keys(filterFormData);
    setFilterCount(
      formDataKeys.filter(
        (item) =>
          filterFormData[item] !== undefined && filterFormData[item].length > 0
      ).length
    );
  }, [filterFormData]);
  useEffect(() => {
    filterCount > 0 ? setIsFilterApplied(true) : setIsFilterApplied(false);
  }, [filterCount]);
  const [form] = Form.useForm();
  const onValuesChange = (values) => {
    setFilterFormData({ ...filterFormData, ...values });
  };
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
    <Drawer
      width={"26vw"}
      className="lead-list-advanced-filter-drawer-container"
      visible={showDrawer}
      onClose={toggleDrawer}
      closable
    >
      <div className="header">
        <div className="title">Filter</div>
        <div className="subtitle">
          {filterCount === 0 ? "No" : filterCount} tag{filterCount > 0 && "s "}{" "}
          added
        </div>
      </div>

      <Form
        // form={form}
        name="filter-form"
        className="filter-form"
        initialValues={filterFormData}
        onFinish={onAdvFilterSubmit}
        onValuesChange={onValuesChange}
        key={reset}
      >
        <div id="firstName" className="field-section">
          <label className="field-label" htmlFor="firstName">
            Search
          </label>
          <Form.Item name="firstName">
            <Input
              className="field"
              type="text"
              value={filterFormData.firstName}
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
        <div id="category" className="field-section">
          <label className="field-label" htmlFor="category">
            Category
          </label>
          <Form.Item name="category">
            <Select
              className="filter-dropdown"
              size="large"
              mode="multiple"
              tagRender={tagRender}
              placeholder="Select option"
              value={filterFormData.category}
              filterOption={(input, opt) => {
                return (
                  opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }}
              showSearch
              showArrow
            >
              {filterCs.Category.dropDownValue.map((option) => (
                <Select.Option key={option.dataValue} value={option.dataValue}>
                  {option.displayValue}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div id="type" className="field-section">
          <label className="field-label" htmlFor="type">
            Type
          </label>
          <Form.Item name="type">
            <Select
              className="filter-dropdown"
              size="large"
              mode="multiple"
              tagRender={tagRender}
              placeholder="Select option"
              value={filterFormData.type}
              filterOption={(input, opt) => {
                return (
                  opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }}
              showSearch
              showArrow
            >
              {filterCs.Type.dropDownValue.map((option) => (
                <Select.Option key={option.dataValue} value={option.dataValue}>
                  {option.displayValue}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div id="source" className="field-section">
          <label className="field-label" htmlFor="source">
            Source
          </label>
          <Form.Item name="source">
            <Select
              className="filter-dropdown"
              size="large"
              mode="multiple"
              tagRender={(e) => tagRender(e)}
              placeholder="Select option"
              value={filterFormData.source}
              filterOption={(input, opt) => {
                return (
                  opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }}
              showSearch
              showArrow
            >
              {filterCs.Source.dropDownValue.map((option) => (
                <Select.Option key={option.dataValue} value={option.dataValue}>
                  {option.displayValue}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div id="relationshipManager" className="field-section">
          <label className="field-label" htmlFor="relationshipManager">
            Relationship Manager
          </label>
          <Form.Item name="relationshipManager">
            <Select
              className="filter-dropdown"
              size="large"
              mode="multiple"
              tagRender={tagRender}
              placeholder="Search by relationship manager name"
              value={filterFormData.relationshipManager}
              filterOption={(input, opt) => {
                return (
                  opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }}
              showSearch
            >
              {filterCs.RelationshipManager.lookupValue.lookUpValues.map(
                (option) => (
                  <Select.Option key={option.ID} value={option.ID}>
                    {option.Name}
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item>
        </div>
        <div id="branch" className="field-section">
          <label className="field-label" htmlFor="branch">
            Office
          </label>
          <Form.Item name="branch">
            <Select
              className="filter-dropdown"
              size="large"
              mode="multiple"
              tagRender={tagRender}
              placeholder="Search by Office/ region"
              value={filterFormData.branch}
              filterOption={(input, opt) => {
                return (
                  opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }}
              showSearch
            >
              {filterCs.Branch.lookupValue.lookUpValues.map((option) => (
                <Select.Option
                  key={option.Unit_Hierarchy}
                  value={option.Unit_Hierarchy}
                >
                  {option.NAME}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div id="interestLevel" className="field-section">
          <label className="field-label" htmlFor="interestLevel">
            Interest level
          </label>
          <Form.Item name="interestLevel">
            <Select
              className="filter-dropdown"
              size="large"
              mode="multiple"
              tagRender={(e) => tagRender(e)}
              placeholder="Select option"
              value={filterFormData.interestLevel}
              filterOption={(input, opt) => {
                return (
                  opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }}
              showSearch
              showArrow
            >
              {filterCs.InterestLevel.dropDownValue.map((option) => (
                <Select.Option key={option.dataValue} value={option.dataValue}>
                  {option.displayValue}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="form-btn">
          <Button
            type="text"
            // htmlType="submit"
            // className="text-only-btn"
            className="cancel-btn"
            onClick={() => {
              setReset(reset + 1);
              setFilterFormData({
                firstName: undefined,
                category: undefined,
                type: undefined,
                source: undefined,
                relationshipManager: undefined,
                branch: undefined,
                interestLevel: undefined,
              });
              // form.setFieldsValue({
              //   firstName: undefined,
              //   category: undefined,
              //   type: undefined,
              //   source: undefined,
              //   relationshipManager: undefined,
              //   branch: undefined,
              //   interestLevel: undefined,
              // });
              form.resetFields();
            }}
          >
            Reset
          </Button>
          <Button type="primary" htmlType="submit" className="submit-btn">
            Apply
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default FilterDrawer;
