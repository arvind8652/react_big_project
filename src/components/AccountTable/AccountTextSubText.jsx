import React from "react";
import { Space, Typography } from "antd";
const { Text } = Typography;

const AccountTextSubText = (props) => {
    return (
        <Space direction="vertical" size={0}>
            <Text
                style={{ fontSize: "20px", color: "#696A91" }}
            >
                {props.text} {props.suffixIcon && props.suffixIcon}
            </Text>
            <Text type="secondary"
                style={{ fontSize: "18px", color: "#5D6DD1" }}
            >
                {props.subtext}
            </Text>
        </Space>
    );
};

export default AccountTextSubText;
