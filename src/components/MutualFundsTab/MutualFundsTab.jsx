import { React, useEffect, useState, useRef } from "react";
import { Button, Card, Col, Row, Typography, Divider } from "antd";

import AvatarLogo from "../Avatar/AvatarLogo";
import { AvatarSize } from "../../constants/AvatarSize";
import { palette, fontSet } from "../../theme";
import GenericCard from "../GenericCard/GenericCard";
import TypoGraphy from "../TypoGraphy/TypoGraphy";
import UserDetails from "../UserDetail/UserDetail";
import PortfolioValue from "./PortfolioValue";
import ConsolidatedPortfolio from "./ConsolidatedPortfolio";

const { Text, Link, Title } = Typography;

const MutualFundsTab = () => {
  const styleSet = {
    relationBlock: {
      color: palette.secondary.light,
    },
    contactBlock: {
      color: palette.secondary.light,
      height: 0.5,
      //border-width:0,
      //color:gray,
      //background-color:gray,
    },
    container: {
      flex: 1,
      width: "100%",
      marginTop: "10px",
      marginBottom: "15px",
    },
    subCardHeader: {
      fontSize: fontSet.body.xlarge,
      color: palette.text.dark,
    },
  };

  return (
    <>
      <GenericCard header={"Other Details"}>
        <Row>
          <Col style={styleSet.container}>
            <PortfolioValue />
          </Col>
          <Col style={styleSet.container}>
            <ConsolidatedPortfolio />
          </Col>
        </Row>
      </GenericCard>
    </>
  );
};
export default MutualFundsTab;
