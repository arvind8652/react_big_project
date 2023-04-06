import React, { useEffect, useState } from 'react'
import { Col, Card, Row } from 'antd'
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericBadge from "../GenericBadge/GenericBadge";
import GenericCardWithImages from "../GenericCard/GenericCardWithImages";
import { theme } from "../../theme";
import moment from 'moment'

const Feed = (props) => {
    const { feedData, feedInDetailHandler, viewType } = props

    function truncate(str, n) {
        if (viewType == "cardView") {
            return str ?.length > n ? str.substr(0, n - 1) + "..." : str;
        }
        else {
            return str;
        }
    }
    let imgPath = "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png";

    return (

        <GenericCardWithImages imgPath={imgPath} actionHandler={feedInDetailHandler} detailData={feedData} types={2} viewType={viewType} >
            <Row>
                <Col span={12} style={theme.dFlex}>
                    <div>
                        <FontAwesomeIcon icon={faBookOpen} />
                    </div>
                    <div style={{ marginLeft: "5px" }}>
                        <GenericBadge badgeBody={feedData.tag} />
                    </div>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                    {moment(feedData.date).format('DD MMMM YYYY')}
                    {/* {feedData.date} */}
                </Col>
            </Row>

            <Row style={{ marginBottom: "12px" }}>
                <Col>
                    <div
                        style={{ ...theme.primaryHeader, ...theme.headerM }}
                    >
                        {truncate(feedData.feedTitle, 100)}
                    </div>
                    <div style={theme.secondaryBody}>{truncate(feedData.feedBody, 50)}</div>
                </Col>
            </Row>
        </GenericCardWithImages>
    )
}

export default Feed
