import {
  getSMOrderDetailsByID,
  getExploreProductCS,
  getCustomerDetails,
  placeOrder,
  calculateSMOrderDetails,
  getJointHolderDetails,
  getPMOrderDeals,
} from "../../api/pNBApi.js";

import {
  getClientInfo,
  getClientAccounts,
  getSecuritiesForIssuerOGT,
  getSecurityListDetails,
  getCreditAccounts,
} from "../../api/commonApi";

import { getDefaultBankAccountAndCustodian } from "../../api/primaryMarketApi";

import {
  SET_SM_ORDER_DETAILS_BY_ID,
  SET_DEPT_SEC_MARKET_CS,
  SET_SECONDARY_ORDER,
  SET_CUSTOMER_DATA_SEC,
  SET_CALCULATE_SM_ORDER,
  SET_SM_CALCULATOR,
  SET_SOF_FORM_DATA,
  SET_JOINT_ACCOUNT_DETAILS,
} from "./actionTypes";

import { store } from "../configureStore";

export const setSMOrderDetailsByID = (payload) => {
  return { type: SET_SM_ORDER_DETAILS_BY_ID, payload: payload };
};

const setDeptSecMarketCs = (payload) => ({
  type: SET_DEPT_SEC_MARKET_CS,
  payload,
});

export const setSecondaryOrder = (payload) => {
  return {
    type: SET_SECONDARY_ORDER,
    payload,
  };
};

export const setSMCalculator = (payload) => {
  return {
    type: SET_SM_CALCULATOR,
    payload,
  };
};

export const setPrintSofData = (payload) => {
  // console.log("payload", payload);
  return {
    type: SET_SOF_FORM_DATA,
    payload,
  };
};

export const setCustomerDetails = (payload) => ({
  type: SET_CUSTOMER_DATA_SEC,
  payload,
});

export const setJointHolderDetails = (payload) =>
  // console.log("4444444", payload),
  ({
    type: SET_JOINT_ACCOUNT_DETAILS,
    payload,
  });

export const setCalculateSMOrder = (payload) =>
  // console.log("payload", payload),
  ({
    type: SET_CALCULATE_SM_ORDER,
    payload,
  });

// export const executeCalculateSMOrder = () => {
//   return (dispatch) => {
//     calculateSMOrderDetails()
//       .then((res) => {
//         if (res.status === 200) {
//           dispatch(setCalculateSMOrder(res.data));
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(() => {
//         console.log("Called SM Order Details Action");
//       });
//   };
// };

export const executeGetSMOrderDetailsByID = (refID) => {
  return (dispatch) => {
    getSMOrderDetailsByID(refID)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setSMOrderDetailsByID(res.data));
        }
      })
      .catch((err) => {
        // console.log(err);
      })
      .finally(() => {
        // console.log("Called Trending Products Data Action");
      });
  };
};

export const executeControlStructure = async (postObject) => {
  try {
    const response = await getExploreProductCS(postObject);
    if (response.data) {
      let returnData = response.data?.csList[0]?.controlStructureField;
      store.dispatch(setDeptSecMarketCs(returnData));
      return returnData;
    }
  } catch (error) {
    // console.log("POST WATCH LIST ERROR", error);
  }
};

export const executeGetClientInfo = async () =>
  await getClientInfo({ params: {} });

export const executeGetClientAccounts = async (client_id) =>
  (await getClientAccounts(client_id)).data.lookUpValues;

export const executeGetSecuritiesForIssuerOGT = async (issuerId, asset_group) =>
  (await getSecuritiesForIssuerOGT(issuerId, asset_group)).data.lookUpValues;

export const executeGetCreditAccounts = async (schemeId) =>
  (await getCreditAccounts(schemeId)).data;

export const executeGetSecurityCard = async (
  securityId,
  schemeId,
  marketAccess,
  clientId
) => {
  let postObj = {
    data: {
      security: [securityId],
      scheme: schemeId,
      marketAccess: marketAccess,
      clientId: clientId,
    },
  };
  return await (
    await getSecurityListDetails(postObj)
  ).data;
};

export const executegGetCustomerDetails = async (selectedCustomerId) => {
  let response = await getCustomerDetails("Customer", selectedCustomerId);
  store.dispatch(setCustomerDetails(await response.data));
  return response.data;
};

export const executegGetJointHolderDetails = async (scheme) => {
  // console.log("scheme", scheme);
  let response = await getJointHolderDetails(scheme);
  store.dispatch(setJointHolderDetails(await response.data));
};

export const executePlaceOrder = async (postData) => {
  let postObj = {
    data: postData,
  };

  return await placeOrder(postObj);
};

export const executeCalculateSMOrder = async (postData) => {
  let postObj = {
    data: postData,
  };

  let res = await calculateSMOrderDetails(postObj);
  return res;
};

export const executeGetDefaultBankAccountAndCustodian = async (
  scheme,
  security,
  tranType
) => {
  const postObject = {
    data: {
      ProgName: "ORDERSMADD",
      Scheme: scheme,
      Security: security,
      TranType: tranType,
    },
  };

  return await getDefaultBankAccountAndCustodian(postObject);
};

export const getSwitchDetails = async (scheme) => {
  const postObject = {
    data: {
      FieldListID: 20110,
      dependentValue: { scheme },
    },
  };

  return (await getPMOrderDeals(postObject)).data;
};
