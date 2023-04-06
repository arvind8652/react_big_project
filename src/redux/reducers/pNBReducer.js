import {
  SET_SM_ORDER_DETAILS_BY_ID,
  SET_DEPT_SEC_MARKET_CS,
  SET_SECONDARY_ORDER,
  SET_CUSTOMER_DATA_SEC,
  SET_CALCULATE_SM_ORDER,
  SET_SM_CALCULATOR,
  SET_SOF_FORM_DATA,
  SET_JOINT_ACCOUNT_DETAILS
} from "../actions/actionTypes";

const initialState = {
  smOrderDetailsByID: null,
  controlStructure: {},
  calculateSMOrder: {},
  secondaryOrder: {
    IsSecuritySuitability: null,
    dealId: "",
    scheme: "",
    tranType: "",
    assetType: "",
    security: "",
    rate: 0,
    purYield: 0,
    valueDate: "",
    fcyGrossVal: 0,
    grossVal: 0,
    fcyGrossInt: 0,
    grossInt: 0,
    broker: "",
    brokeragePer: 0,
    fcyBrkCommn: 0,
    orgFcyBrkCommn: 0,
    nettVal: 0,
    fcyNettVal: 0,
    orderInstruction: "",
    OtherInstruction: "",
    bankAccForINM: "",
    instrType: "",
    account: "",
    bank: "",
    chqNumber: "",
    chqDate: null,
    branch: "",
    withholdingTaxPer: 0,
    remarks: "",
    currency: "",
    accCurrency: "",
    units: 0,
    fcyVatFee: 0.0,
    fcyTransChrg: 0.0,
    fcyCustchrg: 0.0,
  },
  customerDetails: {},
  jointAccountDetails: null,
  debtSMOrder: {
    scheme: null,
    security: null,
    tranType: null,
    rate: null,
    assetType: null,
    broker: null,
    account: null,
    currency: null,
    accCurrency: null,
    fcyGrossVal: null,
    faceValue: null,
    interest: null,
    matDate: null,
    quoteBasis: null,
    xirrType: null,
    purYield: null,
    priceOrYield: null,
    recompYN: "Y"
  },
  sofFormData: null
};

export const pNBReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_SM_ORDER_DETAILS_BY_ID:
      return { ...state, smOrderDetailsByID: payload };
    case SET_DEPT_SEC_MARKET_CS:
      return {
        ...state,
        controlStructure: payload,
      };
    case SET_SM_CALCULATOR:
      return {
        ...state,
        debtSMOrder: { ...state.debtSMOrder, ...payload },
      }
    case SET_CALCULATE_SM_ORDER:
      return {
        ...state,
        calculateSMOrder: payload,
      };
    case SET_SECONDARY_ORDER:
      return {
        ...state,
        secondaryOrder: { ...state.secondaryOrder, ...payload },
      };
    case SET_CUSTOMER_DATA_SEC:
      return {
        ...state,
        customerDetails: payload,
      };
    case SET_JOINT_ACCOUNT_DETAILS:
      return {
        ...state,
        jointAccountDetails: payload,
      };
    case SET_SOF_FORM_DATA:
      return {
        ...state,
        sofFormData: payload,
      };
    default:
      return state;
  }
};

export default pNBReducer;
