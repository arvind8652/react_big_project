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
    accountName: "Chris Ramos Retirement Portfolio",
    amount: "$1000",
    enteryLoad: "$1000",
    otherCharges: "0",
    totalAmount: "$1000",
    //otherCharges: "$200",
    custodian: "HSBC",
    orderDate: "21 Jan 2021",
    confirmationDate: "21 Jan 2021",


};
const MutualFundOrderDetails = ({ mutualFundOrderDetails = defaultValue }) => {
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
            color: palette.text.head,

        },
        subCardHeader: {
            fontSize: fontSet.body.xlarge,
            color: palette.text.dark,
        },
    };

    return (
        <>
            <GenericCard header={"Order Details"}>
                <Row>

                    <Col style={styleSet.container} >
                        <TypoGraphy label={"Account Name"}>
                            <div style={styleSet.subCardHeader}>
                                {mutualFundOrderDetails.accountName}
                            </div>
                        </TypoGraphy>
                    </Col>
                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Amount"}>
                            <div style={styleSet.subCardHeader}>
                                {mutualFundOrderDetails.amount}
                            </div>
                        </TypoGraphy>
                    </Col>
                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Entery Load"}>
                            <div style={styleSet.subCardHeader}>
                                {mutualFundOrderDetails.enteryLoad}
                            </div>
                        </TypoGraphy>
                    </Col>
                </Row>
                <Row>

                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Other Charges"}>
                            <div style={styleSet.subCardHeader}>
                                {mutualFundOrderDetails.otherCharges}
                            </div>
                        </TypoGraphy>
                    </Col>
                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Total Amount"}>
                            <div style={styleSet.subCardHeader}>
                                {mutualFundOrderDetails.totalAmount}
                            </div>
                        </TypoGraphy>
                    </Col>
                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Custodian/Demat"}>
                            <div style={styleSet.subCardHeader}>
                                {mutualFundOrderDetails.custodian}
                            </div>
                        </TypoGraphy>
                    </Col>
                </Row>
                <Row>

                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Order Date"}>
                            <div style={styleSet.subCardHeader}>
                                {mutualFundOrderDetails.orderDate}
                            </div>
                        </TypoGraphy>
                    </Col>
                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Confirmation Date"}>
                            <div style={styleSet.subCardHeader}>
                                {mutualFundOrderDetails.confirmationDate}
                            </div>
                        </TypoGraphy>
                    </Col>
                    <Col style={styleSet.container}>

                    </Col>

                </Row>

            </GenericCard>
        </>
    );
};
export default MutualFundOrderDetails;
