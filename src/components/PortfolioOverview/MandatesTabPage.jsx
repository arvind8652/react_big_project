import React, { useState } from "react";
import { Row, Col, Carousel, Button, Tabs, List, Rate, Card, Divider } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericBadge from "../GenericBadge/GenericBadge";
import "antd/dist/antd.css";
import Avatar from "antd/lib/avatar/avatar";
import { palette, theme } from "../../theme";
import UserStarDetails from "../PortfolioHoldingTable/UserStarDetails";
import { faPiggyBank } from "@fortawesome/pro-light-svg-icons";
import { faExchange } from "@fortawesome/pro-regular-svg-icons";
import ColorWithLabel from "../LabelTypes/ColorWithLabel";
import { faHandHoldingUsd } from "@fortawesome/pro-regular-svg-icons";



const MandatesTabPage = () => {
    const rowStyle = {
        margin: "24px 0px",
    };

    const data = [
        {
            id: 0,
            type: "AUM",
            rank: 60,
            totalAmount: 400,
            name: "Chris Ramdos",
            role: "RelationShip Manage",
            address: "New York City Area",
        },
        {
            id: 1,
            type: "Revenue",
            rank: 100,
            totalAmount: 400,
            name: "Chris Ramdos",
            role: "RelationShip Manage",
            address: "New York City Area",
        },
        {
            id: 2,
            type: "Convertion",
            rank: 23,
            totalAmount: 400,
            name: "Chris Ramdos",
            role: "RelationShip Manage",
            address: "New York City Area",
        },
    ];

    const badgeText = (rank) => `${rank}`;
    return (
        <>
            <Row >
                <Col style={{ marginTop: "15px" }}>
                    <div>
                        <FontAwesomeIcon icon={faPiggyBank} style={{ width: 50, height: 50, color: palette.primary.main }} />
                    </div>
                </Col>
                <Col style={{ marginLeft: "20px" }}>
                    <h1 style={theme.cartHeading}>$ 17,000</h1>
                    <h4 style={theme.cartSubHeading}>SIP (3)</h4>
                </Col>
                <Col style={{ marginLeft: "15%", marginTop: "15px" }}>
                    <div>
                        <FontAwesomeIcon icon={faHandHoldingUsd} style={{ width: 50, height: 50, color: palette.primary.main }} />
                    </div>
                </Col>
                <Col style={{ marginLeft: "20px" }} >
                    <h1 style={theme.cartHeading}>$ 1,000</h1>
                    <h4 style={theme.cartSubHeading}>SWP (4)</h4>
                </Col>
                <Col style={{ marginLeft: "15%", marginTop: "15px" }}>
                    <div>
                        <FontAwesomeIcon icon={faExchange} style={{ width: 50, height: 50, color: palette.primary.main }} />
                    </div>
                </Col>
                <Col style={{ marginLeft: "20px" }}>
                    <h1 style={theme.cartHeading}>$ 7,000</h1>
                    <h4 style={theme.cartSubHeading}>STP (3)</h4>
                </Col>
            </Row>
            <Divider style={{ marginTop: 5, marginBottom: 5 }} />
            <>
                {data.map((item) => (
                    <Col>
                        <Row style={rowStyle}>
                            <Col>
                                <UserStarDetails />
                            </Col>
                            <Col style={{ marginLeft: "25px" }}>
                                <Row>
                                    <Col>
                                        <GenericBadge badgeBody={badgeText("SIP")} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {/* <h4 style={{ color: palette.primary.main }}>{'* Complete'}</h4> */}
                                        <ColorWithLabel
                                            color={"#55C1B3"}
                                            label={"Complete"}
                                        //key={index}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col style={{ marginLeft: "10%" }}>
                                <Row>
                                    <Col style={theme.cartSubHeading}>
                                        {'$ 600'}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={theme.cartSubHeading}>
                                        {'12 Installments'}
                                    </Col>
                                </Row>
                            </Col>
                            <Col style={{ marginLeft: "10%" }}>

                                <Row>
                                    <Col>
                                        <h2>Alexandra Cortez</h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <span style={theme.cartSubHeading}>Retirement Portfolio</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ marginTop: "15px" }}>
                                        <GenericBadge badgeBody={badgeText("Advisory")} />
                                    </Col>
                                </Row>
                            </Col>


                        </Row>
                        <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                    </Col>
                ))}
            </>
        </>
    );
}
export default MandatesTabPage;