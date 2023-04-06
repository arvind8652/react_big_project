import { React, useEffect, useState } from "react";
import { Col, Row, Typography, PageHeader, Rate, Avatar, Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faChevronRight,
  faChevronLeft,
  faFileTimes,
  faFileCheck,
} from "@fortawesome/pro-regular-svg-icons";
import DeleteModal from "./DeleteModal";
import GenericBadge from "../../components/GenericBadge/GenericBadge";
import TypoGraphy from "../../components/TypoGraphy/TypoGraphy";
import { palette, theme } from "../../theme";
import { ApproveOrder } from "../PrimaryMarket/OrderBookView/ApproveOrder";
import { RejectOrder } from "../PrimaryMarket/OrderBookView/RejectOrder";

const { Title } = Typography;
const defaultValue = {
  securityInitials: "SI",
  securityName: "Alexandra Romus",
  security: "BDO1928345",
  securityLogo: "http://10.80.0.97:3000/images/logo-dummy.png",
  assetGroupName: "Equity",
  assetTypeName: "Stocks",
  rating: 3,
  tranType: "Buy",
  amount: "6000",
  units: "100",
  mobile: "+63 98468265802",
  email: "alxendra@yahoo.com",
  status: "Order Placed",
  charges: "40",
  securityInitial: "AB",
  currencySymbol: "$",
  accountNatureName: "Advisory",
  profileInitial: "P",
};

