import React, { useEffect, useState } from "react";
import { Button, Form, Input, Drawer, Select, Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/pro-light-svg-icons";
import "../CustomerOnboardingListingScreen.scss";
const RenderAdvancedFilterDrawer = ({
  showDrawer,
  toggleDrawer,
  filterCs,
  onAdvancedFilterRecord,
  filterData,
  setIsFilterApplied,
  flag,
}) => {
  const [filterCount, setFilterCount] = useState(0);
  const [formData, setFormData] = useState({
    name: filterData.name || undefined,
    category: filterData.category || undefined,
    type: filterData.type || undefined,
    source: filterData.source || undefined,
    relationshipManager: filterData.relationshipManager || undefined,
    branch: filterData.branch || undefined,
    interestLevel: filterData.interestLevel || undefined,
  });
  const [reset, setReset] = useState(1);
  useEffect(() => {
    if (flag) {
      setReset(reset + 1);
      setFormData({
        name: undefined,

        category: undefined,

        type: undefined,

        source: undefined,

        relationshipManager: undefined,

        branch: undefined,

        interestLevel: undefined,
      });

      // onAdvancedFilterRecord({});

      setIsFilterApplied(false);

      // toggleDrawer();
    }
  }, [flag]);

  useEffect(() => {
    const formDataKeys = Object.keys(formData);
    setFilterCount(formDataKeys.filter((item) => formData[item] !== undefined && formData[item].length > 0).length);
  }, [formData]);

  useEffect(() => {
    filterCount > 0 ? setIsFilterApplied(true) : setIsFilterApplied(false);
  }, [filterCount]);

  const onValuesChange = (values) => {
    setFormData({ ...formData, ...values });
  };
  const onAdvFilterSubmit = () => {
    toggleDrawer();
    onAdvancedFilterRecord(formData);
  };

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    return (
      <Tag className="filter-tag" color="#5D6DD1" closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {value}
      </Tag>
    );
  };

  // function refreshPage(){ {
  //         setReset(reset + 1)
  //         setFormData({
  //             name: undefined,
  //             category: undefined,
  //             type: undefined,
  //             source: undefined,
  //             relationshipManager: undefined,
  //             branch: undefined,
  //             interestLevel: undefined,

  //         })
  //         onAdvancedFilterRecord({});
  //         setIsFilterApplied(false);
  //         // toggleDrawer();
  //     }};
  return (
    <Drawer
      width={"26vw"}
      className="prospect-list-advanced-filter-drawer-container"
      visible={showDrawer}
      onClose={toggleDrawer}
      closable
    >
      <div className="header">
        <div className="title">Filter</div>
        <div className="subtitle" style={{ position: "absolute", right: "50px" }}>
          {filterCount === 0 ? "No" : filterCount} tag
          {filterCount > 1 && "s "}
        </div>
      </div>

      <Form
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
              placeholder="Search by client name"
              suffix={<FontAwesomeIcon icon={faUserPlus} style={{ margin: "0 0 0 auto" }} />}
            />
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
              value={formData.category}
              filterOption={(input, opt) => {
                return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
              }}
              showSearch
              showArrow
            >
              {filterCs &&
                filterCs.Category &&
                filterCs.Category.dropDownValue &&
                Array.isArray(filterCs.Category.dropDownValue) &&
                filterCs.Category.dropDownValue.map((option) => (
                  <Select.Option key={option.dataValue} value={option.displayValue}>
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
              value={formData.source}
              filterOption={(input, opt) => {
                return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
              }}
              showSearch
              showArrow
            >
              {filterCs &&
                filterCs.Source &&
                filterCs.Source.dropDownValue &&
                Array.isArray(filterCs.Source.dropDownValue) &&
                filterCs.Source.dropDownValue.map((option) => (
                  <Select.Option key={option.dataValue} value={option.displayValue}>
                    {option.displayValue}
                  </Select.Option>
                ))}
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
              placeholder="Search by office/ region"
              value={formData.branch}
              filterOption={(input, opt) => {
                return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
              }}
              showSearch
            >
              {filterCs &&
                filterCs.Branch &&
                filterCs.Branch.lookupValue &&
                filterCs.Branch.lookupValue.lookUpValues.map((option, index) => (
                  <Select.Option
                    key={index}
                    // value={option.branch_name}
                    value={option.NAME}
                  >
                    {/* {option.branch_name} */}
                    {option.NAME}
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
              value={formData.relationshipManager}
              filterOption={(input, opt) => {
                return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
              }}
              showSearch
            >
              {filterCs &&
                filterCs.RelationshipManager &&
                filterCs.RelationshipManager.lookupValue.lookUpValues.map((option) => (
                  <Select.Option key={option.ID} value={option.Name}>
                    {option.Name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>
        <div id="interestLevel" className="field-section">
          <label className="field-label" htmlFor="interestLevel">
            Risk Profile Category
          </label>
          <Form.Item name="interestLevel">
            <Select
              className="filter-dropdown"
              size="large"
              mode="multiple"
              tagRender={(e) => tagRender(e)}
              placeholder="Select option"
              value={formData.interestLevel}
              filterOption={(input, opt) => {
                return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
              }}
              showSearch
              showArrow
            >
              {filterCs &&
                filterCs.Category_Name &&
                filterCs.Category_Name.dropDownValue.map((option) => (
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
                  category: undefined,
                  type: undefined,
                  source: undefined,
                  relationshipManager: undefined,
                  branch: undefined,
                  interestLevel: undefined,
                });
                onAdvancedFilterRecord({});
                setIsFilterApplied(false);
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
        </div>
      </Form>
    </Drawer>
  );
};

export default RenderAdvancedFilterDrawer;
