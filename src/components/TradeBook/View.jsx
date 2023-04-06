import { Row, Col } from "antd";

// import EquityViewComplianceBreaches from '../OrderBookEquityViewTabs/EquityViewComplianceBreaches';
import FundDetails from "../../components/TradeBook/FundDetails";
import GenericPageHeader from "./GenericPageHeader";
// import EquityViewDocumentsDetails from '../OrderBookEquityViewTabs/EquityViewDocumentsDetails';
import OrderDetails from "../../components/TradeBook/OrderDetails";
// import AttachmentDetails from '../../screens/ProspectViewScreen/ProspectComponent/AttachmentsCardView';
import { DocumentCardWithUpload } from "../../components/DocumentTable/DocumentCardWithUpload";
import GenericCardWithTabs from "../GenericCard/GenericCardWithTabs";

import OrderVerticalTimeline from "../VerticalTimeline/OrderVerticalTimeline";
import { connect } from "react-redux";
import AttachmentUploadModal from "../AttachmentPannel/AttachmentUploadModal";

function TradeBookView(props) {
  const styles = {
    tabStyle: {
      width: "100%",
      marginBottom: "15px",
    },
    cardStyle: {
      margin: "12px 0px",
      marginBottom: "5px",
      borderRadius: "8px solid red",
    },
    tabBarActive: {
      color: "#354081",
      fontSize: "18px",
    },
    tabBarNormal: {
      color: "#898EA9",
      fontSize: "18px",
    },
  };

  const renderObject = {
    fundDetails: {
      title: "Fund Details",
      render: <FundDetails />,
    },
    timeline: {
      title: "Timeline",
      render: <OrderVerticalTimeline />,
    },
  };

  const dummyData = [
    {
      RefType: "CLIENTADD",
      RefId: null,
      FileDescription: "Profile Phto",
      fileName: "p1rofile.png",
      fileSize: "5.4KB",
      Mimetype: "image/png",
      attachedBy: "Dummy Name",
      AttachmentFor: "Profile Photo",
      SessionId: "",
      submissionDate: "2011-10-05T14:48:00.000Z",
      expiryDate: "2011-10-05T14:48:00.000Z",
      actionDate: "2011-10-05T14:48:00.000Z",
      fileString:
        "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",
    },
  ];

  return (
    <>
      <Row style={styles.cardStyle}>
        <Col span={24}>
          <GenericPageHeader
            EquityViewProfileBanner={props.data}
            onRightPress={props?.onRightPress}
            onLeftPress={props?.onLeftPress}
          />
        </Col>
      </Row>
      <Row gutter={[16, 24]} style={{ marginTop: "2em" }}>
        <Col span={24}>
          <GenericCardWithTabs renderObject={renderObject} />
        </Col>

        <Col span={24}>
          <OrderDetails />
        </Col>

        {/* THIS TAB WILL BE ADDED LATER */}
        {/* <Col span={24}>
          <EquityViewComplianceBreaches />
        </Col> */}
        <Col span={24}>
          <AttachmentUploadModal
            data={
              props?.tradeBookViewAttachmentDetails?.length === 0
                ? dummyData
                : props?.tradeBookViewAttachmentDetails
            }
            type={props?.progName}
            selectedAccount={{ scheme: props?.data?.dealId }}
            buttonTitle=""
            // data={allAttachmentData && allAttachmentData}
          />
          {/* <AttachmentDetails /> */}
        </Col>
        <Col span={24}>
          <DocumentCardWithUpload
            showUploadButton={false}
            data={
              props?.tradeBookViewDocumentDetails?.lstDocumentInfo?.length === 0
                ? dummyData
                : props?.tradeBookViewDocumentDetails?.lstDocumentInfo
            }
            showNoData={true}
          />
          {/* <EquityViewDocumentsDetails /> */}
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tradeBookViewAttachmentDetails:
      state?.tradeBookView?.tradeBookViewAttachmentDetails,
    // tradeBookViewDocumentDetails: state?.tradeBookView?.tradeBookViewDocumentDetails
    tradeBookViewDocumentDetails:
      state?.tradeBookView?.tradeBookViewDetails?.uploadedDocInfo,
  };
};

export default connect(mapStateToProps)(TradeBookView);