const DeptSecViewHeader = ({
  EquityViewProfileBanner,
  pNB = false,
  marketType = "",
  accountId = "",
  onLeftPress = () => {},
  onRightPress = () => {},
  //   setShowApproveModal = () => {},
  //   setShowRejectModal = () => {},
  // setShowDeleteModal = () => {},
}) => {
  const [BannerData, setBannerData] = useState(defaultValue);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  useEffect(() => {
    setBannerData(EquityViewProfileBanner);
  }, [EquityViewProfileBanner]);
  const styleSet = {
    container: {
      color: palette.text.banner,
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
      //color: palette.text.banner,
      //stroke: '#FFFFFF',
      fontSize: "14px",
    },
    eachTag: {
      fontSize: "18px",
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
      fontSize: "20px",
      lineHeight: "16px",
      color: "white",
    },
    accountName: {
      fontSize: "18px",
      color: palette.text.cardBrder,
    },
  };

  const cSReasonList = {
    lookUpValues: [
      {
        data_value: "O",
        display_value: "Others",
      },
      {
        data_value: "1",
        display_value: "Reason 1",
      },
      {
        data_value: "2",
        display_value: "Reason 1",
      },
    ],
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleApproveModal = () => {
    setShowApproveModal(!showApproveModal);
  };
  const handleRejectModal = () => {
    setShowRejectModal(!showRejectModal);
  };

  return (
    <>
      {showDeleteModal && (
        <DeleteModal
          showDeleteModalFlag={showDeleteModal}
          handleDeleteModal={handleDeleteModal}
          reasonList={cSReasonList.lookUpValues}
          customerId={accountId}
        />
        // <CustomerDeleteModal
        //   showDeleteModalFlag={showDeleteModal}
        //   handleDeleteModal={handleDeleteModal}
        //   customerId={customerOnboardingtIds[currentRowCount]}
        // />
      )}
      {showApproveModal && (
        <ApproveOrder
          showApproveModalFlag={showApproveModal}
          handleApproveModal={handleApproveModal}
          accountId={accountId}
          marketType={marketType}
        />
      )}
      {showRejectModal && (
        <RejectOrder
          showApproveModalFlag={showRejectModal}
          handleRejectModal={handleRejectModal}
          accountId={accountId}
          marketType={marketType}
        />
      )}
      <PageHeader
        style={{
          backgroundImage: "linear-gradient(to right, #354081 , #727EC6 )",
          borderRadius: "16px",
        }}
        onBack={() => window.history.back()}
        backIcon={
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="opportunityViewTopBarIcons"
          />
        }
        extra={[
          <FontAwesomeIcon
            icon={faFileCheck}
            onClick={() => handleApproveModal()}
            className="opportunityViewTopBarIcons"
          />,
          <FontAwesomeIcon
            icon={faFileTimes}
            onClick={() => handleRejectModal()}
            className="opportunityViewTopBarIcons"
          />,
          <FontAwesomeIcon
            icon={faTrashAlt}
            onClick={() => setShowDeleteModal(true)}
            className="opportunityViewTopBarIcons"
          />,
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={onLeftPress}
            className="opportunityViewTopBarIcons"
          />,
          <FontAwesomeIcon
            icon={faChevronRight}
            onClick={onRightPress}
            className="opportunityViewTopBarIcons"
          />,
        ]}
      >
        <Row>
          <Col xxl={3} md={4} style={{ marginLeft: "20px" }}>
            {BannerData && (
              <Avatar
                style={styleSet.avatar}
                src={BannerData.securityLogo}
                size={120}
              >
                {BannerData.securityInitials}
              </Avatar>
            )}
          </Col>
          <Col xxl={6} md={7}>
            <Row>
              <Col>
                <Title level={4} style={{ color: "#FFF", margin: 0 }}>
                  {BannerData.securityName}
                </Title>
                <span
                  className="opportunityDescriptionText"
                  style={styleSet.container}
                >
                  {BannerData.id}
                </span>
                <span
                  className="opportunityDescriptionText"
                  style={styleSet.container}
                ></span>
                <span
                  className="opportunityDescriptionText"
                  style={styleSet.iconStyle}
                >
                  <Rate
                    style={styleSet.subIconStyle}
                    disabled
                    defaultValue={BannerData.rating}
                  />
                </span>
              </Col>
            </Row>
            <Row style={{ marginTop: "5px" }}>
              <Col>
                <Tag style={styleSet.eachTag}>{BannerData?.assetGroup}</Tag>
              </Col>
              <Col>
                <Tag style={styleSet.eachTag}>{BannerData?.assetType}</Tag>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            {pNB ? (
              <>
                <Row>
                  <Col span={10}>
                    <div style={theme.dFlex}>
                      <div>
                        {BannerData && (
                          <Avatar
                            style={styleSet.avatar}
                            src={`${BannerData.profileImage}`}
                            size={64}
                          >
                            {BannerData.profileInitial}
                          </Avatar>
                        )}
                      </div>
                      <div style={styleSet.userInfoContainer}>
                        <div style={styleSet.userName}>{BannerData.name}</div>
                        <div style={styleSet.accountName}>
                          {BannerData.accountName}
                        </div>
                        <GenericBadge
                          marginValue={"5px"}
                          badgeBody={BannerData.accountNatureName}
                        ></GenericBadge>
                      </div>
                    </div>
                  </Col>
                  <Col span={7}>
                    <TypoGraphy
                      childrenColor={"#FFFFFF"}
                      labelSize={"large"}
                      labelWhite={"Order Type"}
                    >
                      {BannerData.tranType}
                    </TypoGraphy>
                  </Col>
                  <Col span={7}>
                    <TypoGraphy
                      childrenColor={"#FFFFFF"}
                      labelSize={"large"}
                      labelWhite={"Status"}
                    >
                      {BannerData.status}
                    </TypoGraphy>
                  </Col>
                </Row>
                <Row>
                  <Col span={10}>
                    <TypoGraphy
                      childrenColor={"#FFFFFF"}
                      labelSize={"large"}
                      labelWhite={"Quantity"}
                    >
                      {BannerData.units}
                    </TypoGraphy>
                  </Col>
                  <Col span={7}>
                    <TypoGraphy
                      childrenColor={"#FFFFFF"}
                      labelSize={"large"}
                      labelWhite={"Price"}
                    >
                      {`${BannerData.currencySymbol} ${BannerData.charges} /Unit`}
                    </TypoGraphy>
                  </Col>
                  <Col span={7}>
                    <TypoGraphy
                      childrenColor={"#FFFFFF"}
                      labelSize={"large"}
                      labelWhite={"Amount"}
                    >
                      {`${BannerData.currencySymbol} ${BannerData.amount}`}
                    </TypoGraphy>
                  </Col>
                </Row>
              </>
            ) : (
              <Row gutter={[16, 16]}>
                <Col className="gutter-row" span={8}>
                  <Row
                    gutter={12}
                    className="opportunityDetailText"
                    style={{ ...theme.container, ...styleSet.container }}
                  >
                    {BannerData.tranType}
                  </Row>
                  <Row
                    gutter={16}
                    className="opportunityDescriptionText"
                    style={styleSet.container}
                  >
                    Transaction Type
                  </Row>
                </Col>
                <Col className="gutter-row" span={8}>
                  <Row
                    gutter={16}
                    className="opportunityDetailText"
                    style={{ ...theme.container, ...styleSet.container }}
                  >
                    {BannerData.currencySymbol === null &&
                    BannerData.currencySymbol === ""
                      ? BannerData.currencySymbol + BannerData.status
                      : BannerData.status}
                  </Row>
                  <Row
                    gutter={16}
                    className="opportunityDescriptionText"
                    style={styleSet.container}
                  >
                    Status
                  </Row>
                </Col>
                <Col className="gutter-row" span={8}>
                  <Row
                    gutter={12}
                    className="opportunityDetailText"
                    style={{ ...theme.container, ...styleSet.container }}
                  >
                    {BannerData.currencySymbol} {BannerData.amount}
                  </Row>
                  <Row
                    gutter={16}
                    className="opportunityDescriptionText"
                    style={styleSet.container}
                  >
                    Amount
                  </Row>
                </Col>
                <Col className="gutter-row" span={8}>
                  <Row
                    gutter={16}
                    className="opportunityDetailText"
                    style={{ ...theme.container, ...styleSet.container }}
                  >
                    {BannerData.currencySymbol} {BannerData.units}
                  </Row>
                  <Row
                    gutter={16}
                    className="opportunityDescriptionText"
                    style={styleSet.container}
                  >
                    Quantity
                  </Row>
                </Col>
                <Col className="gutter-row" span={8}>
                  <Row
                    gutter={16}
                    className="opportunityDetailText"
                    style={{ ...theme.container, ...styleSet.container }}
                  >
                    {BannerData.charges} /Unit
                  </Row>
                  <Row
                    gutter={16}
                    className="opportunityDescriptionText"
                    style={styleSet.container}
                  >
                    Charges
                  </Row>
                </Col>
                <Col className="gutter-row" span={8}>
                  <Row
                    gutter={16}
                    className="opportunityDetailText"
                    style={{ ...theme.container, ...styleSet.container }}
                  >
                    {BannerData.currencySymbol}
                  </Row>
                  <Row
                    gutter={16}
                    className="opportunityDescriptionText"
                    style={styleSet.container}
                  >
                    Currency Symbol
                  </Row>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </PageHeader>
    </>
  );
};

export default DeptSecViewHeader;
