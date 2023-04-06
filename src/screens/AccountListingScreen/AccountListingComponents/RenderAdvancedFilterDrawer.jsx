import React, { useEffect, useState } from "react";
import { Button, Form, Input, Drawer, Select, Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/pro-light-svg-icons";
import "../AccountListingScreen.scss";
const RenderAdvancedFilterDrawer = ({
  showDrawer,
  toggleDrawer,
  filterCs,
  onAdvancedFilterRecord,
  filterData,
  setIsFilterApplied,
  allPendingData,
}) => {
  const [filterCount, setFilterCount] = useState(0);
  const [formData, setFormData] = useState({
    name: filterData.name || undefined,
    status: filterData.status || undefined,
    nature: filterData.nature || undefined,
    type: filterData.type || undefined,
    classification: filterData.classification || undefined,
  });
  const [reset, setReset] = useState(1);
  useEffect(() => {
    const formDataKeys = Object.keys(formData);
    setFilterCount(formDataKeys.filter((item) => formData[item] !== undefined && formData[item].length > 0).length);
  }, [formData]);
  useEffect(() => {
    filterCount > 0 ? setIsFilterApplied(true) : setIsFilterApplied(false);
  }, [filterCount]);

  const onValuesChange = (values) => {
    setFormData({
      ...formData,
      ...values,
    });
  };
  const onAdvFilterSubmit = (values) => {
    toggleDrawer();
    onAdvancedFilterRecord(formData);
  };
  const tagRender = (props) => {
    const { label, closable, onClose } = props;

    return (
      <Tag
        className="filter-tag"
        color="#5D6DD1"
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Drawer
      width={"26vw"}
      className="prospect-list-advanced-filter-drawer-container"
      visible={showDrawer}
      onClose={toggleDrawer}
      closable
    >
      <div className="header">
        <div className="title"> Filter </div>
        {/* <div className="subtitle"> No tags added </div> */}
        <div className="subtitle" style={{ position: "absolute", right: "50px" }}>
          {filterCount === 0 ? "No" : filterCount} tag
          {filterCount > 1 && "s "}
        </div>
      </div>

      <Form
        id="create-course-form"
        name="filter-form"
        className="filter-form"
        onFinish={onAdvFilterSubmit}
        initialValues={formData}
        onValuesChange={onValuesChange}
        key={reset}
      >
        <div id="firstName" className="field-section">
          <label className="field-label" htmlFor="name">
            Search
          </label>
          <Form.Item name="name">
            <Input
              className="field"
              type="text"
              value={formData.name}
              placeholder="Search by account name"
              suffix={
                <FontAwesomeIcon
                  icon={faUserPlus}
                  style={{
                    margin: "0 0 0 auto",
                  }}
                />
              }
            />
          </Form.Item>
        </div>
        <div id="status" className="field-section">
          <label className="field-label" htmlFor="type">
            Status
          </label>
          <Form.Item name="status">
            <Select
              className="filter-dropdown"
              size="large"
              mode="multiple"
              tagRender={tagRender}
              placeholder="Select option"
              value={formData.status}
              filterOption={(input, opt) => {
                return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
              }}
              showSearch
              showArrow
            >
              {/* {filterCs &&
								filterCs.Status &&
								filterCs.Status.dropDownValue.map((option) => (
									<Select.Option key={option.dataValue} value={option.displayValue}>
										{option.displayValue}
									</Select.Option>
								))} */}
              {allPendingData && allPendingData?.map((option) => <Select.Option key={option}>{option}</Select.Option>)}
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
              value={formData.type}
              filterOption={(input, opt) => {
                return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
              }}
              showSearch
              showArrow
            >
              {filterCs &&
                filterCs.Type &&
                filterCs.Type.dropDownValue &&
                Array.isArray(filterCs.Type.dropDownValue) &&
                filterCs.Type.dropDownValue.map((option) => (
                  <Select.Option key={option.dataValue} value={option.displayValue}>
                    {option.displayValue}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>

        <div id="nature" className="field-section">
          <label className="field-label" htmlFor="nature">
            Nature
          </label>
          <Form.Item name="nature">
            <Select
              className="filter-dropdown"
              size="large"
              mode="multiple"
              tagRender={tagRender}
              placeholder="Select option"
              value={formData.nature}
              filterOption={(input, opt) => {
                return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
              }}
              showSearch
              showArrow
            >
              {filterCs &&
                filterCs.Nature &&
                filterCs.Nature.dropDownValue &&
                Array.isArray(filterCs.Nature.dropDownValue) &&
                filterCs.Nature.dropDownValue.map((option) => (
                  <Select.Option key={option.dataValue} value={option.displayValue}>
                    {option.displayValue}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>

        <div id="classification" className="field-section">
          <label className="field-label" htmlFor="nature">
            Classification
          </label>
          <Form.Item name="classification">
            <Select
              className="filter-dropdown"
              size="large"
              mode="multiple"
              tagRender={tagRender}
              placeholder="Select option"
              value={formData.classification}
              filterOption={(input, opt) => {
                return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
              }}
              showSearch
              showArrow
            >
              {filterCs &&
                filterCs.Classification &&
                filterCs.Classification.dropDownValue &&
                Array.isArray(filterCs.Classification.dropDownValue) &&
                filterCs.Classification.dropDownValue.map((option) => (
                  <Select.Option key={option.dataValue} value={option.displayValue}>
                    {option.displayValue}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>

        {/* <div className="form-btn"> */}
        <div style={{ position: "relative", paddingTop: "50px" }}>
          <div style={{ position: "absolute", bottom: "10px", right: "0px" }}>
            <Button
              type="text"
              onClick={() => {
                setReset(reset + 1);
                setFormData({
                  name: undefined,
                  status: undefined,
                  nature: undefined,
                  type: undefined,
                  classification: undefined,
                });
                onAdvancedFilterRecord({});
                setIsFilterApplied(false);
              }}
              className="cancel-btn"
            >
              Reset
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="submit-btn"
              onClick={() => {
                onValuesChange();
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      </Form>
    </Drawer>
  );
};

export default RenderAdvancedFilterDrawer;
