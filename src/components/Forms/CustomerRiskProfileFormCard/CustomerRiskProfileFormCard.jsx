import React from "react";
import { Card, Row, Col, Typography } from "antd";

export default function RiskProfile({
  form,
  formData,
  onValuesChange,
  rules,
  csObject,
}) {
  return (
    <Card
      title="Risk Profile"
      extra={
        <Typography.Title level={5}>
          <Typography.Link>+ Add</Typography.Link>
        </Typography.Title>
      }
    >
      <Row justify="center">
        <Typography.Text>Pisk Profile Pending</Typography.Text>
      </Row>
    </Card>
  );
}
