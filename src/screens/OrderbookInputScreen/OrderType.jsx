import React, { useEffect, useState } from "react";
import { Row,Col } from "antd";
import GenericCardInput from "../../components/GenericInput/GenericCardInput";
import {
  setSecondaryOrder,
  setSMCalculator,
} from "../../redux/actions/pNBActions";
import { useDispatch } from "react-redux";

import { getSwitchDetails } from "../../redux/actions/pNBActions";
import GenericTable from "../../components/GenericTable/GenericTable";
import CustomModal from "../../components/Modal/CustomModal/CustomModal";

export const OrderType = ({
  buySell,
  selectValues,
  returnValidators = () => {},
  handleFormValues,
  formValues = { tranType: "" },
  transactionType,
  exploreProductData=[],
}) => {
  const dispatch = useDispatch();
  const [switchData, setSwitchData] = useState({});
	const [visibleExplore, setVisibleExplore] = useState(false);
	const [exploreModalDataVal, setExploreModalDataVal] = useState([]);
  // console.log("Trantyp=>", transactionType);

  useEffect(()=>{
    setExploreModalDataVal(exploreProductData)
  },[exploreProductData])

  const renderSecurityIdColumn = (securityId, dataObject) => {
    return dataObject?.security;
  };
  const renderSecurityNameColumn = (securityName, dataObject) => {
    return dataObject?.securityName;
  };
  const renderBuyPriceColumn = (buyPrice, dataObject) => {
    return dataObject?.buyOfferPrice;
  };
  const renderSellPriceColumn = (sellPrice, dataObject) => {
    return dataObject?.sellOfferPrice;
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
			title: "Seurity Name",
			dataIndex: "seurityName",
			key: "seurityName",
			align: "center",
      render: (securityName, exploreModalDataVal) =>
      renderSecurityNameColumn(securityName, exploreModalDataVal),
		},
  ];

  if(buySell==="BUY"){
    tablecolumns.push({
    title: "Buy Price",
    dataIndex: "buyPrice",
    key: "buyPrice",
    align: "center",
    render: (buyPrice, exploreModalDataVal) =>
    renderBuyPriceColumn(buyPrice, exploreModalDataVal),
  })
  }
  if(buySell==="SELL"){
    tablecolumns.push({
      title: "Sell Price",
      dataIndex: "sellPrice",
      key: "sellPrice",
      align: "center",
      render: (sellPrice, exploreModalDataVal) =>
        renderSellPriceColumn(sellPrice, exploreModalDataVal),
    })
  }
  
  const modalTableOpt = {
		checkbox: false,
		expandableRow: false,
		favorite: false,
		pagination: false,
		isMenuOptions: false,
	};

  useEffect(() => {
    getSwitchDetails(formValues.selectedAccount).then((response) => {
      setSwitchData({
        key: response.returnColumn,
        value: response.returnColumn,
        options: response.lookUpValues,
      });
    });
  }, [formValues.selectedAccount]);

  useEffect(() => {
    handleFormValues({ ...formValues, tranType: transactionType });
    dispatch(setSecondaryOrder({ ...formValues, tranType: transactionType }));
    dispatch(setSMCalculator({ ...formValues, tranType: transactionType }));
  }, [transactionType]);
  let dropdownOptions = selectValues("OrderType");
  if (buySell === "BUY") {
    dropdownOptions.options = dropdownOptions.options.filter((e) => {
      return e.pur_sal === "P";
    });
  } else {
    dropdownOptions.options = dropdownOptions.options.filter((e) => {
      return e.pur_sal === "S";
    });
  }
  let formDetails = {
    tranType: {
      label: "Order Type",
      type: "Select",
      rules: returnValidators("OrderType"),
      ...dropdownOptions,
      displayColumn: "dealId",
    },
    whichSwitch: {
      label: "Switch Order Type",
      type: "Select",
      hideField: formValues.tranType === "SELAD" ? false : true,
      rules: returnValidators("SwitchOrderType"),
      options: [],
      ...switchData,
    },
  };

  const onChange = (key, selectedOption) => {
    // console.log("selected option=>", selectedOption);
    switch (key) {
      case "tranType":
        handleFormValues({ ...formValues, tranType: selectedOption });
        dispatch(
          setSecondaryOrder({ ...formValues, tranType: selectedOption })
        );
        dispatch(setSMCalculator({ ...formValues, tranType: selectedOption }));
        break;
      default:
        handleFormValues({ ...formValues, [key]: selectedOption });
        dispatch(setSecondaryOrder({ ...formValues, [key]: selectedOption }));
        return;
    }
  };
  return (
    <>
    <Row>
      {Object.keys(formDetails).map((key, idx) => {
        return (
          !formDetails[key].hideField && (
            <GenericCardInput
              item={formDetails[key]}
              key={key + idx}
              onChange={(option) => onChange(key, option)}
              value={formValues[key]}
              itemName={key}
            />
          )
        );
      })}

					<Col offset={2} style={{ marginTop: "3em" }}>
						<h1 onClick={() => setVisibleExplore(true)}>Explore</h1>
					</Col>
    </Row>
    
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
    </>
  );
};
