import React from "react";
import { Space, Typography } from "antd";
const { Text } = Typography;

const CustomerOnboardingTextSubText = (props) => {
    return (
        <Space direction="vertical" size={0}>
            <Text
                // fontSize: "20px"
                style={{ fontSize: "1rem", color: "#696A91", fontfamily: "Open Sans" }}
            >
                {props.text} {props.suffixIcon && props.suffixIcon}
            </Text>
            <Text type="secondary"
                style={{ fontSize: "18px", color: "#5D6DD1", fontfamily: "Open Sans" }}
            >
                {props.subtext}
            </Text>
        </Space>
    );
};

export default CustomerOnboardingTextSubText;
