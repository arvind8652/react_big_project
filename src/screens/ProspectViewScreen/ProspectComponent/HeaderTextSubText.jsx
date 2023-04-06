import React from "react";
import { Space, Typography } from "antd";
import "./TextSubText.scss"
const { Text } = Typography;


const HeaderTextSubText = (props) => {
  return (
    <Space direction="vertical" size={0}>
      <Text className="categoryDetailLabel" strong>
        {props.text} {props.suffixIcon && props.suffixIcon}
      </Text>
      <Text className="basicDetailLabel" >
        {props.subtext}
      </Text>
    </Space>
  );
};

export default HeaderTextSubText;
