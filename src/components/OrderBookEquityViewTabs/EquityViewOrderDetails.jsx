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
    quantity: "200",
    disclosedQuantity: "200",
    price: "$200",
    brokarage: "$200",
    otherCharges: "$200",
    totalAmount: "$2000",
    validity: "24 Nov 2020",
    paymentMode: "Direct Debit",
    account: "25100072282",
    broker: "CLSA",
    exchage: "PSE",
    segment: "Cash",
    custodian: "HSBC",
    orderDate: "10 Jan 2020",
    confirmationDate: "10 Jan 2020",
};
const EquityViewOrderDetails = ({ equityViewOrderDetails = defaultValue }) => {
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
                                {equityViewOrderDetails.accountName}
                            </div>
                        </TypoGraphy>
                    </Col>
                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Quantity"}>
                            <div style={styleSet.subCardHeader}>
                                {equityViewOrderDetails.quantity}
                            </div>
                        </TypoGraphy>
                    </Col>
                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Disclosed Quantity"}>
                            <div style={styleSet.subCardHeader}>
                                {equityViewOrderDetails.disclosedQuantity}
                            </div>
                        </TypoGraphy>
                    </Col>
                </Row>
                <Row>

                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Price"}>
                            <div style={styleSet.subCardHeader}>
                                {equityViewOrderDetails.price}
                            </div>
                        </TypoGraphy>
                    </Col>
                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Brokerage"}>
                            <div style={styleSet.subCardHeader}>
                                {equityViewOrderDetails.brokarage}
                            </div>
                        </TypoGraphy>
                    </Col>
                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Other Charges"}>
                            <div style={styleSet.subCardHeader}>
                                {equityViewOrderDetails.otherCharges}
                            </div>
                        </TypoGraphy>
                    </Col>
                </Row>
                <Row>

                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Total Amount"}>
                            <div style={styleSet.subCardHeader}>
                                {equityViewOrderDetails.totalAmount}
                            </div>
                        </TypoGraphy>
                    </Col>
                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Validity"}>
                            <div style={styleSet.subCardHeader}>
                                {equityViewOrderDetails.validity}
                            </div>
                        </TypoGraphy>
                    </Col>
                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Payment Mode"}>
                            <div style={styleSet.subCardHeader}>
                                {equityViewOrderDetails.paymentMode}
                            </div>
                        </TypoGraphy>
                    </Col>
                </Row>
                <Row>

                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Account"}>
                            <div style={styleSet.subCardHeader}>
                                {equityViewOrderDetails.account}
                            </div>
                        </TypoGraphy>
                    </Col>
                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Broker"}>
                            <div style={styleSet.subCardHeader}>
                                {equityViewOrderDetails.broker}
                            </div>
                        </TypoGraphy>
                    </Col>
                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Exchange"}>
                            <div style={styleSet.subCardHeader}>
                                {equityViewOrderDetails.exchage}
                            </div>
                        </TypoGraphy>
                    </Col>
                </Row>
                <Row>

                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Segment"}>
                            <div style={styleSet.subCardHeader}>
                                {equityViewOrderDetails.segment}
                            </div>
                        </TypoGraphy>
                    </Col>
                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Custodian/Demat"}>
                            <div style={styleSet.subCardHeader}>
                                {equityViewOrderDetails.custodian}
                            </div>
                        </TypoGraphy>
                    </Col>
                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Order Date"}>
                            <div style={styleSet.subCardHeader}>
                                {equityViewOrderDetails.orderDate}
                            </div>
                        </TypoGraphy>
                    </Col>
                </Row>
                <Row>
                    <Col style={styleSet.container}>
                        <TypoGraphy label={"Confirmation Date"}>
                            <div style={styleSet.subCardHeader}>
                                {equityViewOrderDetails.confirmationDate}
                            </div>
                        </TypoGraphy>
                    </Col>
                </Row>


            </GenericCard>
        </>
    );
};
export default EquityViewOrderDetails;
