import { Col, Row } from "antd";
import React from "react";
import TypoGraphy from "../../components/TypoGraphy/TypoGraphy";

const OtherDetailsCard = ({ apiData }) => {
  return (
    <div>
      <Row>
        <Col span={8}>
          <TypoGraphy label={"Booking Branch"}>
            {apiData?.branchName}
          </TypoGraphy>
        </Col>
        <Col span={8}>
          <TypoGraphy label={"Source of Fund"}>
            {apiData?.sourceOfFund}
          </TypoGraphy>
        </Col>
        <Col span={8}>
          <TypoGraphy label={"Withholding Tax %"}>
            {apiData?.withholdingTaxPer}
          </TypoGraphy>
        </Col>
      </Row>
      <Row>
        <Col>
          <TypoGraphy label={"Remarks"}>{apiData?.remarks}</TypoGraphy>
        </Col>
      </Row>
    </div>
  );
};

export default OtherDetailsCard;
