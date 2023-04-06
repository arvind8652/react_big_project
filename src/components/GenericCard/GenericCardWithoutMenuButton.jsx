import React from "react";
import { connect } from "react-redux";
import { Card, Row, Col, Divider } from "antd";
import { fontSet, theme } from "../../theme";

const GenericCardWithoutMenuButton = ({
  cardTitle = "Generic Card Title",
  children,
}) => {
  const styleSet = {
    cardHeader: {
      fontSize: fontSet.heading.large,
    },
  };

  return (
    <>
      <Card style={theme.cardStyle}>
        <div style={styleSet.cardHeader}>
          <Row>
            <Col span={20}>{cardTitle}</Col>
            <Col span={4}></Col>
          </Row>
          <Divider></Divider>
        </div>
        {children}
      </Card>
    </>
  );
};
export default connect()(GenericCardWithoutMenuButton);
