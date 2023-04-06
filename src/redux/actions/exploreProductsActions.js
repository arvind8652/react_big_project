import {
  getExploreProductsDetails,
  makeFavorite,
  getExploreProductCS,
  getExploreProductAdvancedFilter,
} from "../../api/exploreProductsApi";

import { getSecurityListDetails } from "../../api/commonApi";

import { store } from "../configureStore";

import {
  SET_EXPLORE_PRODUCTS_FILTERED,
  SET_EXPLORE_PRODUCTS_DETAILS,
  SET_EXPLORE_PRODUCTS_CONTROL_STRUCTURE,
  SET_EXPLORE_PRODUCTS_ADVANCED_FILTER,
  SET_EXPLORE_PRODUCTS_ADV_CACHE,
} from "./actionTypes";

export const setExploreProductsDetails = (payload) => ({
  type: SET_EXPLORE_PRODUCTS_DETAILS,
  payload,
});

const setExploreProductsControlStructure = (payload) => ({
  type: SET_EXPLORE_PRODUCTS_CONTROL_STRUCTURE,
  payload,
});

const setExploreProductsAdvancedFilter = (payload) => ({
  type: SET_EXPLORE_PRODUCTS_ADVANCED_FILTER,
  payload,
});

export const setExploreProductsFilteredData = (payload) => ({
  type: SET_EXPLORE_PRODUCTS_FILTERED,
  payload,
});

export const setExploreProductsAdvFilterCache = (payload) => ({
  type: SET_EXPLORE_PRODUCTS_ADV_CACHE,
  payload,
});

export const executeGetExploreProductsDetails = async (postObject, setLoading) => {
  try {
    setLoading(true);
    const response = await getExploreProductsDetails(postObject);
    if (response) {
      store.dispatch(setExploreProductsDetails(response?.data));
      store.dispatch(setExploreProductsFilteredData(response?.data));
    }
    setLoading(false);
    return;
  } catch (error) {
    setLoading(false);
  }
  return;
};

export const executeGetSecurityListDetails = async (securityArray) => {
  try {
    if (securityArray.length > 0) {
      return await getSecurityListDetails({
        data: { security: securityArray },
      });
    } else {
      return [];
    }
  } catch (error) {
    console.log("GET SECURITY LIST DETAILS");
  }
};

export const executeMakeFavorite = async (postObject) => {
  try {
    await makeFavorite(postObject);
  } catch (error) {
    console.log("POST WATCH LIST ERROR", error);
  }
};

export const executeGetExploreProductCS = async () => {
  try {
    const response = await getExploreProductCS();
    if (response.data) {
      store.dispatch(setExploreProductsControlStructure(response.data));
      return response.data;
    } else return null;
  } catch (error) {
    console.log("GET TRADE BOOK LIST CS ERROR", error);
    return null;
  }
};

export const executeGetExploreProductAdvancedFilter = async (reqGroup = "Trending") => {
  try {
    const response = await getExploreProductAdvancedFilter({
      AssetGroup: reqGroup,
    });
    if (response.data) {
      store.dispatch(setExploreProductsAdvancedFilter(response.data.advancedFiltersList));
    }
    return;
  } catch (error) {
    console.log("GET TRADE BOOK LIST CS ERROR", error);
  }
  return;
};

export const executeCache = async (reqGroup) => {
  store.dispatch(setExploreProductsAdvFilterCache(reqGroup));
};
