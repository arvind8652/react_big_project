import React from "react";
import { Row, Col } from "antd";
import { styleSet } from "../Style";
import { LabelWithSubText } from "./LabelWithSubText";

export const AddressDetailsView = (props) => {
  const { addressDetails = {} } = props;

  const addressList = [
    {
      subtext: "Address",
      label: "mailAdd1",
    },
    {
      subtext: "Country",
      label: "mailCountryName",
    },
    {
      subtext: "State",
      label: "mailStateName",
    },
    {
      subtext: "City",
      label: "mailCityName",
    },
    {
      subtext: "Zip Code",
      label: "mailPin",
    },
  ];
  return (
    <>
      {Object.keys(addressDetails).length ? (
        <Row>
          {addressList.map((ele) => {
            return (
              <Col style={styleSet.container} span={8}>
                <LabelWithSubText
                  label={addressDetails[ele.label] ?? "-"}
                  subtext={ele.subtext}
                />
              </Col>
            );
          })}
        </Row>
      ) : (
        <Row>
          <Col style={styleSet.container} span={24}>
            No Address Details{" "}
          </Col>
        </Row>
      )}
    </>
  );
};
