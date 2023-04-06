import {
  getPortfolioPerformanceBasedOnCapital,
  getPortfolioAllocationBasedOnAssetClass,
  getAllocationTrendData,
  getTopHoldings,
  getWinnersAndLaggers,
  getTop3AccountData,
  getAccountDetail,
  getCapitalInvestedGraphData,
  getInvestmentValueGraphData,
  getPortfolioActivityGraph,
  getRiskProfileData,
  getPortfolioDerivationData,
  getAccountList,
  getPortfolioPerformanceBasedOnBenchmark,
  getDependentDataAccountDrilldown,
  getAccountDrilldownControlStructure,
  getAssetTypeWiseData,
} from "../../api/accountDrilldownApi.js";

import {
  SET_PORTFOLIO_PERFORMANCE_BASED_ON_CAPITAL,
  SET_PORTFOLIO_ALLOCATION_BASED_ON_ASSET_CLASS,
  SET_ALLOCATION_TREND_DATA,
  SET_TOP_HOLDINGS,
  SET_WINNERS_AND_LAGGERS,
  SET_TOP_3_ACCOUNT_DATA,
  SET_ACCOUNT_DETAIL,
  SET_CAPITAL_INVESTED_GRAPH_DATA,
  SET_INVESTMENT_VALUE_GRAPH_DATA,
  SET_PORTFOLIO_ACTIVITY_GRAPH,
  SET_RISK_PROFILE_DATA,
  SET_PORTFOLIO_DERIVATION_DATA,
  SET_ACCOUNTDRILLDOWN_LIST,
  SET_PORTFOLIO_PERFORMANCE_BASED_ON_BENCHMARK,
  SET_DEPENDENT_DATA_ACCOUNT_DRILLDOWN,
  SET_ACCOUNT_DRILLDOWN_CONTROL_STRUCTURE,
  SET_ASSET_TYPE_WISE_DATA,
} from "./actionTypes";

import { store } from "../configureStore";

export const setPortfolioPerformanceBasedOnCapital = (payload) => {
  return { type: SET_PORTFOLIO_PERFORMANCE_BASED_ON_CAPITAL, payload: payload };
};


export const setPortfolioAllocationBasedOnAssetClass = (payload) => {
  return {
    type: SET_PORTFOLIO_ALLOCATION_BASED_ON_ASSET_CLASS,
    payload: payload,
  };
};

export const setAllocationTrendData = (payload) => {
  return { type: SET_ALLOCATION_TREND_DATA, payload: payload };
};

export const setTopHoldings = (payload) => {
  return { type: SET_TOP_HOLDINGS, payload: payload };
};

export const setWinnersAndLaggers = (payload) => {
  return { type: SET_WINNERS_AND_LAGGERS, payload: payload };
};

export const setTop3AccountData = (payload) => {
  return { type: SET_TOP_3_ACCOUNT_DATA, payload: payload };
};

export const setAccountDetail = (payload) => {
  return { type: SET_ACCOUNT_DETAIL, payload: payload };
};

export const setCapitalInvestedGraphData = (payload) => {
  return { type: SET_CAPITAL_INVESTED_GRAPH_DATA, payload: payload };
};

export const setInvestmentValueGraphData = (payload) => {
  return { type: SET_INVESTMENT_VALUE_GRAPH_DATA, payload: payload };
};

export const setPortfolioActivityGraph = (payload) => {
  return { type: SET_PORTFOLIO_ACTIVITY_GRAPH, payload: payload };
};

export const setRiskProfileData = (payload) => {
  return { type: SET_RISK_PROFILE_DATA, payload: payload };
};

export const setPortfolioDerivationData = (payload) => {
  return { type: SET_PORTFOLIO_DERIVATION_DATA, payload: payload };
};

export const setAccountDrilldownList = (payload) => {
  console.log("setAccountDrilldownList", payload)
  return { type: SET_ACCOUNTDRILLDOWN_LIST, payload: payload };
};

export const setPortfolioPerformanceBasedOnBenchmark = (payload) => {
  return {
    type: SET_PORTFOLIO_PERFORMANCE_BASED_ON_BENCHMARK,
    payload: payload,
  };
};

export const setDependentDataAccountDrilldown = (payload) => {
  return { type: SET_DEPENDENT_DATA_ACCOUNT_DRILLDOWN, payload: payload };
};

export const setAccountDrilldownControlStructure = (payload) => {
  return { type: SET_ACCOUNT_DRILLDOWN_CONTROL_STRUCTURE, payload: payload };
};

