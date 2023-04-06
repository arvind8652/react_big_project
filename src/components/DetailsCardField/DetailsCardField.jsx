import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Col, Row } from "antd";
import { theme, fontSet, palette } from "../../theme";
import { connect } from "react-redux";

const DetailsCardField = ({ headerText, descriptionText }) => {

    const styleSet = {
        _headerText: {
            fontSize: fontSet.body.xlarge,
            color: palette.secondary.heavy,
            marginBottom: 5,
        },
        _descriptionText: {
            fontSize: fontSet.body.medium,
            color: palette.secondary.main,
        },
    }

    return (
        <Col>
            <Row>
                <span style={styleSet._headerText}>{headerText}</span>
            </Row>
            <Row>
                <span style={styleSet._descriptionText}>{descriptionText}</span>
            </Row>
        </Col>
    )
}

export default connect()(DetailsCardField);