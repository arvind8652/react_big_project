import React, { useState } from "react";
import { Row, Col, Divider, Button, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "antd/dist/antd.css";
import Avatar from "antd/lib/avatar/avatar";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import { palette, fontSet, theme } from "../../theme";
import PortfolioInteractionTable from "./PortfolioInteractionTable";

const ReminderTabPage = ({calederData}) => {
    const rowStyle = {
        margin: "12px 0px",
    };
    const feedsStyle = {
        button: {
            borderRadius: "8px",
            // fontSize: "22px",
            width: "max-content",
            float: "right",
            color: "#47518B",

        },
    };
    
    const styleSet = {
        amountBlock: {
            fontSize: fontSet.heading.large,
        },
        rowStyle: {
            margin: "24px 0px",
        },
        avatarBody: {
            lineHeight: "12px",
            margin: "30px 15px 5px",
        },
        rowAlign: {
            margin: "5px 13px",
        },
        btnStyle: {
            border: "1px solid #6674C7",
            borderRadius: "8px",
            fontSize: fontSet.body.large,
            color: palette.text.btn,
          },
    };
    

    const data = [
        {
            id: 0,
            type: "Send a greeting thro..",
            rank: 60,
            totalAmount: 400,
            name: "Chris Ramdos",
            role: "Prospect",
            address: "New York City Area",
            date: "31 Mar 2021",
            event: "Birthday"
        },
        {
            id: 1,
            type: "Final confirmation of..",
            rank: 100,
            totalAmount: 400,
            name: "Chris Ramdos",
            role: "Prospect",
            address: "New York City Area",
            date: "31 Mar 2021",
            event: "Reminder"
        },
        {
            id: 2,
            type: "wish them on a call..",
            rank: 23,
            totalAmount: 400,
            name: "Chris Ramdos",
            role: "Prospect",
            address: "New York City Area",
            date: "31 Mar 2021",
            event: "Anniversary"
        },
    ];

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
            <>
                {data.map((item) => (
                    <Col span={120}>
                        <Row style={rowStyle}>
                            <Col>
                                <Row style={styleSet.rowStyle}>
                                    <Col span={30}>
                                        <Row>
                                            <Col >
                                                {/* <AvatarLogo imgsrc={""} profileName={item.type} avatarSize={AvatarSize.extrasmall} /> */}
                                                <Avatar size={50} style={{ marginRight: 35, backgroundColor: "#F0F2FB" }}>
                                                    <div>
                                                        <span><FontAwesomeIcon icon={faBirthdayCake} style={{ color: "#222747" }} /></span>
                                                    </div>
                                                </Avatar>
                                            </Col>
                                            <Col >
                                                <div>
                                                    <div className="follow-up">{item.event}</div>
                                                    <div className="final-follow-up">{item.type}</div>
                                                </div>
                                            </Col>
                                            <Col style={{ marginLeft: 60 }}>
                                                <Row>
                                                    <div><span className="other-relation-content">{item.date}</span></div>
                                                </Row>
                                                <Row>
                                                    <Col className="other-relation-content1">
                                                        Date
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                            </Col>
                        </Row>
                        <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                    </Col>
                ))}
                {/* <Row>
                    <Col span={24}>
                        <Button size={"large"} style={feedsStyle.button}>
                            View Calender
                        </Button>
                    </Col>
                </Row> */}
                <Row>
                    <Col span={24}>
                        <Button size={"large"} style={feedsStyle.button} onClick={showModal}>

                           View All
                        </Button>
                    </Col>
                </Row>
                <Modal
                    title=""
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
                        <PortfolioInteractionTable />
                    </Col>
                </Modal>
            </>
        </>
    );
}
export default ReminderTabPage;