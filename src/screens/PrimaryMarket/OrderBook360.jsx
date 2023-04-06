import { Row, Col } from "antd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import {
  getOrderDetails,
  getOrderAttachmentDetails,
} from "../../api/primaryMarketApi";
import AttachmentUploadModal from "../../components/AttachmentPannel/AttachmentUploadModal";
import BackToTop from "../../components/BackToTop/BackToTop";
import GenericCard from "../../components/GenericCard/GenericCard";
import { AddressDetailsView } from "./OrderBookView/AddressDetailsView";
import { AllotmentDetailsView } from "./OrderBookView/AllotmentDetailsView";
import { ApproveOrder } from "./OrderBookView/ApproveOrder";
import { ComplianceDetailsView } from "./OrderBookView/ComplianceDetailsView";
import { OrderBookHeader } from "./OrderBookView/OrderBookHeader";
import { OrderDetailsView } from "./OrderBookView/OrderDetailsView";
import { OrderHorizontalTimeline } from "./OrderBookView/OrderHorizontalTimeline";
import { OtherDetailsView } from "./OrderBookView/OtherDetailsView";
import { PaymentDetailsView } from "./OrderBookView/PaymentDetailsView";
import { RejectOrder } from "./OrderBookView/RejectOrder";
import { SecurityDetailsView } from "./OrderBookView/SecurityDetailsView";
import { DeleteOrder } from "./OrderBookView/DeleteOrder";
import { DocumentCardWithUpload } from "../../components/DocumentTable/DocumentCardWithUpload";
const styleSet = {
  cardStyle: {
    margin: "10px 0px",
  },
};

