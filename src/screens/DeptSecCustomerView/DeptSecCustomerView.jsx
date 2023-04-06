import { Row, Col, Card } from "antd";
import { useState, useEffect } from "react";
import BackToTop from "../../components/BackToTop/BackToTop";
import AttachmentUploadModal from "../../components/AttachmentPannel/AttachmentUploadModal";
import { DocumentCardWithUpload } from "../../components/DocumentTable/DocumentCardWithUpload";
import GenericCard from "../../components/GenericCard/GenericCard";
import GenHorizontalTimeline from "../../components/GenHorizontalTimeline/GenHorizontalTimeline";
import { theme } from "../../theme";

import { ComplianceDetailsView } from "../PrimaryMarket/OrderBookView/ComplianceDetailsView";
import { PaymentDetailsView } from "../PrimaryMarket/OrderBookView/PaymentDetailsView";
import { SecurityDetailsView } from "../PrimaryMarket/OrderBookView/SecurityDetailsView";
import { connect } from "react-redux";
import { getOrderAttachmentDetails } from "../../api/primaryMarketApi";
import { executeGetSMOrderDetailsByID } from "../../redux/actions/pNBActions";
import { ApproveOrder } from "../PrimaryMarket/OrderBookView/ApproveOrder";
import { RejectOrder } from "../PrimaryMarket/OrderBookView/RejectOrder";
import OrderDetailsCard from "./OrderDetailsCard";
import OtherDetailsCard from "./OtherDetailsCard";
import DeptSecViewHeader from "./DeptSecViewHeader";
import { useHistory, useLocation } from "react-router-dom";

