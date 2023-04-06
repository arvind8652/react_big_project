import React, { useState } from "react";
import { Row, Col, Badge, Card, Button, Modal, Avatar, Divider, Tabs } from "antd";
import "antd/dist/antd.css";
import { heldAwayInvestment } from "../constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import DemoModal from "./DemoModal";
import GenericCard from "../../../components/GenericCard/GenericCard";
import { fontSet, theme } from "../../../theme";
import { faChartLineDown, faSackDollar } from "@fortawesome/pro-regular-svg-icons";

const { TabPane } = Tabs;

const HeldAwayInvestment = () => {
  // const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }
  const data = [
    {
      id: 0,
      name: "Peter Dudchenko",
      number: "Asan102104",
      family: "Dudchenko Family",
      AUM: "$ 450,000",
      Ratio: "2X",
      WalletShare: "2.5%",
      heldAway: "$ 450,000",
    },
    {
      id: 1,
      name: "Peter Dudchenko",
      number: "Asan102104",
      family: "Dudchenko Family",
      AUM: "$ 450,000",
      Ratio: "2X",
      WalletShare: "2.5%",
      heldAway: "$ 450,000",
    },
    {
      id: 2,
      name: "Peter Dudchenko",
      number: "Asan102104",
      family: "Dudchenko Family",
      AUM: "$ 450,000",
      Ratio: "2X",
      WalletShare: "2.5%",
      heldAway: "$ 450,000",
    },
  ];
  const feedsStyle = {
    button: {
      borderRadius: "8px",
      //fontSize: "22px",
      width: "max-content",
      float: "right",
      color: "#47518B",
    },
  };
  const styleSet = {
    amountBlock: {
      fontSize: fontSet.heading.large,
    },
    secondaryHeader: {
      fontSet: fontSet.secondaryHeader,
      color: "#696A91",
    },
    highValue: {
      fontSet: fontSet.secondaryHeader,
      color: "#FFFFFF",
      padding: "10px 45px 10px 45px",
      background: "#5D6DD1",
      borderRadius: " 8px",
    },
    lowValue: {
      fontSet: fontSet.secondaryHeader,
      color: "#354081",
      padding: "10px 45px 10px 45px",
      background: "#F0F2FB",
      borderRadius: " 8px",
    },
    subBody: {
      theme: theme.subBody,
      color: "#696A91",
    },
    count: {
      fontfamily: theme.profileName.fontFamily,
      fontStyle: theme.profileName.fontStyle,
      fontSize: "36px",
      lineHeight: " 49px",
      color: "#222747",
    },
    data: {
      fontfamily: theme.profileName.fontFamily,
      fontStyle: theme.profileName.fontStyle,
      fontSize: "36px",
      lineHeight: " 49px",
      color: "#56B8BE",
    },
    heldaway: {
      fontSet: fontSet.secondaryHeader,
      color: "#5D6DD1",
    },

    cardStyle: {
      background: "#F6F7FB",
      borderRadius: "8px",
      marginTop: "30px",
    },
    subheadingStyle: {
      fontfamily: theme.profileName.fontFamily,
      fontStyle: theme.profileName.fontStyle,
      fontSet: fontSet.body.large,
      color: "#696A91",
    },
  };
  const showOnClickData = () => {

    return (
      <>

        <Card style={styleSet.cardStyle}>
          <Row>
            <Col span={6}>
              <span style={styleSet.count}>{25}</span>
              <br />
              <span style={styleSet.secondaryHeader}>{"Count"}</span>
            </Col>
            <Col span={6}>
              <Row>
                <Col style={styleSet.data}>+5</Col>
                <Col>
                  <span style={styleSet.subheadingStyle}>{"Since"}</span>
                  <br />
                  <span style={styleSet.subheadingStyle}>{"Dec 2020"}</span>
                </Col>
              </Row>
              <Row>
                <span style={styleSet.secondaryHeader}>Performance</span>
              </Row>
            </Col>
            <Col span={6}>
              <span style={styleSet.count}>{"$ 245.765"}</span>
              <br />
              <span style={styleSet.secondaryHeader}>{"Value"}</span>
            </Col>
            <Col span={6}>
              <Row>
                <Col style={styleSet.data}>+0.3%</Col>
                <Col>
                  <span style={styleSet.subheadingStyle}>{"Since"}</span>
                  <br />
                  <span style={styleSet.subheadingStyle}>{"Dec 2020"}</span>
                </Col>
              </Row>
              <Row>
                <span style={styleSet.secondaryHeader}>Performance</span>
              </Row>
            </Col>
          </Row>
        </Card>

        {data.map((item) => (
          <Row style={{ marginTop: "30px" }}>
            <Col span={2}>
              <Avatar size={80} style={{ marginRight: 35 }}></Avatar>
            </Col>
            <Col span={18}>
              <Row>
                <Col span={6}>
                  <span style={theme.profileName}>{item.name}</span>
                  <br />
                  <span style={styleSet.subBody}>
                    {item.number}|{item.family}
                  </span>
                  <br />
                  <span style={styleSet.secondaryHeader}>
                    {item.AUM}(AUM)
                    </span>
                </Col>
                <Col span={6}>
                  <span style={styleSet.secondaryHeader}>{item.Ratio}</span>
                  <br />
                  <span style={styleSet.secondaryHeader}>{"Ratio"}</span>
                </Col>
                <Col span={6}>
                  <span style={styleSet.secondaryHeader}>
                    {item.WalletShare}
                  </span>
                  <br />
                  <span style={styleSet.secondaryHeader}>
                    {"Wallet share"}
                  </span>
                </Col>
                <Col span={6}>
                  <span style={styleSet.heldaway}>{item.heldAway}</span>
                  <br />
                  <span style={styleSet.secondaryHeader}>{"Held Away"}</span>
                </Col>
              </Row>
            </Col>
            <Divider style={{ marginTop: 5, marginBottom: 5 }} />
          </Row>
        ))}

      </>
    )
  }
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div>
        <GenericCard header={heldAwayInvestment}>
          <Row>
            <Col span={4}>
              <span style={styleSet.highValue} onClick={showOnClickData()}>
                <FontAwesomeIcon
                  // size="2x"
                  icon={faSackDollar}
                  style={{ marginRight: "25px" }}
                />
                High
              </span>
            </Col>
            <Col span={4}>
              <span style={styleSet.lowValue} onClick={showModal}>
                <FontAwesomeIcon
                  icon={faSackDollar}
                  style={{ marginRight: "25px" }}
                />
                Low
              </span>
            </Col>
            <Col span={5}>
              <span style={styleSet.lowValue} onClick={showModal}>
                <FontAwesomeIcon
                  icon={faChartLine}
                  style={{ marginRight: "25px" }}
                />
                Increasing
              </span>
            </Col>
            <Col span={5}>
              <span style={styleSet.lowValue} onClick={showModal}>
                <FontAwesomeIcon
                  icon={faChartLineDown}
                  style={{ marginRight: "25px" }}
                />
                Decreasing
              </span>
            </Col>
          </Row>


          <Row>
            <Col span={24}>
              <Button
                size={"large"}
                style={feedsStyle.button}
                onClick={showModal}
              >
                View All
              </Button>
            </Col>
          </Row>
        </GenericCard>
        <Modal
          footer={null}
          title="Held Away Investment"
          visible={isModalVisible}
          width={1600}
          onCancel={handleCancel}
        >
          <DemoModal />
        </Modal>
      </div>
    </>
  );
};
export default HeldAwayInvestment;
