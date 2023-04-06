import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { Row, Col } from "antd";
import GenericCardInput from "../../components/GenericInput/GenericCardInput";
import CustomModal from "../../components/Modal/CustomModal/CustomModal";

import { setPrimaryOrder } from "../../redux/actions/primaryMarketActions";
import GenericTable from "../../components/GenericTable/GenericTable";

export const OrderType = ({
  handleFormValues,
  returnValidators,
  whichInvestment,
  exploreProductData = [],
}) => {
  const formDetails = {
    label: "Select Order Type",
    type: "Select",
    options: [
      { key: "N", value: "New Fund" },
      { key: "S", value: "Switch" },
    ],
    key: "key",
    value: "value",
    rules: whichInvestment === "EQ" ? [] : returnValidators("PMOrderType"),
  };

  const [showFirstModal, setShowFirstModal] = useState(false);
  const dispatch = useDispatch();

  const [visibleExplore, setVisibleExplore] = useState(false);
  const [exploreModalDataVal, setExploreModalDataVal] = useState([]);
  // console.log("Trantyp=>", transactionType);

  // useEffect(()=>{
  //   setExploreModalDataVal(exploreProductData)
  // },[exploreProductData])

  const renderSecurityIdColumn = (securityId, dataObject) => {
    return dataObject?.security;
  };

  const renderSecurityNameColumn = (securityName, dataObject) => {
    return dataObject?.securityName;
  };

  const renderMinimumAmountColumn = (minimumAmount, dataObject) => {
    return dataObject?.appMinimum;
  };

  const renderMultipleColumn = (multiple, dataObject) => {
    return dataObject?.marketLot;
  };
  const renderRecommendedPriceColumn = (recommendedPrice, dataObject) => {
    return dataObject?.buyOfferPrice;
  };

  const renderIndicativeRateColumn = (indicativeRate, dataObject) => {
    return dataObject?.penIntInt;
  };

  const tablecolumns = [
    {
      title: "Security ID",
      dataIndex: "securityId",
      key: "securityId",
      align: "center",
      render: (securityId, exploreModalDataVal) =>
        renderSecurityIdColumn(securityId, exploreModalDataVal),
    },
    {
      title: "Security Name",
      dataIndex: "securityName",
      key: "securityName",
      align: "center",
      render: (securityName, exploreModalDataVal) =>
        renderSecurityNameColumn(securityName, exploreModalDataVal),
    },
    {
      title: "Minimum Amount",
      dataIndex: "minimumAmount",
      key: "minimumAmount",
      align: "center",
      render: (minimumAmount, exploreModalDataVal) =>
        renderMinimumAmountColumn(minimumAmount, exploreModalDataVal),
    },
    {
      title: "Multiple",
      dataIndex: "multiple",
      key: "multiple",
      align: "center",
      render: (multiple, exploreModalDataVal) =>
        renderMultipleColumn(multiple, exploreModalDataVal),
    },
    {
      title: "Recommended Price",
      dataIndex: "recommendedPrice",
      key: "recommendedPrice",
      align: "center",
      render: (recommendedPrice, exploreModalDataVal) =>
        renderRecommendedPriceColumn(recommendedPrice, exploreModalDataVal),
    },
  ];

  if (whichInvestment !== "EQ") {
    tablecolumns.push({
      title: "Indicative Rate",
      dataIndex: "indicativeRate",
      key: "indicativeRate",
      align: "center",
      render: (indicativeRate, exploreModalDataVal) =>
        renderIndicativeRateColumn(indicativeRate, exploreModalDataVal),
    });
  }

  const modalTableOpt = {
    checkbox: false,
    expandableRow: false,
    favorite: false,
    pagination: false,
    isMenuOptions: false,
  };

  const onChange = (val) => {
    if (val === "S") {
      setShowFirstModal(true);
    }
    handleFormValues({ tranType: val });
    dispatch(
      setPrimaryOrder({
        tranType: val,
      })
    );
  };

  const handleModalCancel = () => {
    setShowFirstModal(false);
    handleFormValues({ tranType: "" });
  };
  const handleModalOk = () => {
    setShowFirstModal(false);
  };
  return (
    <Row>
      <GenericCardInput
        item={formDetails}
        onChange={(val) => onChange(val)}
        itemName="tranType"
      />
      <Col offset={2} style={{ marginTop: "3em" }}>
        <h1 onClick={() => setVisibleExplore(true)}>Explore</h1>
      </Col>
      <CustomModal visible={showFirstModal}>
        <div
          className="modal-header"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="header-title">Do you want to switch out?</div>
        </div>
        <div className="modal-body">
          "You are about to enter a Switch transaction which is a 2 step
          process. Once you submit Reservation, you will be routed to enter a
          Switch Out Transaction." <br />
          "We advise caution while capturing Switch transaction as both the
          orders in the set are not linked and shall be processed
          independently."
        </div>
        <div className="modal-footer">
          <Button
            className="text-only-btn"
            key="back"
            type="text"
            onClick={handleModalCancel}
          >
            Cancel
          </Button>
          <Button
            className="submit-btn"
            key="submit"
            type="primary"
            onClick={handleModalOk}
          >
            Okay
          </Button>
        </div>
      </CustomModal>

      <CustomModal
        visible={visibleExplore}
        width={"90vw"}
        closable={true}
        handleCancel={() => setVisibleExplore(false)}
        handleOk={() => setVisibleExplore(true)}
        title={"Explore Securities"}
      >
        <GenericTable
          tableColumns={tablecolumns}
          tableRows={exploreModalDataVal}
          tableOptions={modalTableOpt}
          // pageSize={5}
          scroll={{ x: 1000 }}
        ></GenericTable>
      </CustomModal>
    </Row>
  );
};
