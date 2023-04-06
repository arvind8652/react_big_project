import { React, useEffect, useState, useRef } from "react";
import { Button, Card, Col, Row, Typography, Divider } from "antd";

import AvatarLogo from "../Avatar/AvatarLogo";
import { AvatarSize } from "../../constants/AvatarSize";
import { palette, fontSet } from "../../theme";
import GenericCard from "../GenericCard/GenericCard";
import TypoGraphy from "../TypoGraphy/TypoGraphy";
import UserDetails from "../UserDetail/UserDetail";

const { Text, Link, Title } = Typography;

const defaultValue = {
    preferredCurrency: "Euro",
    remark: "This is remark of John Doe",
    lastUpdate: "07 Dec 2020, 10:30 pm",

};
const PortfolioValue = ({ profileImage, portfolioValue = defaultValue }) => {
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
            marginBottom: "15px"

        },
        subCardHeader: {
            fontSize: fontSet.body.xlarge,
            color: palette.text.dark,
        },
    };

    return (
        <>
            <Card borderRadius={15}>
                <Row>

                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Preferred Currency"}>
                            <div style={styleSet.subCardHeader}>
                                {portfolioValue.preferredCurrency}
                            </div>
                        </TypoGraphy>
                    </Col>
                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Remark"}>
                            <div style={styleSet.subCardHeader}>
                                {portfolioValue.remark}
                            </div>
                        </TypoGraphy>
                    </Col>
                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Last update"}>
                            <div style={styleSet.subCardHeader}>
                                {portfolioValue.lastUpdate}
                            </div>
                        </TypoGraphy>
                    </Col>
                </Row>

            </Card>
        </>
    );
};
export default PortfolioValue;
