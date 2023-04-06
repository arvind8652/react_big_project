import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Row } from "antd";
import { theme, fontSet, palette } from "../../theme";
import { connect } from "react-redux";

const SocialAppLink = ({ faIcon, userName, color }) => {

    const styleSet = {
        fontIcon: {
            marginLeft: 8,
            width: 32,
            height: 32,
        },
        userNameId: {
            fontSize: fontSet.body.xlarge,
            color: palette.secondary.heavy,
            underline: { textDecorationLine: 'underline' }
        }
    }

    return (
        <Row>
            <FontAwesomeIcon icon={faIcon} color={color} style={styleSet.fontIcon} />
            <span style={styleSet.userNameId}>{userName}</span>
        </Row>
    )
}

export default connect()(SocialAppLink);