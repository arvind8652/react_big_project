// react
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// context
import { executeGetTradeBookViewSecurityDetails } from "../../redux/actions/tradeBookViewActions";

import {
  executeTradeBookView,
  executeTradeBookVerticalTimeline
} from "../../redux/actions/tradeBookListActions";

// global
import { CONSTANTS } from "../../constants/constants";

// components
import View from "../../components/TradeBook/View";

function CustomerTradeBookView() {
  // const type = 'transaction';
  const location = useLocation();

  const { ORDEREQADD, CLIENTREQADD } = CONSTANTS.progNames;

  const type = location?.state?.type;
  // for customer use type as 'customer' else 'transaction'
  const security = location?.state?.security;
  const dealId = location?.state?.dealId;
  const progName = type === "transaction" ? ORDEREQADD : CLIENTREQADD;

  useEffect(() => {
    executeTradeBookView(dealId, progName);
    executeTradeBookVerticalTimeline(dealId, progName);

    // const postObject = {
    //   data: {
    //     "DocumentDownloads": [
    //       {
    //         "DocumentId": 1112,
    //         "RefType": ""
    //       },
    //       {
    //         "DocumentId": 1113,
    //         "RefType": ""
    //       }
    //     ]
    //   }
    // };
    // executeGetTradeBookViewDocumentForDownload(postObject);
    executeGetTradeBookViewSecurityDetails(security);
  }, [location.state]);

  return <View type={type} data={location.state} />;
}

export default CustomerTradeBookView;
