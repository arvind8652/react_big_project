import React, { useState } from "react";
import GenericCard from "../../components/GenericCard/GenericCard";
import GenericBadge from "../GenericBadge/GenericBadge";
import { Row, Col, Avatar, Button, Divider, Modal } from "antd";
import { otherRelation } from "../../components/PortfolioOverview/PortfolioHoldingConstant";
import { palette, fontSet, theme } from "../../theme";
import DemoModal from "./DemoModal";
import OtherRelationModal from "./OtherRelationModal";

const OtherRelation = () => {
  const PerformanceRow = () => {
    const data = [
      {
        id: 0,
        type: "Investment",
        rank: 5,
        totalAmount: "450,000",
        name: "Banco De Oro",
        role: "Wealth Account",
        badge: "Proprietary",
        color: palette.primary.heavy,
      },
      {
        id: 1,
        type: "Investment",
        rank: 2,
        totalAmount: "450,000",
        name: "Banco De Oro",
        role: "Wealth Account",
        badge: "Proprietary",
        color: palette.primary.main,
      },
      {
        id: 2,
        type: "Investment",
        rank: 2,
        totalAmount: "450,000",
        name: "Banco De Oro",
        role: "Wealth Account",
        badge: "Proprietary",
        color: palette.primary.light,
      },
    ];



    const styleSet = {
      amountBlock: {
        fontSize: fontSet.heading.large,
      },
      rowStyle: {
        margin: "36px 0px",
      },
      avatarBody: {
        lineHeight: "12px",
        margin: "30px 10px",
      },
      rowAlign: {
        margin: "9px 0px",
      },
    };


    return (
      <>
        {data.map((item) => (

          <Row style={styleSet.rowStyle}>
            <Col span={16}>
              <Row>
                <Col span={8}>
                  {/* <AvatarLogo
                    imgsrc={""}
                    profileName={
                      <div style={styleSet.avatarBody}>
                        <span style={theme.xSmallBody}>Top</span>
                        <br />
                        <span style={theme.xSmallHeading}>{item.type}</span>
                      </div>
                    }
                    avatarSize={AvatarSize.medium}
                    style={{ backgroundColor: item.color }}
                  /> */}
                  <Avatar size={50} style={{ marginRight: 35 }}>
                    <div>
                      <span>BG</span>
                    </div>
                  </Avatar>
                </Col>
                <Col span={16}>
                  <div >
                    <div className="heading-style">{item.name}</div>
                    <div className="secondary-heading-style">{item.role}</div>
                    <GenericBadge
                      className="other-relation-logo"
                      badgeBody={item.badge}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row >
                <Col span={24}>
                  <Row >
                    <Col className="other-relation-content">$ {item.totalAmount}</Col>
                  </Row>
                  <Row>
                    <Col className="other-relation-content1">
                      {item.type}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Divider style={{ marginTop: 5, marginBottom: 5 }} />
          </Row>
        ))}
      </>
    );
  };

  const Style = {
    button: {
      borderRadius: "8px",
      fontSize: "22px",
      width: "max-content",
      float: "right",
      color: "#47518B",
    },
  };

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
        <GenericCard header={otherRelation} >
          <PerformanceRow />
          <Row>

            <Col span={24}>
              <Button size={"large"} style={Style.button} onClick={showModal} >
                View All
                     </Button>
            </Col>
          </Row>
        </GenericCard>
        <Modal
          title="Accounts"
          visible={isModalVisible}
          width={1600}
          onCancel={handleCancel}
          footer={[
            //             <Button key="back" onClick={handleCancel}>
            //                 Close
            //   </Button>,
          ]}
        >
          <Col>
            <OtherRelationModal />
          </Col>
        </Modal>
      </div>
    </>
  );
};
export default OtherRelation;
