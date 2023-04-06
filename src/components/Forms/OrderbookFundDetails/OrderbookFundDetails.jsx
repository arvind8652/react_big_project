
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Card,
  Select,
  DatePicker,
  Radio,
  Row,
  Col,
  Checkbox,
  Divider,
  Typography,
} from "antd";

import moment from 'moment';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faUserPlus } from "@fortawesome/pro-light-svg-icons";

import "./OrderbookFundDetails.scss";

import UploadByFormat from '../../UploadByFormat/UploadByFormat';
import { POLO_BLUE } from "../../../theme";
import { createNewFamilyName, isHeadOfTheFamily } from "../../../api/customerCreateApi";
import { CONSTANTS } from "../../../constants/constants";

const { Option } = Select;
const {Search} = Input; 

const FundDetails = ({
  form,
  formData,
  onValuesChange,
  rules,
  csObject,
}) => {

  const [familyName, setFamilyName] = React.useState(null);
  const [families, setFamilies] = useState(csObject?.FamilyName?.lookupValue?.lookUpValues);
  const [years, setYears] = useState();

  React.useEffect(() => {
    form.setFieldsValue({ surName: familyName });
    onValuesChange({ surName: familyName });
  }, [familyName]);

  const createNewFamily = async () => {
    try {
      const response = await createNewFamilyName(familyName);
      setFamilies([{ family: familyName, name: familyName }, ...families])
    } catch (error) {
    }
  };

  const getHeadOfTheFamily = async () => {
    try {
      const response = await isHeadOfTheFamily(formData.surName);
      if (response.data) {
        if (window.confirm('Client ' + formData.surName + '  is Head of Family. Do you want to change same.')) {
          form.setFieldsValue({ headOfFamily: true });
        } else {
          form.setFieldsValue({ headOfFamily: false });
        }

      }
    } catch (error) {
    }
  };

  const handleOnValuesChange = (key, value) => {
    onValuesChange({ [key]: value });
  };

  useEffect(() => {
    if (Array.isArray(csObject?.FamilyName?.lookupValue?.lookUpValues)) {
      setFamilies([...csObject?.FamilyName?.lookupValue?.lookUpValues])
    }
  }, [csObject?.FamilyName])

  function disabledDate(current) {
    // Can not select days after today and today
    return current && current > moment().startOf('day');
  }

  return (
    <Card title="Fund Details" className="fund-details-card">
      <Form
        layout="vertical"
        // initialValues={formData}
        form={form}
      >
        <Row>
          <Col span={16}>
            <Row>
             
                  <Col span={16}>
                    <Form.Item
                      label="Stock Name"
                      name="title"
                    //   validateTrigger={["onChange", "onBlur"]}
                    //   rules={rules ? rules.customertype : []}
                      required
                    >
                     <Search placeholder="Enter Stock Name"  />
                    </Form.Item>

                  </Col>
              
             </Row>
             </Col>
             </Row>
      </Form>
    </Card>
  );
};

export default FundDetails;
