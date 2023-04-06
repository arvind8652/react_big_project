import React from "react";
import { Card, Row, Col, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { palette, fontSet, theme } from "../../theme";

const ViewUserBanner = () => {
  const bannerData = {
    name: "Jonathan Doe",
    imgUrl: "",
    role: "Relationship Manager",
    branchName: "Metro Manali Branch",
    location: "Brooklyn Metropolian Area",
  };

  const styleSet = {
    bannerBackground: {
      borderRadius: "8px",
      padding: "35px",
      background: "linear-gradient(to left, #354081 100%, #354081 0%)",
    },
    bannerText: {
      color: palette.invert.main,
    },
    userName: {
      color: palette.invert.heavy,
    },
    charData: {
      padding: "36px 0 16px 0",
    },
  };
 
  return (
    <>
      <Card style={{ ...styleSet.bannerBackground, ...styleSet.bannerText }}>
        <Row>
          <Col span={4}>
            <Avatar size={178} icon={<UserOutlined />} />
          </Col>
          <Col span={8}>
            <Row>
              <Col>
                <span style={{ ...theme.xLargeHeader, ...styleSet.userName }}>
                  {bannerData.name}
                </span>
                <br />
                <span style={theme.secondaryBody}>
                  {bannerData.role} <br /> {bannerData.branchName} <br />
                  <FontAwesomeIcon icon={faSearchLocation} />
                  {bannerData.location}
                </span>
              </Col>
            </Row>
          </Col>
          {}
        </Row>
      </Card>
    </>
  );
};
export default ViewUserBanner;