const DeptSecCustomerView = ({
  executeGetSMOrderDetailsByID,
  pNBData,
  allCustomerOrderData,
}) => {
  const styleSet = {
    cardStyle: {
      margin: "10px 0px",
    },
  };
  const history = useHistory();
  const location = useLocation();
  const [dealId, setDealID] = useState(location.state.dealId);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [attachmentDetails, setAttachmentDetails] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rowNumber, setRowNumber] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (allCustomerOrderData) {
      let record = allCustomerOrderData.orderBookList.find(
        (each) => each.dealId === location.state.dealId
      );
      setRowNumber(record.rowNumber);
    }
  }, [allCustomerOrderData, location.state.dealId]);

  useEffect(() => {
    console.log(rowNumber, dealId);
    if (allCustomerOrderData && rowNumber) {
      let record = allCustomerOrderData.orderBookList.find(
        (each) => each.rowNumber === rowNumber
      );
      if (record) {
        if (record.dealId.startsWith("MF")) {
          if (record.dealId && record.dealId !== dealId) {
            setDealID(record.dealId);
          }
        } else {
          console.log("Primary", record.dealId);
          history.replace("OrderView", {
            dealId: record.dealId,
            marketType: "Primary",
          });
        }
      }
    }
  }, [rowNumber, allCustomerOrderData]);

  useEffect(() => {
    executeGetSMOrderDetailsByID(dealId);
    getAttachmentData();
  }, [dealId]);

  const getAttachmentData = async () => {
    try {
      let resp = await getOrderAttachmentDetails(
        "ORDERSMADD",
        "MF201800140000046"
      );
      if (resp.status) {
        setAttachmentDetails(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RENDER_CARDS = [
    {
      title: "Security Details",
      components: (
        <SecurityDetailsView
          apiData={
            pNBData && pNBData?.securityModel
              ? pNBData?.securityModel[0]?.security
              : null
          }
          scheme={pNBData && pNBData?.dealRequisitions?.scheme}
          marketType="Secondary"
        />
      ),
    },
    {
      title: "Order Details",
      components: (
        <OrderDetailsCard apiData={pNBData && pNBData?.dealRequisitions} />
      ),
    },
    {
      title: "Payment Details",
      components: (
        <PaymentDetailsView
          paymentDetails={pNBData && pNBData?.dealRequisitions}
        />
      ),
    },
    {
      title: "Compliance Details",
      components: (
        <ComplianceDetailsView
          compliaceDetails={pNBData && pNBData.complianceDetails}
        />
      ),
    },
    {
      title: "Other Details",
      components: (
        <OtherDetailsCard apiData={pNBData && pNBData.dealRequisitions} />
      ),
    },
    // {
    //   title: "Address Details",
    //   components: (
    //     <AddressDetailsView
    //       addressDetails={orderDetails && orderDetails?.dealRequisitions}
    //     />
    //   ),
    // },
  ];
  const handleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  const handleApproveModal = () => {
    setShowApproveModal(!showApproveModal);
  };
  const handleRejectModal = () => {
    setShowRejectModal(!showRejectModal);
  };

  const onRightPress = () => {
    setRowNumber(rowNumber + 1);
    return;
  };
  const onLeftPress = () => {
    setRowNumber(rowNumber - 1);
    return;
  };

  const dealRequisitions = {
    securityInitials: pNBData?.dealRequisitions?.securityInitials,
    securityName: pNBData?.dealRequisitions?.securityName,
    security: pNBData?.dealRequisitions?.security,
    securityLogo: "http://10.80.0.97:3000/images/logo-dummy.png",
    assetGroup: pNBData?.dealRequisitions?.assetGroupName,
    assetType: pNBData?.dealRequisitions?.assetTypeName,
    rating: 3,
    tranType: pNBData?.dealRequisitions?.tranType,
    amount: pNBData?.dealRequisitions?.fcyGrossVal,
    units: pNBData?.dealRequisitions?.units,
    mobile: "+63 98468265802",
    email: "alxendra@yahoo.com",
    name: pNBData?.dealRequisitions?.customerName,
    accountName: pNBData?.dealRequisitions?.schemeName,
    status: pNBData?.orderStatus,
    charges: pNBData?.dealRequisitions?.rate,
    securityInitial: "AB",
    currencySymbol: pNBData?.dealRequisitions?.currencySymbol,
    accountNatureName: pNBData?.dealRequisitions?.accountNatureName,
    profileInitial: pNBData?.dealRequisitions?.profileInitial,
  };

  return (
    <>
      {showApproveModal && (
        <ApproveOrder
          showApproveModalFlag={showApproveModal}
          handleApproveModal={handleApproveModal}
          marketType="Secondary"
          dealId={dealId}
        />
      )}
      {/* <h1>OrderBook360 Order Page</h1> */}
      {showRejectModal && (
        <RejectOrder
          showApproveModalFlag={showRejectModal}
          handleRejectModal={handleRejectModal}
          dealId={dealId}
          // setBoolean={setIsLoadingDataView}
          marketType="Secondary"
        />
      )}
      <Row>
        <Col span={24} style={styleSet.cardStyle}>
          <DeptSecViewHeader
            EquityViewProfileBanner={dealRequisitions}
            pNB={true}
            marketType={location.state?.marketType}
            accountId={dealId}
            onLeftPress={onLeftPress}
            onRightPress={onRightPress}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card style={theme.cardStyle}>
            <GenHorizontalTimeline timelineData={pNBData?.horizontalTimeline} />
          </Card>
        </Col>
      </Row>
      <Row>
        {RENDER_CARDS.map((ele) => {
          return (
            <Col span={24} style={styleSet.cardStyle}>
              <GenericCard header={ele.title}>{ele.components}</GenericCard>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col span={24} style={styleSet.cardStyle}>
          {/* <DocumentCardWithUpload showNoData={true} /> */}
          <DocumentCardWithUpload
            showNoData={true}
            data={
              pNBData?.uploadedDocInfo &&
              pNBData?.uploadedDocInfo?.lstDocumentInfo
            }
            action={"view"}
          />
        </Col>
      </Row>
      <AttachmentUploadModal
        menuFlag={0}
        data={attachmentDetails}
        action={"view"}
      />
      <Row>
        <BackToTop />
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    pNBData: state.pNBData.smOrderDetailsByID,
    allCustomerOrderData: state.orderBook.orderBookList,
  };
};
const mapDispatchToProps = {
  executeGetSMOrderDetailsByID,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeptSecCustomerView);
