import React, { useState } from "react";
import "./leadCreation.scss";
import GenericCard from "../../components/GenericCard/GenericCard";
import { Form, Input, Select, Row, Col, Checkbox, Divider } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CONSTANTS } from "../../constants/constants";
import {
  faTwitter,
  faFacebookSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const ContactDetails = ({ props }) => {
  const { controlStructure, getSource, initialValue } = props;
  const [countryCodeC, setCountryCodeC] = useState("");
  const [countryCodeA, setCountryCodeA] = useState("");
  const { TextArea } = Input;
  const [leadCreationRules, setLeadCreationRules] = useState();
  const { Option } = Select;
  const [form] = Form.useForm();
  const [countrySelected, setCountrySelected] = useState(true);
  const [stateSelected, setStateSelected] = useState(true);
  const plainOptions = ["Whatsapp", "Viber"];
  const onCountryChange = (value) => {
    let payload = {
      FieldListID: 20043,
      progName: "PROSPECTADD",
      dependentValue: { chk_condn: value },
    };
    getSource(payload, "State");
    form.setFieldsValue({ State: "", City: "" });
    setCountrySelected(false);
  };
  const onStateChange = (value) => {
    let payload = {
      FieldListID: 20044,
      progName: "PROSPECTADD",
      dependentValue: { chk_condn: value },
    };
    getSource(payload, "City");
    form.setFieldsValue({ City: "" });
    setStateSelected(false);
  };
  return (
    <GenericCard
      header={
        <div className="lead-title">
          {CONSTANTS.leadCreate.contactDetails.title}
        </div>
      }
      menuFlag={false}
      className="CardType"
    >
      <Divider />
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="Mobile"
            label={
              <div className="lead-text">
                {CONSTANTS.leadCreate.contactDetails.contact}
              </div>
            }
            rules={leadCreationRules ? leadCreationRules.mobile : []}
          // rules={[
          //   {
          //     required: true,
          //     message: "Enter Valid phone number!",
          //     pattern: new RegExp("^\\d{8}[0-9]*$"),
          //   },
          // ]}
          >
            <Row>
              <Col span={6}>
                <Form.Item
                  name="DialCode"
                  rules={leadCreationRules ? leadCreationRules.dialcode : []}
                >
                  <Select
                    // style={{ width: "120px" }}
                    // className="lead-select"
                    onChange={(value) => setCountryCodeC(value)}
                    // defaultValue={
                    //   initialValue && initialValue.DialCode
                    //     ? initialValue.DialCode
                    //     : ""
                    // }
                    size="large"
                    mode="single"
                    // value={countryCodeC}
                    filterOption={(input, opt) => {
                      return (
                        opt.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      );
                    }}
                    showSearch
                  >
                    {controlStructure.CountryCode &&
                      controlStructure.CountryCode.lookupValue &&
                      controlStructure.CountryCode.lookupValue.lookUpValues &&
                      controlStructure.CountryCode.lookupValue.lookUpValues.map(
                        (item, index) => (
                          <Option value={item.Dialing_Code} key={index}>
                            {item.Dialing_Code}
                          </Option>
                        )
                      )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={18}>
                <Input
                  // style={{ height: "80px" }}
                  // addonBefore={prefixSelector}
                  type="number"
                  className="lead-input-field quantity"
                />
              </Col>
            </Row>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="AlternateNumber"
            label={
              <div className="lead-text">
                {CONSTANTS.leadCreate.contactDetails.alternateContact}
              </div>
            }
            rules={leadCreationRules ? leadCreationRules.alternatenumber : []}
          >
            <Row>
              <Col span={6}>
                <Select
                  className="lead-select"
                  onChange={(value) => setCountryCodeA(value)}
                  defaultValue={
                    initialValue && initialValue.AlternateDialCode
                      ? initialValue.AlternateDialCode
                      : ""
                  }
                  size="large"
                  mode="single"
                  value={countryCodeA}
                  filterOption={(input, opt) => {
                    return (
                      opt.children.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    );
                  }}
                  showSearch
                >
                  {controlStructure.CountryCode &&
                    controlStructure.CountryCode.lookupValue &&
                    controlStructure.CountryCode.lookupValue.lookUpValues &&
                    controlStructure.CountryCode.lookupValue.lookUpValues.map(
                      (item, index) => (
                        <Option value={item.Dialing_Code} key={index}>
                          {item.Dialing_Code}
                        </Option>
                      )
                    )}
                </Select>
              </Col>
              <Col span={18}>
                <Input type="number" className="lead-input-field quantity" />
              </Col>
            </Row>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="Email"
            label={
              <div className="lead-text">
                {CONSTANTS.leadCreate.contactDetails.emailID}
              </div>
            }
            rules={leadCreationRules ? leadCreationRules.email : []}
          >
            <Input type="text" className="lead-input-field" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Form.Item name="SocialType">
          <Checkbox.Group options={plainOptions} />
        </Form.Item>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={16}>
          <Form.Item
            name="Address"
            rules={leadCreationRules ? leadCreationRules.address : []}
            label={
              <div className="lead-text">
                {CONSTANTS.leadCreate.contactDetails.address}
              </div>
            }
          >
            <TextArea rows={4} className="lead-input-field" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="ZipCode"
            label={
              <div className="lead-text">
                {CONSTANTS.leadCreate.contactDetails.zipCode}
              </div>
            }
            rules={leadCreationRules ? leadCreationRules.zipcode : []}
          >
            <Input
              placeholder="Enter ZIP Code"
              type="text"
              className="lead-input-field"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8} className="gutter-row">
          <Form.Item
            name="Country"
            label={
              <div className="lead-text">
                {CONSTANTS.leadCreate.contactDetails.country}
              </div>
            }
            rules={leadCreationRules ? leadCreationRules.country : []}
          >
            <Select
              className="lead-select"
              placeholder="Enter Country"
              onChange={onCountryChange}
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
              {controlStructure.Country &&
                controlStructure.Country.dropDownValue.length > 0 &&
                controlStructure.Country.dropDownValue.map((item, index) => (
                  <Option value={item.dataValue} key={index}>
                    {item.displayValue}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8} className="gutter-row">
          <Form.Item
            name="State"
            label={
              <div className="lead-text">
                {CONSTANTS.leadCreate.contactDetails.state}
              </div>
            }
            rules={leadCreationRules ? leadCreationRules.state : []}
          >
            <Select
              className="lead-select"
              placeholder="Select State"
              onChange={onStateChange}
              disabled={countrySelected === true}
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
              {controlStructure.State &&
                controlStructure.State.lookUpValues &&
                controlStructure.State.lookUpValues.length > 0 &&
                controlStructure.State.lookUpValues.map((item, index) => (
                  <Option value={item.data_value} key={index}>
                    {item.display_value}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8} className="gutter-row">
          <Form.Item
            name="City"
            label={
              <div className="lead-text">
                {CONSTANTS.leadCreate.contactDetails.city}
              </div>
            }
            rules={leadCreationRules ? leadCreationRules.city : []}
          >
            <Select
              className="lead-select"
              placeholder="Select City"
              disabled={stateSelected === true}
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
              {controlStructure.City &&
                controlStructure.City.lookUpValues &&
                controlStructure.City.lookUpValues.length > 0 &&
                controlStructure.City.lookUpValues.map((item, index) => (
                  <Option value={item.data_value} key={index}>
                    {item.display_value}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="Twitter"
            label={
              <div className="lead-text">
                {CONSTANTS.leadCreate.contactDetails.twitter}
              </div>
            }
          >
            <Input
              placeholder="Paste url"
              prefix={
                <FontAwesomeIcon
                  icon={faTwitter}
                  style={{ color: "#48A1EC", marginRight: "5px" }}
                />
              }
              className="lead-input-field"
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="Linkedln"
            label={
              <div className="lead-text">
                {CONSTANTS.leadCreate.contactDetails.linkedln}
              </div>
            }
          >
            <Input
              placeholder="Paste url"
              prefix={
                <FontAwesomeIcon
                  icon={faLinkedin}
                  style={{ color: "#48A1EC", marginRight: "5px" }}
                />
              }
              className="lead-input-field"
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="Facebook"
            label={
              <div className="lead-text">
                {CONSTANTS.leadCreate.contactDetails.facebook}
              </div>
            }
          >
            <Input
              placeholder="Paste url"
              prefix={
                <FontAwesomeIcon
                  icon={faFacebookSquare}
                  style={{ color: "#48A1EC", marginRight: "5px" }}
                />
              }
              className="lead-input-field"
            />
          </Form.Item>
        </Col>
      </Row>
    </GenericCard>
  );
};

export default ContactDetails;
