import { faChevronLeft } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Button, Col, Row } from "antd";
import { useHistory } from "react-router-dom";
import { theme } from "../../theme";
//import "./dashboardScreenTopbar.scss";

const ReportScreenTopbar = ({
    screenText,
    breadCrumb,
    cancelBtnText,
    submitBtnText,
    onCancel,
    onSubmit,
    showBackArrow = true,
    disabledVal = false,
}) => {
    const history = useHistory();
    return (
        <Row align="middle" justify="space-between" className="create-form-topbar">
            <Col>
                <Row align="top" justify="space-around">
                    {/* {
                        showBackArrow
                        &&
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className="back-icon"
                            size="2x"
                            onClick={() => history.goBack()}
                        />
                    } */}
                    <div >
                        <div style={theme.bannerMainHeading}>{screenText}</div>
                        <Breadcrumb style={theme.bannerMainHeading}>
                            <Breadcrumb.Item>{breadCrumb}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </Row>
            </Col>
            <Col>
                <Row
                    align="middle"
                    justify="space-between"
                    className="form-btn-section"
                >
                    <Button type="text" onClick={() => history.goBack()} style={theme.bannerSubHeading}>
                        {cancelBtnText}
                    </Button>
                    <Button type="primary" disabled={disabledVal} onClick={onSubmit} className="btn submit">
                        {submitBtnText}
                    </Button>
                </Row>
            </Col>
        </Row>
    );
};

export default ReportScreenTopbar;
