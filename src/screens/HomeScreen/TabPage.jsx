import React, { useState } from "react";
import { connect } from "react-redux";
import GenericCard from "../../components/GenericCard/GenericCard";
import { feeds, investmentCart, transaction } from "./constant";
import { Row, Col, Carousel, Button, Tabs, List, Rate, Card, Divider } from "antd";
import { faBookOpen, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericBadge from "../../components/GenericBadge/GenericBadge";
import "antd/dist/antd.css";
import Avatar from "antd/lib/avatar/avatar";
import { faCartArrowDown, faCarTilt, faExchange, faTags } from "@fortawesome/pro-regular-svg-icons";
import GenericCardWithoutMenuButton from "../../components/GenericCard/GenericCardWithoutMenuButton";
import { palette } from "../../theme";
import { faTag } from "@fortawesome/pro-light-svg-icons";
import { AvatarSize } from "../../constants/AvatarSize";
import AvatarLogo from "../../components/Avatar/AvatarLogo";


const TabPage = () => {
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
                <Col span={2}>
                    <div>
                        <FontAwesomeIcon icon={faCartArrowDown} style={{ width: 50, height: 50, color: palette.primary.main }} />
                    </div>
                </Col>
                <Col span={5}>
                    <h1 style={{ margin: 2 }}>$ 17,000</h1>
                    <h4 style={{ margin: 2 }}>Buy Orders (3)</h4>
                </Col>
                <Col span={2}>
                    <div>
                        <FontAwesomeIcon icon={faTag} style={{ width: 50, height: 50, color: palette.primary.main }} />
                    </div>
                </Col>
                <Col span={5} >
                    <h1 style={{ margin: 2 }}>$ 1,000</h1>
                    <h4 style={{ margin: 2 }}>Sell Orders (3)</h4>
                </Col>
                <Col span={2}>
                    <div>
                        <FontAwesomeIcon icon={faExchange} style={{ width: 50, height: 50, color: palette.primary.main }} />
                    </div>
                </Col>
                <Col span={5}>
                    <h1 style={{ margin: 2 }}>$ 7,000</h1>
                    <h4 style={{ margin: 2 }}>Net Trade (3)</h4>
                </Col>
            </Row>
            <Divider style={{ marginTop: 5, marginBottom: 5 }} />
            <>
                {data.map((item) => (
                    <Col>
                        <Row style={rowStyle}>
                            <Row>
                                <Col span={5}>
                                    <Col span={2}>
                                        <AvatarLogo imgsrc={""} profileName={<span>BG</span>} avatarSize={AvatarSize.extrasmall} style={{ marginRight: 35 }} />
                                        {/* <Avatar size={50} style={{ marginRight: 35 }}>
                                            <div>
                                                <span>BG</span>
                                            </div>
                                        </Avatar> */}
                                    </Col>
                                </Col>
                                <Col span={40}>
                                    <div >
                                        <div><h2>{"BDO Global Equity"}</h2></div>
                                        <Row><span>BD190048|</span><Rate allowHalf defaultValue={4} style={{ alignContent: "center", marginBottom: 2 }} /></Row>
                                        <Row>
                                            <Col>
                                                <GenericBadge badgeBody={badgeText("Equity")} />
                                            </Col>
                                            <Col>
                                                <GenericBadge badgeBody={badgeText("Mutual Fund")} />
                                            </Col>
                                        </Row>

                                    </div>
                                </Col>
                            </Row>
                            <Col span={4} >
                                <Row>
                                    <Col span={10}>
                                        <Row>
                                            <Col>
                                                <GenericBadge badgeBody={badgeText("Buy")} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h4 style={{ color: palette.primary.main }}>{'* Complete'}</h4>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={6}>
                                <Row>
                                    <Col span={24}>
                                        <Row>
                                            <Col>
                                                {'$ 600'}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                ${item.rank}{'/Unit'}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={6}>
                                <Row>
                                    <Col span={24}>
                                        <Row>
                                            <Col>
                                                <h2>Alexandra Cortez</h2>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <span>Retirement Portfolio</span>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <GenericBadge badgeBody={badgeText("Advisory")} />
                                            </Col>
                                        </Row>
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
export default connect()(TabPage);