export const setAssetTypeWiseData = (payload) => {
  return { type: SET_ASSET_TYPE_WISE_DATA, payload: payload };
};

export const executeGetPortfolioPerformanceBasedOnCapital = (requestObject) => {
  return (dispatch) => {
    getPortfolioPerformanceBasedOnCapital(requestObject)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setPortfolioPerformanceBasedOnCapital(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Called based on capital Action");
      });
  };
};

export const executeGetPortfolioAllocationBasedOnAssetClass = (customerId, scheme, date) => {
  return (dispatch) => {
    getPortfolioAllocationBasedOnAssetClass(customerId, scheme, date)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setPortfolioAllocationBasedOnAssetClass(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Called based on allocation Action");
      });
  };
};

export const executeGetAllocationTrendData = (customerId, scheme, date) => {
  return (dispatch) => {
    getAllocationTrendData(customerId, scheme, date)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setAllocationTrendData(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Called allocation trend Action");
      });
  };
};

export const executeGetTopHoldings = (customerId, scheme, date) => {
  return (dispatch) => {
    getTopHoldings(customerId, scheme, date)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setTopHoldings(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Called top holdings Action");
      });
  };
};

export const executeGetWinnersAndLaggers = () => {
  return (dispatch) => {
    getWinnersAndLaggers()
      .then((res) => {
        if (res.status === 200) {
          dispatch(setWinnersAndLaggers(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Called winners/laggers Action");
      });
  };
};

export const executeGetTop3AccountData = () => {
  return (dispatch) => {
    getTop3AccountData()
      .then((res) => {
        if (res.status === 200) {
          dispatch(setTop3AccountData(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Called top 3 account Action");
      });
  };
};

export const executeGetAccountDetail = (customerId, scheme, date) => {
  return (dispatch) => {
    getAccountDetail(customerId, scheme, date)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setAccountDetail(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Called account detail Action");
      });
  };
};

export const executeGetCapitalInvestedGraphData = (customerId, scheme, date) => {
  return (dispatch) => {
    getCapitalInvestedGraphData(customerId, scheme, date)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setCapitalInvestedGraphData(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Called capital invested graph data Action");
      });
  };
};



export const executeGetInvestmentValueGraphData = (customerId, scheme, date) => {
  return (dispatch) => {
    getInvestmentValueGraphData(customerId, scheme, date)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setInvestmentValueGraphData(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Called investment value graph Action");
      });
  };
};

export const executeGetPortfolioActivityGraph = (customerId, scheme, date) => {
  return (dispatch) => {
    getPortfolioActivityGraph(customerId, scheme, date)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setPortfolioActivityGraph(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Called timeline Action");
      });
  };
};

export const executeGetRiskProfileData = (customerId, scheme, date) => {
  return (dispatch) => {
    getRiskProfileData(customerId, scheme, date)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setRiskProfileData(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Called risk profile Action");
      });
  };
};

export const executeGetPortfolioDerivationData = (requestObject) => {
  return (dispatch) => {
    getPortfolioDerivationData(requestObject)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setPortfolioDerivationData(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Called portfolio derivation Action");
      });
  };
};

export const executeGetAccountList = (date, customerId) => {
  return (dispatch) => {
    getAccountList(date, customerId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setAccountDrilldownList(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Called account list Action");
      });
  };
};

export const executeGetPortfolioPerformanceBasedOnBenchmark = (
  requestObject
) => {
  return (dispatch) => {
    getPortfolioPerformanceBasedOnBenchmark(requestObject)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setPortfolioPerformanceBasedOnBenchmark(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Called performance based on benchmark Action");
      });
  };
};

export const executeGetDependentDataAccountDrilldown = () => {
  return (dispatch) => {
    getDependentDataAccountDrilldown()
      .then((res) => {
        if (res.status === 200) {
          dispatch(setDependentDataAccountDrilldown(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Called Dependent data Action");
      });
  };
};

export const executeGetAccountDrilldownControlStructure = () => {
  return (dispatch) => {
    getAccountDrilldownControlStructure()
      .then((res) => {
        if (res.status === 200) {
          dispatch(setAccountDrilldownControlStructure(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Called Acc Drill CS Action");
      });
  };
};

export const executeGetAssetTypeWiseData = (customerId, scheme, date) => {
  return (dispatch) => {
    getAssetTypeWiseData(customerId, scheme, date)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setAssetTypeWiseData(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Called asset type wise Action");
      });
  };
};
