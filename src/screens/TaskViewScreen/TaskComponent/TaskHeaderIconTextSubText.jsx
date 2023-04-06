import React from "react";
import { Space, Typography } from "antd";
import "../TaskViewScreen.scss";
const { Text } = Typography;


const TaskHeaderIconTextSubText = (props) => {
  return (
    <Space>
      <div className="taskDetailIcon">{props.icon}</div>
      <Space direction="vertical" size={0}>
        <Text className="taskDetailText"
          // style={{ fontSize: "16px", color: "#fff" }}
          strong>
          {props.text}
        </Text>
        <Text type="secondary" className="taskDescriptionText"
        // style={{ fontSize: "14px", color: "#D9DFFF" }}
        >
          {props.subtext}
        </Text>
      </Space>
    </Space>
  );
};

export default TaskHeaderIconTextSubText;
