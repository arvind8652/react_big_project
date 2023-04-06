import React from "react";
import { Row, Space, Typography } from "antd";

const { Text } = Typography;

export const LabelWithSubText = (props) => {
  const { label = "-", subtext = "-" } = props;
  return (
    <div>
      <Space>
        <Text>
          <span className="opportunityDetailText" style={{ color: "#696a91" }}>
            {label}
          </span>
        </Text>
      </Space>
      <br />
      <Row justify="space-between">
        <Text style={{ color: "#2c2d33" }}>
          <span className="opportunityDescriptionText"> {subtext}</span>
        </Text>
        <Text style={{ color: "#2c2d33" }}>
          <span className="opportunityDescriptionText">
            {props.endsubtext ? props.endsubtext : ""}
          </span>
        </Text>
      </Row>
    </div>
  );
};
