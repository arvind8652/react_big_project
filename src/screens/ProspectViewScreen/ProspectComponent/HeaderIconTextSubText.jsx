import React from "react";
import { Space, Typography } from "antd";
import "./TextSubText";
const { Text } = Typography;

const HeaderIconTextSubText = (props) => {
  return (
    <Space>
      <div className="header-opp-icons">{props.icon}</div>
      <Space direction="vertical" size={0}>
        <Text className="categoryDetailLabel" strong>
          {props.text}
        </Text>
        <Text className="basicDetailLabel" >
          {props.subtext}
        </Text>
      </Space>
    </Space>
  );
};

export default HeaderIconTextSubText;
