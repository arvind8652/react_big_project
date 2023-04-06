import React from "react";
import { Row, Col, Empty } from "antd";
import { styleSet } from "../Style";
// import { ALLOTMENT_DETAILS } from "../Constant";
import { LabelWithSubText } from "./LabelWithSubText";

export const AllotmentDetailsView = ({ details = [] }) => {
  return (
    <Row>
      {details && details.length > 0 ? (
        details.map((ele) => {
          return (
            <Col style={styleSet.container} span={8}>
              <LabelWithSubText label={"Price"} subtext={ele.allAmount} />
              <LabelWithSubText label={"Quantity"} subtext={ele.appUnits} />
              <LabelWithSubText label={"Face Value"} subtext={ele.appAmount} />
              <LabelWithSubText label={"Brokerage"} subtext={ele.agentName} />
              <LabelWithSubText
                label={"Other Charges"}
                subtext={ele.fcyArrangerFee}
              />
              <LabelWithSubText
                label={"Settelment Value"}
                subtext={ele.settelmentValue}
              />
            </Col>
          );
        })
      ) : (
        <div style={styleSet.center}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
    </Row>
  );
};