const OrderBook360 = () => {
  const location = useLocation();
  const history = useHistory();
  const [dealId, setDealID] = useState(location.state.dealId);
  const [rowNumber, setRowNumber] = useState();

  const [orderDetails, setOrderDetails] = useState({});
  const [attachmentDetails, setAttachmentDetails] = useState([]);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [documentData, setDocumentData] = useState({});
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoadingDataView, setIsLoadingDataView] = useState(true);

  const allCustomerOrderData = useSelector(
    (state) => state.orderBook.orderBookList
  );

  useEffect(() => {
    if (allCustomerOrderData) {
      let record = allCustomerOrderData.orderBookList.find(
        (each) => each.dealId === location.state.dealId
      );
      setRowNumber(record.rowNumber);
    }
  }, [allCustomerOrderData, location.state.dealId]);

  useEffect(() => {
    if (allCustomerOrderData && rowNumber) {
      let record = allCustomerOrderData.orderBookList.find(
        (each) => each.rowNumber === rowNumber
      );
      if (record) {
        if (record.dealId.startsWith("PM")) {
          if (record.dealId && record.dealId !== dealId) {
            setDealID(record.dealId);
          }
        } else {
          console.log("Secondary", record.dealId);
          history.replace("OrderBookView", {
            dealId: record.dealId,
            marketType: "Secondary",
          });
        }
      }
    }
  }, [rowNumber, allCustomerOrderData]);

  useEffect(() => {
    if (dealId) {
      getOrderData();
      getAttachmentData();
    }
  }, [dealId]);

  useEffect(() => {
    if (!isLoadingDataView) {
      setIsLoadingDataView(true);
      getOrderData();
      getAttachmentData();
    }
  }, [isLoadingDataView]);

  const getAttachmentData = async () => {
    try {
      let resp = await getOrderAttachmentDetails("ORDERPRADD", dealId);
      if (resp.status) {
        setAttachmentDetails(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRightPress = () => {
    setRowNumber(rowNumber + 1);
    return;
  };
  const onLeftPress = () => {
    setRowNumber(rowNumber - 1);
    return;
  };

  const getOrderData = async () => {
    try {
      let resp = await getOrderDetails(dealId);
      if (resp.status) {
        setOrderDetails(resp.data);
      }
    } catch (error) {
      return;
    }
  };

  const RENDER_CARDS = [
    {
      title: "Security Details",
      components: (
        <SecurityDetailsView
          apiData={orderDetails?.pmDealRequisitions}
          scheme={orderDetails?.pmDealRequisitions?.scheme}
          marketType="PRIMARY"
        />
      ),
    },
    {
      title: "Allotment Details",
      components: (
        <AllotmentDetailsView details={orderDetails?.allotmentDetails} />
      ),
    },
    {
      title: "Payment Details",
      components: (
        <PaymentDetailsView
          paymentDetails={orderDetails && orderDetails?.pmDealRequisitions}
        />
      ),
    },
    {
      title: "Order Details",
      components: (
        <OrderDetailsView
          orderDetails={orderDetails && orderDetails?.pmDealRequisitions}
        />
      ),
    },
    {
      title: "Compliance Details",
      components: (
        <ComplianceDetailsView
          compliaceDetails={orderDetails && orderDetails?.complianceDetails}
        />
      ),
    },
    {
      title: "Other Details",
      components: (
        <OtherDetailsView
          otherDetails={orderDetails && orderDetails?.pmDealRequisitions}
        />
      ),
    },
    {
      title: "Address Details",
      components: (
        <AddressDetailsView
          addressDetails={orderDetails && orderDetails?.pmDealRequisitions}
        />
      ),
    },
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

  const docDetailsObj = {
    AssetType: orderDetails?.pmDealRequisitions
      ? orderDetails?.pmDealRequisitions?.assetType
      : "BND",
    OrderType: orderDetails?.pmDealRequisitions
      ? orderDetails?.pmDealRequisitions?.orderType
      : "BUY",
  };

  return (
    <>
      {showApproveModal && (
        <ApproveOrder
          showApproveModalFlag={showApproveModal}
          handleApproveModal={handleApproveModal}
          dealId={dealId}
          setBoolean={setIsLoadingDataView}
          marketType="Primary"
        />
      )}
      {showRejectModal && (
        <RejectOrder
          showApproveModalFlag={showRejectModal}
          handleRejectModal={handleRejectModal}
          dealId={dealId}
          setBoolean={setIsLoadingDataView}
          marketType="Primary"
        />
      )}
      {showDeleteModal && (
        <DeleteOrder
          showDeleteModalFlag={showDeleteModal}
          handleDeleteModal={handleDeleteModal}
          dealId={dealId}
        />
      )}
      {/* <h1>OrderBook360 Order Page</h1>  */}
      <Row style={{ marginTop: "2em" }}>
        <Col span={24} style={styleSet.cardStyle}>
          <OrderBookHeader
            setShowApproveModal={handleApproveModal}
            setShowRejectModal={handleRejectModal}
            setShowDeleteModal={handleDeleteModal}
            orderData={orderDetails && orderDetails?.pmDealRequisitions}
            orderStatus={orderDetails && orderDetails?.orderStatus}
            onLeftPress={onLeftPress}
            onRightPress={onRightPress}
            dealId={dealId}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24} style={styleSet.cardStyle}>
          <OrderHorizontalTimeline
            horizontalTimeline={
              orderDetails && orderDetails?.horizontalTimeline
            }
          />
        </Col>
      </Row>
      <Row>
        {RENDER_CARDS.map((ele, idx) => {
          return (
            <Col span={24} style={styleSet.cardStyle} key={idx}>
              <GenericCard header={ele.title}>{ele.components}</GenericCard>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col span={24} style={styleSet.cardStyle}>
          <DocumentCardWithUpload
            data={
              orderDetails?.uploadedDocInfo &&
              orderDetails?.uploadedDocInfo?.lstDocumentInfo
            }
            docDetailsObj={docDetailsObj}
            setDocumentData={(data) => setDocumentData(data)}
            action={"view"}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24} style={styleSet.cardStyle}>
          <AttachmentUploadModal
            menuFlag={0}
            data={attachmentDetails}
            action={"view"}
          />
        </Col>
      </Row>
      <Row>
        <BackToTop />
      </Row>
    </>
  );
};

export default OrderBook360;
