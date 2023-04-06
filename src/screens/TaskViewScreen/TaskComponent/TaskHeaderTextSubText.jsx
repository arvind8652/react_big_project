import React from "react";
import { Space, Typography } from "antd";
const { Text } = Typography;

const TaskHeaderTextSubText = (props) => {
    return (
        <Space direction="vertical" size={0}>
            <Text className="taskDetailText"
                // style={{ fontSize: "16px", color: "#fff" }} 
                strong>
                {props.text} {props.suffixIcon && props.suffixIcon}
            </Text>
            <Text type="secondary" className="taskDescriptionText"
            // style={{ fontSize: "14px", color: "#D9DFFF" }}
            >
                {props.subtext}
            </Text>
        </Space>
    );
};

export default TaskHeaderTextSubText;
