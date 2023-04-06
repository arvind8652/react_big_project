// react
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// utils
import { generateCsObject } from "../../utils/utils";

// context
import Listing from "./Listing";
import { orderBookListCS } from "../../redux/actions/orderBookListAction";

// context
// export const ControlStructureContext = createContext();

const OrderBookScreen = ({
  cs,
  getCurrentDate,
  showCurrencySymbol,
  customer,
  leftPanel,
}) => {
  // const clientId = "ANDREWC"; //location?.state?.clientId;
  const clientId = customer ? customer : null;
  const [csObject, setCsObject] = useState([]);

  let authorizeCode = "";
  leftPanel &&
    leftPanel.forEach((menu) => {
      menu.subMenu.forEach((subMenu) => {
        if (subMenu.subMenuId === "ORDERBOOK")
          authorizeCode = subMenu.authorizeCode;
      });
    });

  useEffect(() => {
    orderBookListCS();
  }, [clientId]);

  useEffect(() => {
    let newControlStructure = [];
    cs?.csList?.forEach((item, idx) => {
      newControlStructure[idx] = generateCsObject(item.controlStructureField);
    });
    setCsObject(newControlStructure);
  }, [cs]);

  return (
    <>
      {csObject ? (
        <Listing
          csObject={Array.isArray(csObject) ? csObject[0] : {}}
          clientId={clientId}
          getCurrentDate={getCurrentDate}
          showCurrencySymbol={showCurrencySymbol}
          authorizeCode={authorizeCode}
        />
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cs: state.orderBook.controlStructure,
    showCurrencySymbol: state.orderBook.orderBookList.currencySymbol,
    getCurrentDate: state.auth.user.curDate,
    customer: state.common.customerInfo.customerCode,
    leftPanel: state.dashboard.leftPanel,
  };
};

export default connect(mapStateToProps)(OrderBookScreen);
