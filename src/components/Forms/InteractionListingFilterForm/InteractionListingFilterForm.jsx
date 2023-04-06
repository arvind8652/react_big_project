import { faUserPlus } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Select, Slider, Tag, Checkbox } from "antd";
import {
  ScInputNumber,
  ScRangePicker,
} from "../../StyledComponents/formElements";
import { useState } from "react";

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

const plainOptions = ['Client', 'Prospect'];

const InteractionListingFilterForm = ({
  form,
  filterCs,
  formData,
  toggleDrawer,
  onFinish,
  onValuesChange,
  setFormData
}) => {
  console.log("Filter", filterCs);
  const [reset, setReset] = useState(1)
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
      form={form}
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
            value={formData.clientProspectName}
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
     
      <div id="check type" className="field-section">
        <Form.Item Label= "Check Type" name="check type">
        <Checkbox.Group options={plainOptions} defaultValue={['Client']} onChange={onChange} />
        </Form.Item>
      </div>

      <div id="type" className="field-section">
        <Form.Item label = "Interaction Type" name="type">
          <Select
            className="filter-dropdown"
            size="large"
            mode="multiple"
            tagRender={tagRender}
            placeholder="Select option"
            value={formData.InteractionType}
            filterOption={(input, opt) => {
              return (
                opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
            showSearch
            showArrow
          >
            {filterCs &&
              filterCs.InteractionType &&
              filterCs.InteractionType.dropDownValue.map((option) => (
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
      <div id="purpose" className="field-section">
        <Form.Item label = "Interaction Purpose" name="purpose">
          <Select
            className="filter-dropdown"
            size="large"
            mode="multiple"
            tagRender={tagRender}
            placeholder="Select option"
            value={formData.activityPurpose}
            filterOption={(input, opt) => {
              return (
                opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
            showSearch
            showArrow
          >
            {filterCs &&
              filterCs.ActivityPurpose &&
              filterCs.ActivityPurpose.dropDownValue.map((option) => (
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
      <div id="status" className="field-section">
        <Form.Item label = "Interaction Status" name="status">
          <Select
            className="filter-dropdown"
            size="large"
            mode="multiple"
            tagRender={tagRender}
            placeholder="Select option"
            value={formData.activityStatus}
            filterOption={(input, opt) => {
              return (
                opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
            showSearch
            showArrow
          >
            {filterCs &&
              filterCs.ActivityStatus &&
              filterCs.ActivityStatus.dropDownValue.map((option) => (
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
      <div id="ddrPicker" className="field-section">
        <Form.Item label="Due Date Range" name="ddrRange">
          <ScRangePicker />
        </Form.Item>
      </div>
      <div className="form-btn">
        <Button
          type="text"
          onClick={() => {
            toggleDrawer();
            setReset(reset + 1)
            setFormData({
              searchName: undefined,
      tag: undefined,
      type: undefined,
      purpose: undefined,
      status: undefined,
      ddrRange: undefined,
            })
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

export default InteractionListingFilterForm;
