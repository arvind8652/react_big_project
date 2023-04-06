import React, { useState } from "react";
import { Row, Col, Button, Modal, Divider, Avatar } from "antd";
import "antd/dist/antd.css";
import { topRevenueContributors } from "../constant";
import GenericCard from "../../../components/GenericCard/GenericCard";
import { fontSet, theme } from "../../../theme";
import DemoModal from "./DemoModal";
import { TABLECOL } from "./TableDetails";
import { exportJSON } from "../../../utils/utils";

const TopRevenueContributorsCard = (props) => {
  const { topRevenue } = props;

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
    subBody: {
      theme: theme.subBody,
      color: "#696A91",
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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const downloadReport = (data = []) => {
    if (!data) return alert("No data");

    // if (!data.length) return alert("No data");
    const downloadData = data.map((ele, index) => ({
      "Sr.No": index + 1,
      Customer: ele?.customerName,
      "Family Name": ele?.familyName,
      AUM: ele.aumTotal,
      Revunue: ele.revenueTotal,
    }));
    exportJSON(downloadData, "TopRevenue");
  };

  return (
    <>
      <div>
        <GenericCard header={topRevenueContributors}>
          {Object.keys(topRevenue).length ? (
            topRevenue?.topRevenue.slice(0, 2).map((item) => (
              <Row>
                <Col span={5}>
                  <Avatar size={40} style={{ marginRight: 35 }}></Avatar>
                </Col>
                <Col span={19}>
                  <span style={theme.profileName}>{item.customerName}</span>
                  <br />
                  <span style={styleSet.subBody}>
                    {item.number}|{item.familyName}
                  </span>
                  <Row style={{ marginTop: "15px" }}>
                    <Col span={12}>
                      <Row>
                        <Col>
                          <Avatar
                            size={30}
                            style={{
                              backgroundColor: " #F0F2FB",
                              color: "#696A91",
                              marginRight: "5px",
                            }}
                          >
                            #{item.aumRank}
                          </Avatar>
                        </Col>
                        <Col>
                          <span style={styleSet.secondaryHeader}>
                            {item.currencySymbol}
                            {item.revenueTotal}
                          </span>
                          <br />
                          <span style={styleSet.secondaryHeader}>
                            {"Revenue"}
                          </span>
                        </Col>
                      </Row>
                    </Col>

                    <Col span={12}>
                      <Row>
                        <Col>
                          <Avatar
                            size={30}
                            style={{
                              backgroundColor: " #F0F2FB",
                              color: "#696A91",
                              marginRight: "5px",
                            }}
                          >
                            #{item.revenueRank}
                          </Avatar>
                        </Col>
                        <Col>
                          <span style={styleSet.secondaryHeader}>
                            {item.currencySymbol}
                            {item.aumTotal}
                          </span>
                          <br />
                          <span style={styleSet.secondaryHeader}>{"AUM"}</span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Divider style={{ marginTop: 5, marginBottom: 5 }} />
              </Row>
            ))
          ) : (
            <Row>No Data</Row>
          )}

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
          title="Top Revenue Contributors"
          visible={isModalVisible}
          width={1600}
          onCancel={handleCancel}
        >
          <DemoModal
            columns={TABLECOL}
            tableRows={topRevenue?.topRevenue}
            downloadFunction={() => downloadReport(topRevenue?.topRevenue)}
          />
        </Modal>
      </div>
    </>
  );
};
export default TopRevenueContributorsCard;
