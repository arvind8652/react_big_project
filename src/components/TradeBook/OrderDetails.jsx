import { React, useEffect, useState } from "react";
import { Col, Row } from "antd";

import { connect } from "react-redux";
import { palette, fontSet } from "../../theme";
import GenericCard from "../GenericCard/GenericCard";
import TypoGraphy from "../TypoGraphy/TypoGraphy";

const defaultValue = {
  accountName: "Chris Ramo’s Retirement Portfolio",
  amount: "$ 1000",
  entryLoad: "$ 100",
  otherCharges: "0",
  brokerage: "$200",
  totalAmount: "$2000",
  custodian: "HSBC",
  orderDate: "10 Jan 2020",
  confirmationDate: "10 Jan 2020"
};
const EquityViewOrderDetails = ({ orderDetails = defaultValue }) => {
  const [equityViewOrderDetails, setEquityViewOrderDetails] = useState({});

  useEffect(() => {
    setEquityViewOrderDetails({
      schemeName: orderDetails?.schemeName,
      customerName: orderDetails?.customerName,
      customerId: orderDetails?.customerId,
      valueDate: orderDetails?.valueDate,
      dealId: orderDetails?.dealId,
      refType: orderDetails?.refType,
      scheme: orderDetails?.scheme,
      currency: orderDetails?.currency,
      amount: orderDetails?.amount,
      charges: orderDetails?.charges,
      custodian: orderDetails?.custodian
    });
  }, [orderDetails]);

  const styleSet = {
    relationBlock: {
      color: palette.secondary.light
    },
    contactBlock: {
      color: palette.secondary.light,
      height: 0.5
    },
    subCardHeader: {
      fontSize: fontSet.body.xlarge,
      color: palette.text.dark
    },
    container: {
      marginTop: "15px"
    }
  };

  const properTitle = (eachTitle) => {
    const titleRegex = eachTitle.replace(/([A-Z])/g, " $1");
    return titleRegex.charAt(0).toUpperCase() + titleRegex.slice(1);
  };

  return (
    <>
      <GenericCard header={"Order Details"}>
        <Row>
          {Object.keys(equityViewOrderDetails).map((eachKey) => {
            return (
              equityViewOrderDetails[eachKey] && (
                <Col style={styleSet.container} span={8}>
                  <TypoGraphy label={properTitle(eachKey)}>
                    <div style={styleSet.subCardHeader}>
                      {equityViewOrderDetails[eachKey]}
                    </div>
                  </TypoGraphy>
                </Col>
              )
            );
          })}
        </Row>
      </GenericCard>
    </>
  );
};

const mapStateToProps = (state) => ({
  orderDetails: state.tradeBookView.tradeBookViewDetails.tradeDetails
});

export default connect(mapStateToProps)(EquityViewOrderDetails);
