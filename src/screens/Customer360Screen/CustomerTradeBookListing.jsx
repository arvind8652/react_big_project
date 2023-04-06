// react
import { createContext, useEffect, useState } from "react";

// commponents
import Listing from "../../components/TradeBook/Listing";

// utils
import { generateCsObject } from "../../utils/utils";

// context
import { connect } from "react-redux";
import {
  executeGetTradeBookListAdvancedFilter,
  executeGetTradeBookListCs
} from "../../redux/actions/tradeBookListActions";
import { useLocation } from "react-router-dom";

// context
export const ControlStructureContext = createContext();

function CustomerTradeBookListing({
  cs
  // tradeBookType = 'TransactionTradeBook'
  // for customer use tradeBookType as CustomerTradeBook
}) {
  const location = useLocation();
  // for customer use tradeBookType as CustomerTradeBook else TransactionTradeBook
  const clientId = location?.state?.clientId;
  const tradeBookType = location?.state?.tradeBookType;

  const [csObject, setCsObject] = useState([]);

  useEffect(() => {
    executeGetTradeBookListCs();
    const advanceFilterPostObject = {
      data: {
        ClientId: tradeBookType === "CustomerTradeBook" ? clientId : null
      }
    };
    executeGetTradeBookListAdvancedFilter(advanceFilterPostObject);
  }, [clientId, tradeBookType]);

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
          tradeBookType={tradeBookType}
          clientId={clientId}
        />
      ) : null}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cs: state.tradeBookList.controlStructure
  };
};

export default connect(mapStateToProps)(CustomerTradeBookListing);
