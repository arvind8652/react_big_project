import { apiRequestUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getPortfolioPerformanceBasedOnCapital = (requestObject) => {
  const postObject = {
    data: requestObject,
  };
  return Api.post(
    apiRequestUrls.getPortfolioPerformanceBasedOnCapital,
    postObject
  );
};

export const getPortfolioAllocationBasedOnAssetClass = (
  CustomerID,
  Scheme,
  bDate
) => {
  const postObject = {
    data: {
      // CustomerID: "ANDREWC",
      // Scheme: "ANDREW",
      // BusinessDate: "2020-01-15",
      CustomerID: CustomerID,
      Scheme: Scheme,
      BusinessDate: bDate,
    },
  };
  return Api.post(
    apiRequestUrls.getPortfolioAllocationBasedOnAssetClass,
    postObject
  );
};

export const getAllocationTrendData = (CustomerID, Scheme, bDate) => {
  const postObject = {
    data: {
      // CustomerID: "ANDREWC",
      // Scheme: "ANDREW",
      // BusinessDate: "2020-01-15",
      CustomerID: CustomerID,
      Scheme: Scheme,
      BusinessDate: bDate,
    },
  };
  return Api.post(apiRequestUrls.getAllocationTrendData, postObject);
};

export const getTopHoldings = (CustomerID, Scheme, bDate) => {
  const postObject = {
    data: {
      // CustomerID: "ANDREWC",
      // Scheme: "ANDREW",
      // BusinessDate: "2020-01-15",
      CustomerID: CustomerID,
      Scheme: Scheme,
      BusinessDate: bDate,
    },
  };
  return Api.post(apiRequestUrls.getTopHoldings, postObject);
};

export const getWinnersAndLaggers = (CustomerID, Scheme, bDate) => {
  const postObject = {
    data: {
      CustomerID: "ANDREWC",
      Scheme: "ANDREW",
      BusinessDate: "2020-01-15",
    },
  };
  return Api.post(apiRequestUrls.getWinnersAndLaggers, postObject);
};

export const getTop3AccountData = (CustomerID, bDate) => {
  const postObject = {
    data: {
      CustomerID: "ANDREWC",
      BusinessDate: "2020-01-15",
    },
  };
  return Api.post(apiRequestUrls.getTop3AccountData, postObject);
};

export const getAccountDetail = (CustomerID, Scheme, bDate) => {
  const postObject = {
    data: {
      // CustomerID: "ANDREWC",
      // Scheme: "ANDREW",
      // BusinessDate: "2020-01-15",
      CustomerID: CustomerID,
      Scheme: Scheme,
      BusinessDate: bDate
    },
  };
  return Api.post(apiRequestUrls.getAccountDetail, postObject);
};

export const getCapitalInvestedGraphData = (CustomerID, Scheme, bDate) => {
  const postObject = {
    data: {
      // CustomerID: "ANDREWC",
      // Scheme: "ANDREW",
      // BusinessDate: "2020-01-15",
      CustomerID: CustomerID,
      Scheme: Scheme,
      BusinessDate: bDate
    },
  };
  return Api.post(apiRequestUrls.getCapitalInvestedGraphData, postObject);
};

export const getInvestmentValueGraphData = (CustomerID, Scheme, bDate) => {
  const postObject = {
    data: {
      // CustomerID: "ANDREWC",
      // Scheme: "ANDREW",
      // BusinessDate: "2020-01-15",
      CustomerID: CustomerID,
      Scheme: Scheme,
      BusinessDate: bDate
    },
  };
  return Api.post(apiRequestUrls.getInvestmentValueGraphData, postObject);
};

//Timeline
export const getPortfolioActivityGraph = (CustomerID, Scheme, bDate) => {
  const postObject = {
    data: {
      // CustomerID: "ANDREWC",
      // Scheme: "ANDREW",
      // BusinessDate: "2020-01-15",
      CustomerID: CustomerID,
      Scheme: Scheme,
      BusinessDate: bDate
    },
  };
  return Api.post(apiRequestUrls.getPortfolioActivityGraph, postObject);
};

//Risk Profile
export const getRiskProfileData = (CustomerID, Scheme, bDate) => {
  const postObject = {
    data: {
      // CustomerID: "ANDREWC",
      // Scheme: "ANDREW",
      // BusinessDate: "2020-01-15",
      CustomerID: CustomerID,
      Scheme: Scheme,
      BusinessDate: bDate
    },
  };
  return Api.post(apiRequestUrls.getRiskProfileData, postObject);
};

export const getPortfolioDerivationData = (requestObject) => {
  const postObject = {
    data: requestObject,
  };
  return Api.post(apiRequestUrls.getPortfolioDerivationData, postObject);
};

export const getAccountList = (bDate, CustomerID) => {
  const postObject = {
    data: {
      // CustomerID: "ANDREWC",
      // BusinessDate: "2020-01-15",
      CustomerID: CustomerID,
      BusinessDate: bDate
    },
  };
  return Api.post(apiRequestUrls.getAccountList, postObject);
};

export const getPortfolioPerformanceBasedOnBenchmark = (requestObject) => {
  const postObject = {
    data: requestObject,
  };
  return Api.post(
    apiRequestUrls.getPortfolioPerformanceBasedOnBenchmark,
    postObject
  );
};

export const getDependentDataAccountDrilldown = (CustomerID, Scheme, bDate) => {
  const postObject = {
    data: {
      FieldListID: "20059",
      dependentValue: {
        ClientId: "ANDREWC",
      },
    },
  };
  return Api.post(apiRequestUrls.getDependentDataAccountDrilldown, postObject);
};

export const getAccountDrilldownControlStructure = () => {
  return Api.get(apiRequestUrls.getAccountDrilldownControlStructure);
};

export const getAssetTypeWiseData = (CustomerID, Scheme, bDate) => {
  const postObject = {
    data: {
      // CustomerID: "ANDREWC",
      // Scheme: "ANDREW",
      // BusinessDate: "2020-01-15",
      CustomerID: CustomerID,
      Scheme: Scheme,
      BusinessDate: bDate
    },
  };
  return Api.post(apiRequestUrls.getAssetTypeWiseData, postObject);
};
