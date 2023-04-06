import React, { useState } from "react";
import "./leadCreation.scss";
import Dragger from "antd/lib/upload/Dragger";
import GenericCard from "../../components/GenericCard/GenericCard";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  Row,
  Col,
  Divider
} from "antd";
import { faInbox } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CONSTANTS } from "../../constants/constants";

const PerosnalDetails = ({ props, leadType = "I" }) => {
  const {
    getLeadAddCs,
    controlStructure,
    postNewLead,
    getSource,
    fullControlStructure,
    initialValue,
    leadView
  } = props;
  const [leadCreationRules, setLeadCreationRules] = useState();
  const { Option } = Select;
  const [profileImage, setProfileImage] = useState([
    {
      RefType: null,
      RefId: null,
      FileDescription: "",
      FileName: "",
      FileSize: "",
      Mimetype: "",
      FileString: "",
      AttachmentFor: "",
      SessionId: ""
    }
  ]);
  const [gender, setGender] = useState(
    controlStructure.Gender &&
      controlStructure.Gender.dropDownValue[0].dataValue
  );
  const [nationality, setNationality] = useState(
    controlStructure.Nationality && controlStructure.Nationality.defaultvalue
  );
  const imageRequest = ({ file, onSuccess }) => {
    let base = new FileReader();
    base.readAsDataURL(file);
    base.onload = (e) => {
      let image = [
        {
          RefType: null,
          RefId: null,
          FileDescription: "",
          FileName: file.name,
          FileSize: JSON.stringify(file.size),
          Mimetype: file.type,
          FileString: e.target.result,
          AttachmentFor: "Profile Photo",
          SessionId: ""
        }
      ];
      setProfileImage(image);
      // history.push("MyLead");
    };
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  return (
    <>
      {leadType === "I" ? (
        <GenericCard
          cardTitle={
            <div className="lead-title">
              {CONSTANTS.leadCreate.personalDetails.title}
            </div>
          }
          menuFlag={0}
          className="CardType"
        >
          <Divider />
          <Row gutter={16}>
            <Col className="gutter-row" span={2}>
              <Form.Item
                label={
                  <div className="lead-text">
                    {CONSTANTS.leadCreate.personalDetails.salutation}
                  </div>
                }
                name="Salutation"
                rules={leadCreationRules ? leadCreationRules.salutation : []}
              >
                <Select
                  className="lead-select"
                  size="large"
                  mode="single"
                  value={[]}
                  filterOption={(input, opt) => {
                    return (
                      opt.children.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    );
                  }}
                  showSearch
                >
                  {controlStructure.Salutation &&
                    controlStructure.Salutation.dropDownValue.length > 0 &&
                    controlStructure.Salutation.dropDownValue.map(
                      (item, index) => (
                        <Option value={item.dataValue} key={index}>
                          {item.displayValue}
                        </Option>
                      )
                    )}
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={7}>
              <Form.Item
                name="FirstName"
                label={
                  <div className="lead-text">
                    {CONSTANTS.leadCreate.personalDetails.firstName}
                  </div>
                }
                rules={leadCreationRules ? leadCreationRules.firstname : []}
              >
                <Input type="text" className="lead-input-field" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={7}>
              <Form.Item
                name="MiddleName"
                label={
                  <div className="lead-text">
                    {CONSTANTS.leadCreate.personalDetails.middleName}
                  </div>
                }
                rules={leadCreationRules ? leadCreationRules.middlename : []}
              >
                <Input type="text" className="lead-input-field" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="LastName"
                rules={leadCreationRules ? leadCreationRules.lastname : []}
                label={
                  <div className="lead-text">
                    {CONSTANTS.leadCreate.personalDetails.lastName}
                  </div>
                }
              >
                <Input type="text" className="lead-input-field" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col className="gutter-row" span={9}>
              <Form.Item>
                <Dragger customRequest={imageRequest} multiple={false}>
                  <p className="ant-upload-drag-icon">
                    <FontAwesomeIcon
                      icon={faInbox}
                      size="3x"
                      style={{ color: "#939DD4" }}
                    />
                  </p>
                  <p className="ant-upload-text">
                    {
                      <div className="lead-text">
                        {CONSTANTS.leadCreate.draggerSubText}
                      </div>
                    }
                  </p>
                  <p className="ant-upload-hint">
                    {
                      <div className="lead-dragger">
                        {CONSTANTS.leadCreate.draggerText}
                      </div>
                    }
                  </p>
                </Dragger>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={15}>
              <Row gutter={16}>
                <Col className="gutter-row" span={11}>
                  <Form.Item
                    name="DateofBirthCorp"
                    rules={
                      leadCreationRules ? leadCreationRules.dateofbirth : []
                    }
                    label={
                      <div className="lead-text">
                        {CONSTANTS.leadCreate.personalDetails.dateOfBirth}
                      </div>
                    }
                  >
                    <DatePicker
                      style={{
                        width: "100%",
                        height: "44px"
                      }}
                      size="large"
                      format="DD-MM-YYYY"
                    />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={13}>
                  <Form.Item
                    name="Gender"
                    required
                    rules={leadCreationRules ? leadCreationRules.gender : []}
                    label={
                      <div className="lead-text">
                        {CONSTANTS.leadCreate.personalDetails.gender}
                      </div>
                    }
                  >
                    <Radio.Group onChange={(e) => setGender(e.target.value)}>
                      {controlStructure.Gender &&
                        controlStructure.Gender.dropDownValue.length > 0 &&
                        controlStructure.Gender.dropDownValue.map((item) => (
                          <Radio.Button
                            value={item.dataValue}
                            // className="lead-radio-button"
                            className={`radio-field-gender ${
                              gender === item.dataValue && "active"
                            }`}
                          >
                            {item.displayValue}
                          </Radio.Button>
                        ))}
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={11} className="gutter-row">
                  <Form.Item
                    name="Category"
                    rules={leadCreationRules ? leadCreationRules.category : []}
                    label={
                      <div className="lead-text">
                        {CONSTANTS.leadCreate.category}
                      </div>
                    }
                  >
                    <Select
                      className="lead-select"
                      size="large"
                      mode="single"
                      value={[]}
                      filterOption={(input, opt) => {
                        return (
                          opt.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        );
                      }}
                      showSearch
                    >
                      {controlStructure.Category &&
                        controlStructure.Category.dropDownValue.length > 0 &&
                        controlStructure.Category.dropDownValue.map(
                          (item, index) => (
                            <Option value={item.dataValue} key={index}>
                              {item.displayValue}
                            </Option>
                          )
                        )}
                    </Select>
                  </Form.Item>
                </Col>

                <Col className="gutter-row" span={13}>
                  <Form.Item
                    name="Nationality"
                    rules={
                      leadCreationRules ? leadCreationRules.nationality : []
                    }
                    label={
                      <div className="lead-text">
                        {CONSTANTS.leadCreate.nationality}
                      </div>
                    }
                    defaultValue={nationality}
                  >
                    <Select
                      className="lead-select"
                      onChange={(e) => {
                        setNationality(e);
                      }}
                      size="large"
                      mode="single"
                      value={[]}
                      filterOption={(input, opt) => {
                        return (
                          opt.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        );
                      }}
                      showSearch
                    >
                      {controlStructure.Nationality &&
                        controlStructure.Nationality.dropDownValue.length > 0 &&
                        controlStructure.Nationality.dropDownValue.map(
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
            </Col>
          </Row>
        </GenericCard>
      ) : (
        <GenericCard
          cardTitle={
            <div className="lead-title">
              {CONSTANTS.leadCreate.companyDetails.title}
            </div>
          }
          menuFlag={0}
          className="CardType"
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="FirstName"
                label={
                  <div className="lead-text">
                    {CONSTANTS.leadCreate.companyDetails.companyName}
                  </div>
                }
                rules={leadCreationRules ? leadCreationRules.firstname : []}
              >
                <Input type="text" className="lead-input-field" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="MiddleName"
                label={
                  <div className="lead-text">
                    {CONSTANTS.leadCreate.companyDetails.contactPerson}
                  </div>
                }
                rules={leadCreationRules ? leadCreationRules.middlename : []}
              >
                <Input type="text" className="lead-input-field" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="LastName"
                label={
                  <div className="lead-text">
                    {CONSTANTS.leadCreate.companyDetails.contactPersonDetails}
                  </div>
                }
                rules={leadCreationRules ? leadCreationRules.lastname : []}
              >
                <Input type="text" className="lead-input-field" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Form.Item>
                <Dragger customRequest={imageRequest} multiple={false}>
                  <p className="ant-upload-drag-icon">
                    <FontAwesomeIcon
                      icon={faInbox}
                      size="3x"
                      style={{ color: "#939DD4" }}
                    />
                  </p>
                  <p className="ant-upload-text">
                    {
                      <div className="lead-text">
                        {CONSTANTS.leadCreate.draggerSubText}
                      </div>
                    }
                  </p>
                  <p className="ant-upload-hint">
                    {
                      <div className="lead-dragger">
                        {CONSTANTS.leadCreate.draggerText}
                      </div>
                    }
                  </p>
                </Dragger>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                  <Form.Item
                    name="DateofBirthCorp"
                    rules={
                      leadCreationRules ? leadCreationRules.dateofbirth : []
                    }
                    label={
                      <div className="lead-text">
                        {
                          CONSTANTS.leadCreate.companyDetails
                            .dateOfIncorporation
                        }
                      </div>
                    }
                  >
                    <DatePicker
                      style={{
                        width: "100%",
                        height: "44px"
                      }}
                      size="large"
                      format="DD-MM-YYYY"
                      disabledDate={(d) =>
                        !d ||
                        d.isAfter(new Date().setDate(new Date().getDate()))
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12} className="gutter-row">
                  <Form.Item
                    name="Category"
                    rules={leadCreationRules ? leadCreationRules.category : []}
                    label={
                      <div className="lead-text">
                        {CONSTANTS.leadCreate.category}
                      </div>
                    }
                  >
                    <Select>
                      {controlStructure.Category &&
                        controlStructure.Category.dropDownValue.length > 0 &&
                        controlStructure.Category.dropDownValue.map(
                          (item, index) => (
                            <Option value={item.dataValue} key={index}>
                              {item.displayValue}
                            </Option>
                          )
                        )}
                    </Select>
                  </Form.Item>
                </Col>

                <Col className="gutter-row" span={12}>
                  <Form.Item
                    name="Nationality"
                    rules={
                      leadCreationRules ? leadCreationRules.nationality : []
                    }
                    label={
                      <div className="lead-text">
                        {CONSTANTS.leadCreate.nationality}
                      </div>
                    }
                    defaultValue={nationality}
                  >
                    <Select
                      className="lead-select"
                      onChange={(e) => {
                        setNationality(e);
                      }}
                    >
                      {controlStructure.Nationality &&
                        controlStructure.Nationality.dropDownValue.length > 0 &&
                        controlStructure.Nationality.dropDownValue.map(
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
            </Col>
          </Row>
        </GenericCard>
      )}
    </>
  );
};

export default PerosnalDetails;
