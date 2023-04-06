import React from "react";
import { Row, Col } from "antd";

import { fontSet } from "../../theme";
import EquityViewProfileBanner from "../../components/OrderBookEquityViewTabs/EquityViewProfileBanner";
import EquityViewHorizontalTImeline from "../../components/OrderBookEquityViewTabs/EquityViewHorizontalTImeline";
import EquityViewFundDetails from "../../components/OrderBookEquityViewTabs/EquityViewFundDetails";
import EquityViewOrderDetails from "../../components/OrderBookEquityViewTabs/EquityViewOrderDetails";
import EquityViewComplianceBreaches from "../../components/OrderBookEquityViewTabs/EquityViewComplianceBreaches";
import EquityViewDocumentsDetails from "../../components/OrderBookEquityViewTabs/EquityViewDocumentsDetails";

const OrderBookEquityViewScreen = () => {
  const styleSet = {
    cardStyle: {
      margin: "12px 0px",

      width: "100%",
      //marginTop: "15px",
      marginBottom: "5px",
      text: fontSet.heading.large
    }
  };

  return (
    <>
      {" "}
      <Row>
        <Col>
          <Row style={styleSet.cardStyle}>
            <Col span={24}>
              <EquityViewProfileBanner />,
            </Col>
          </Row>
          <Row style={styleSet.cardStyle}>
            <Col span={24}>
              <EquityViewHorizontalTImeline />
            </Col>
          </Row>
          <Row style={styleSet.cardStyle}>
            <Col span={24}>
              <EquityViewFundDetails />
            </Col>
          </Row>
          <Row style={styleSet.cardStyle}>
            <Col span={24}>
              <EquityViewOrderDetails />
            </Col>
          </Row>
          <Row style={styleSet.cardStyle}>
            <Col span={24}>
              <EquityViewComplianceBreaches />
            </Col>
          </Row>
          <Row style={styleSet.cardStyle}>
            <Col span={24}>
              <EquityViewDocumentsDetails />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default OrderBookEquityViewScreen;
