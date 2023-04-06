import React, { useState } from "react";
import "./leadCreation.scss";
import GenericCard from "../../components/GenericCard/GenericCard";
import { Form, Input, Select, Row, Col, Divider } from "antd";

import { CONSTANTS } from "../../constants/constants";

const SourceDetails = ({ props }) => {
  const {
    getLeadAddCs,
    controlStructure,
    postNewLead,
    getSource,
    fullControlStructure,
    initialValue,
    leadView,
  } = props;
  const [form] = Form.useForm();
  const [leadCreationRules, setLeadCreationRules] = useState();
  const { Option } = Select;
  const [sourceSelected, setSourceSelected] = useState(true);
  const [sourceTypeSelected, setSourceTypeSelected] = useState(true);
  const { TextArea } = Input;
  const onTypeChange = (value) => {
    console.log(value);
    let payload = {
      FieldListID: 10,
      dependentValue: { prog_name: value },
    };
    console.log({ payload });
    getSource(payload, "SourceName");
    form.setFieldsValue({ SourceValue: "" });
    setSourceTypeSelected(false);
  };
  const onSourceChange = (value) => {
    let payload = {
      FieldListID: 2,
      dependentValue: { chk_condn: value },
    };
    getSource(payload, "SourceType");
    form.setFieldsValue({ SourceType: "", SourceValue: "" });
    setSourceSelected(false);
  };
  return (
    <GenericCard
      cardTitle={
        <div className="lead-title">
          {CONSTANTS.leadCreate.sourceDetails.title}
        </div>
      }
      menuFlag={false}
      className="CardType"
    >
      <Divider />

      <Row gutter={16}>
        <Col span={8} className="gutter-row">
          <Form.Item
            name="Source"
            label={
              <div className="lead-text">
                {CONSTANTS.leadCreate.sourceDetails.source}
              </div>
            }
            rules={leadCreationRules ? leadCreationRules.source : []}
          >
            <Select
              className="lead-select"
              onChange={onSourceChange}
              size="large"
              mode="single"
              value={[]}
              filterOption={(input, opt) => {
                return (
                  opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }}
              showSearch
            >
              {controlStructure.Source &&
                controlStructure.Source.dropDownValue &&
                controlStructure.Source.dropDownValue.length > 0 &&
                controlStructure.Source.dropDownValue.map((item, index) => (
                  <Option value={item.dataValue} key={index}>
                    {item.displayValue}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8} className="gutter-row">
          <Form.Item
            name="SourceType"
            label={
              <div className="lead-text">
                {CONSTANTS.leadCreate.sourceDetails.type}
              </div>
            }
            rules={leadCreationRules ? leadCreationRules.campaign : []}
          >
            <Select
              className="lead-select"
              onChange={onTypeChange}
              disabled={sourceSelected === true}
              size="large"
              mode="single"
              value={[]}
              filterOption={(input, opt) => {
                return (
                  opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }}
              showSearch
            >
              {controlStructure.SourceType &&
                controlStructure.SourceType.lookUpValues &&
                controlStructure.SourceType.lookUpValues.length > 0 &&
                controlStructure.SourceType.lookUpValues.map((item, index) => (
                  <Option value={item.data_value} key={index}>
                    {item.display_value}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8} className="gutter-row">
          <Form.Item
            name="SourceValue"
            label={
              <div className="lead-text">
                {CONSTANTS.leadCreate.sourceDetails.name}
              </div>
            }
            rules={leadCreationRules ? leadCreationRules.campaignname : []}
          >
            <Select
              className="lead-select"
              disabled={sourceTypeSelected === true}
              size="large"
              mode="single"
              value={[]}
              filterOption={(input, opt) => {
                return (
                  opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }}
              showSearch
            >
              {controlStructure.SourceName &&
                controlStructure.SourceName.lookUpValues &&
                controlStructure.SourceName.lookUpValues.length > 0 &&
                controlStructure.SourceName.lookUpValues.map((item, index) => (
                  <Option value={item.data_value} key={index}>
                    {item.display_value}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8} className="gutter-row">
          <Form.Item
            name="InterestLevel"
            label={
              <div className="lead-text">
                {CONSTANTS.leadCreate.sourceDetails.interestLevel}
              </div>
            }
            rules={leadCreationRules ? leadCreationRules.interestlevel : []}
          >
            <Select
              className="lead-select"
              size="large"
              mode="single"
              value={[]}
              filterOption={(input, opt) => {
                return (
                  opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }}
              showSearch
            >
              {controlStructure.InterestLevel &&
                controlStructure.InterestLevel.dropDownValue.length > 0 &&
                controlStructure.InterestLevel.dropDownValue.map(
                  (item, index) => (
                    <Option value={item.dataValue} key={index}>
                      {item.displayValue}
                    </Option>
                  )
                )}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16} className="gutter-row">
          <Form.Item
            name="Remarks"
            label={
              <div className="lead-text">
                {CONSTANTS.leadCreate.sourceDetails.remarks}
              </div>
            }
            rules={leadCreationRules ? leadCreationRules.remark : []}
          >
            <TextArea rows={4} className="lead-input-field" />
          </Form.Item>
        </Col>
      </Row>
    </GenericCard>
  );
};

export default SourceDetails;
