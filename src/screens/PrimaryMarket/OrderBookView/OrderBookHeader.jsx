import { Col, Row, Typography, PageHeader, Rate, Avatar, Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faChevronRight,
  faChevronLeft,
  faFileTimes,
  faFileCheck,
} from "@fortawesome/pro-regular-svg-icons";
import { palette, theme } from "../../../theme";
import TypoGraphy from "../../../components/TypoGraphy/TypoGraphy";
import GenericBadge from "../../../components/GenericBadge/GenericBadge";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const { Title } = Typography;

export const OrderBookHeader = ({
  orderData = {},
  orderStatus = "-",
  onLeftPress = () => {},
  onRightPress = () => {},
  setShowApproveModal = () => {},
  setShowRejectModal = () => {},
  setShowDeleteModal = () => {},
  dealId,
}) => {
  const styleSet = {
    container: {
      color: palette.text.banner,
      fontSize: "12px",
    },
    subContainer: {
      color: palette.text.banner,
      align: "top",
    },
    iconStyle: {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
    },
    subIconStyle: {
      fontSize: "14px",
    },
    eachTag: {
      fontSize: "14px",
      borderRadius: "16px",
      padding: "2px 10px",
      marginBottom: "5px",
      color: "#354081",
      backgroundColor: "#D9DFFF;",
    },
    avatar: {
      color: "#f56a00",
      backgroundColor: "#fde3cf",
      fontSize: "2.5rem",
    },
    userInfoContainer: {
      margin: "0px 10px",
    },
    userName: {
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "16px",
      color: "#FFFFFF",
    },
    accountName: {
      fontSize: "18px",
      color: palette.text.cardBrder,
    },
  };

  const userRole = useSelector((state) => state.auth.user.userRole);

  const [accessType, setAccessType] = useState("Other");

  useEffect(() => {
    if (userRole && orderData.workFlowFormType) {
      if (orderData.workFlowFormType === "ApproveReject" && orderData.workFlowUserGroup === userRole) {
        setAccessType("ApproveReject");
      } else if (orderData.workFlowFormType === "Modificaiton" && orderData.workFlowUserGroup === userRole) {
        setAccessType("Modificaiton");
      }
    }
  }, [userRole, orderData, dealId]);

  return (
    <PageHeader
      style={{
        backgroundImage: "linear-gradient(to right, #354081 , #727EC6 )",
        marginTop: "-5.5rem",
        borderRadius: "16px",
      }}
      onBack={() => window.history.back()}
      backIcon={<FontAwesomeIcon icon={faChevronLeft} className="opportunityViewTopBarIcons" />}
      extra={[
        <FontAwesomeIcon
          icon={faFileCheck}
          onClick={() => setShowApproveModal(true)}
          className="opportunityViewTopBarIcons"
          style={accessType === "ApproveReject" ? { display: "initial" } : { display: "none" }}
        />,
        <FontAwesomeIcon
          icon={faFileTimes}
          onClick={() => setShowRejectModal(true)}
          className="opportunityViewTopBarIcons"
          style={accessType === "ApproveReject" ? { display: "initial" } : { display: "none" }}
        />,
        <FontAwesomeIcon
          icon={faTrashAlt}
          onClick={() => setShowDeleteModal(true)}
          className="opportunityViewTopBarIcons"
          style={accessType === "Modificaiton" ? { display: "initial" } : { display: "none" }}
        />,
        <FontAwesomeIcon icon={faChevronLeft} onClick={() => onLeftPress()} className="opportunityViewTopBarIcons" />,
        <FontAwesomeIcon icon={faChevronRight} onClick={() => onRightPress()} className="opportunityViewTopBarIcons" />,
      ]}
    >
      <Row>
        <Col xxl={2} md={3} style={{ marginLeft: "10px" }}>
          {orderData && orderData?.securityLogo != null ? (
            <Avatar style={styleSet.avatar} src={`${orderData?.securityLogo}`} size={80}></Avatar>
          ) : (
            <Avatar style={styleSet.avatar} size={80}>
              {orderData && orderData?.securityInitials}
            </Avatar>
          )}
        </Col>
        <Col xxl={7} md={8}>
          <Row>
            <Col>
              <Title level={4} style={{ fontSize: "16px", color: "#FFF", margin: 0 }}>
                {orderData && orderData?.securityName}
              </Title>
              <span style={styleSet.container}>{orderData && orderData?.isin}</span>
              <span style={styleSet.accountName}> | </span>
              <span className="opportunityDescriptionText" style={styleSet.iconStyle}>
                <Rate style={styleSet.subIconStyle} disabled defaultValue={orderData && orderData?.rating} />
              </span>
            </Col>
          </Row>
          <Row style={{ marginTop: "5px" }}>
            <Col>
              <Tag style={styleSet.eachTag}>{orderData && orderData?.assetGroupName}</Tag>
            </Col>
            <Col>
              <Tag style={styleSet.eachTag}>{orderData && orderData?.assetTypeName}</Tag>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={10}>
              <div style={theme.dFlex}>
                <div>
                  {orderData && orderData?.profileImage != null ? (
                    <Avatar style={styleSet.avatar} src={`${orderData?.profileImage}`} size={30}></Avatar>
                  ) : (
                    <Avatar style={styleSet.avatar} size={30}>
                      {orderData && orderData?.profileInitial}
                    </Avatar>
                  )}
                </div>
                <div style={styleSet.userInfoContainer}>
                  <div style={styleSet.userName}>{orderData && orderData?.customerName}</div>
                  <div style={styleSet.accountName}>{orderData && orderData?.accountName}</div>
                  <GenericBadge
                    marginValue={"5px 0px"}
                    badgeBody={orderData && orderData?.accountNatureName}
                  ></GenericBadge>
                </div>
              </div>
            </Col>
            <Col span={7}>
              <TypoGraphy childrenColor={"#FFFFFF"} labelSize={"small"} labelWhite={"Order Type"}>
                <Typography.Text
                  ellipsis={{ tooltip: [orderData?.orderType] }}
                  style={{ width: "120px", color: "#FFFFFF" }}
                >
                  {orderData && orderData?.orderType}
                </Typography.Text>
              </TypoGraphy>
            </Col>
            <Col span={7}>
              <TypoGraphy childrenColor={"#FFFFFF"} labelSize={"small"} labelWhite={"Order Status"}>
                {orderStatus}
              </TypoGraphy>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <TypoGraphy childrenColor={"#FFFFFF"} labelSize={"small"} labelWhite={"Quantity"}>
                {orderData && orderData?.eligUnits}
              </TypoGraphy>
            </Col>
            <Col span={6}>
              <TypoGraphy childrenColor={"#FFFFFF"} labelSize={"small"} labelWhite={"Price"}>
                {`${orderData && orderData?.currencySymbol} ${orderData && orderData?.appAmount} /Unit`}
              </TypoGraphy>
            </Col>
            <Col span={6}>
              <TypoGraphy childrenColor={"#FFFFFF"} labelSize={"small"} labelWhite={"Charges"}>
                {`${orderData && orderData?.currencySymbol} ${orderData && orderData?.fcyArrangerFee}`}
              </TypoGraphy>
            </Col>
            <Col span={6}>
              <TypoGraphy childrenColor={"#FFFFFF"} labelSize={"small"} labelWhite={"Amount"}>
                {`${orderData && orderData?.currencySymbol} ${orderData && orderData?.fcyTotPaid}`}
              </TypoGraphy>
            </Col>
          </Row>
        </Col>
      </Row>
    </PageHeader>
  );
};
