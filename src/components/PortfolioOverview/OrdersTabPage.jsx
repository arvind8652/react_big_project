import React, { useState } from "react";
import { Row, Col, Carousel, Button, Tabs, List, Rate, Card, Divider } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericBadge from "../GenericBadge/GenericBadge";
import "antd/dist/antd.css";
import { faHandHoldingUsd, } from "@fortawesome/free-solid-svg-icons";
import { palette, theme } from "../../theme";
import Avatar from "antd/lib/avatar/avatar";
import UserStarDetails from "../PortfolioHoldingTable/UserStarDetails";
import { faExchange, faShoppingCart } from "@fortawesome/pro-regular-svg-icons";
import { faTag } from "@fortawesome/pro-light-svg-icons";
import { faCartArrowDown } from "@fortawesome/pro-duotone-svg-icons";
import ColorWithLabel from "../LabelTypes/ColorWithLabel";

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

const OrdersTabPage = ({ OrdersTabPage = data }) => {
    const rowStyle = {
        margin: "24px 0px",
    };



    const badgeText = (rank) => `${rank}`;
    return (
        <>
            <Row >
                <Col style={{ marginTop: "15px" }}>
                    <div>
                        <FontAwesomeIcon icon={faShoppingCart} style={{ width: 50, height: 50, color: palette.primary.main }} />
                    </div>
                </Col>
                <Col style={{ marginLeft: "20px" }}>
                    <h1 style={theme.cartHeading}>$ 17,000</h1>
                    <h4 style={theme.cartSubHeading}>Buy Orders (3)</h4>
                </Col>
                <Col style={{ marginLeft: "10%", marginTop: "15px" }}>
                    <div>
                        <FontAwesomeIcon icon={faTag} style={{ width: 50, height: 50, color: palette.primary.main }} />
                    </div>
                </Col>
                <Col style={{ marginLeft: "20px" }}>
                    <h1 style={theme.cartHeading}>$ 1,000</h1>
                    <h4 style={theme.cartSubHeading}>Sell Orders (3)</h4>
                </Col>
                <Col style={{ marginLeft: "10%", marginTop: "15px" }}>
                    <div>
                        <FontAwesomeIcon icon={faExchange} style={{ width: 50, height: 50, color: palette.primary.main }} />
                    </div>
                </Col>
                <Col style={{ marginLeft: "20px" }}>
                    <h1 style={theme.cartHeading}>$ 7,000</h1>
                    <h4 style={theme.cartSubHeading}>Net Trade (3)</h4>
                </Col>
            </Row>
            <Divider style={{ marginTop: 5, marginBottom: 5 }} />
            <>
                {OrdersTabPage.map((item) => (
                    <Col>
                        <Row style={rowStyle}>

                            <Col>
                                <UserStarDetails />
                            </Col>
                            <Col style={{ marginLeft: "25px" }} >
                                <Row>
                                    <Col>
                                        <GenericBadge style={theme.cartSubHeading} badgeBody={badgeText("Buy")} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
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
                                        ${item.rank}{'/Unit'}
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
export default OrdersTabPage;