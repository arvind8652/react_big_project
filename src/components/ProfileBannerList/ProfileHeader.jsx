import React from 'react';
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Row, Typography, Divider, Progress, PageHeader } from 'antd';
import {
    faMapMarkerAlt,
    faPhoneAlt,
    faEnvelope,
    faArrowLeft,
    faCheckCircle,
    faCaretUp,
    faCaretDown,
    faPaperclip,
    faUpload,
} from "@fortawesome/pro-solid-svg-icons";
import {
    faTrashAlt,
    faEdit,
    faChevronRight,
    faChevronLeft,
    faCircle as NormalFaCircle,
    faPencilAlt,
    faChevronDoubleDown,
    faChevronDoubleUp,
} from "@fortawesome/pro-regular-svg-icons";


const ProfileHeader = () => {
    // const [opportunityData, setOpportunityData] = useState(opportunityViewData);
    // const { opportunityIds, rowIndex, miniMode } = location.state;
    // const history = useHistory();
    // const location = useLocation();
    return (

        <PageHeader
            className="opportunityViewPageHeader"
            // onBack={() => history.push("/dashboard/MyOpportunity")}
            //onBack={() => history.goBack()}

            backIcon={
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="opportunityViewTopBarIcons"
                />
            }
            extra={[
                <FontAwesomeIcon
                    icon={"" && faTrashAlt}
                    onClick={() => ""(true)}
                    className="opportunityViewTopBarIcons"
                />,
                <FontAwesomeIcon
                    icon={"" && faEdit}
                    onClick={""}
                    className="opportunityViewTopBarIcons"
                />,
                <FontAwesomeIcon
                    icon={"" && faChevronLeft}
                    onClick={""}
                    className="opportunityViewTopBarIcons"
                />,
                <FontAwesomeIcon
                    icon={"" && faChevronRight}
                    onClick={""}
                    className="opportunityViewTopBarIcons"
                />,
            ]}
            style={{
                backgroundImage: "linear-gradient(to right, #354081 , #727EC6 )",
                borderBottomRightRadius: "12px",
                borderBottomLeftRadius: "12px",
            }}
        ></PageHeader>
    );
};
export default ProfileHeader;